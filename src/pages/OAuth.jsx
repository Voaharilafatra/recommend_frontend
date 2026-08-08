import { useState, useEffect } from 'react'
import { useNavigate, Link, Navigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { FiMail, FiLock, FiArrowRight } from 'react-icons/fi'

const testAccounts = [
  { role: 'Client', email: 'jean@email.com', password: 'test123' },
  { role: 'Prestataire', email: 'marie@email.com', password: 'test123' },
  { role: 'Admin', email: 'admin@email.com', password: 'test123' },
]

function OAuth() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const { login, googleLogin, isAuthenticated, loading: authLoading } = useAuth()

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard', { replace: true })
    }
  }, [isAuthenticated, navigate])

  if (authLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-yellow-400/20 border-t-yellow-400" />
      </div>
    )
  }

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />
  }

  const validateForm = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      setError('Veuillez entrer un email valide')
      return false
    }
    if (password.length < 6) {
      setError('Le mot de passe doit contenir au moins 6 caracteres')
      return false
    }
    return true
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    if (!validateForm()) return
    setLoading(true)
    try {
      await login(email, password)
      navigate('/dashboard')
    } catch (err) {
      setError(err.message || 'Erreur de connexion')
    } finally {
      setLoading(false)
    }
  }

  const handleGoogleLogin = async () => {
    setError('')
    setLoading(true)
    try {
      await googleLogin()
      navigate('/dashboard')
    } catch {
      setError('Erreur de connexion Google')
    } finally {
      setLoading(false)
    }
  }

  const fillTestAccount = (account) => {
    setEmail(account.email)
    setPassword(account.password)
    setError('')
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-white px-5 py-20">
      <div className="flex flex-col items-center gap-8 rounded-[2rem] border border-zinc-200 bg-white/95 p-10 shadow-2xl max-w-md w-full animate__animated animate__zoomIn">
        <Link to="/" className="flex items-center gap-3 text-2xl font-extrabold text-black">
          <span className="grid h-14 w-14 place-items-center rounded-2xl bg-yellow-400 text-lg font-black text-white shadow-lg shadow-yellow-400/30">
            T
          </span>
          TADIAVO-EO
        </Link>

        <div className="text-center">
          <h2 className="text-2xl font-bold text-black">Connexion</h2>
          <p className="mt-2 text-sm text-zinc-600">
            Connectez-vous pour acceder a votre espace
          </p>
        </div>

        {error && (
          <div className="w-full rounded-lg bg-red-50 p-3 text-sm text-red-600 border border-red-200 animate__animated animate__shakeX" role="alert">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="w-full space-y-4">
          <div className="relative">
            <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400" aria-hidden="true" />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-full border border-zinc-200 pl-12 pr-5 py-3 outline-none focus:border-yellow-400 transition-all focus:shadow-lg focus:shadow-yellow-400/10"
              required
              aria-label="Email"
            />
          </div>
          <div className="relative">
            <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400" aria-hidden="true" />
            <input
              type="password"
              placeholder="Mot de passe"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-full border border-zinc-200 pl-12 pr-5 py-3 outline-none focus:border-yellow-400 transition-all focus:shadow-lg focus:shadow-yellow-400/10"
              required
              minLength={6}
              aria-label="Mot de passe"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="group w-full rounded-full bg-yellow-400 px-6 py-3 text-sm font-semibold text-white transition-all duration-300 hover:bg-yellow-500 hover:scale-105 hover:shadow-lg hover:shadow-yellow-400/30 disabled:opacity-50 disabled:hover:scale-100"
          >
            {loading ? 'Connexion...' : 'Se connecter'}
            {!loading && <FiArrowRight className="inline ml-2 group-hover:translate-x-1 transition-transform" />}
          </button>
        </form>

        <div className="w-full flex items-center gap-4">
          <div className="flex-1 h-px bg-zinc-200" />
          <span className="text-sm text-zinc-500">ou</span>
          <div className="flex-1 h-px bg-zinc-200" />
        </div>

        <button
          onClick={handleGoogleLogin}
          disabled={loading}
          className="flex w-full items-center justify-center gap-3 rounded-full border border-zinc-200 bg-white px-6 py-3 text-sm font-semibold text-black transition-all duration-300 hover:border-yellow-400 hover:shadow-lg hover:scale-105 disabled:opacity-50 disabled:hover:scale-100"
        >
          <svg className="h-5 w-5" viewBox="0 0 24 24" aria-hidden="true">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"/>
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
          </svg>
          {loading ? 'Connexion...' : 'Continuer avec Google'}
        </button>

        <div className="w-full p-4 bg-yellow-50 rounded-xl border border-yellow-100">
          <p className="text-xs text-zinc-600 text-center font-semibold">Comptes de test</p>
          <div className="mt-3 grid grid-cols-3 gap-2 text-xs">
            {testAccounts.map((account) => (
              <button
                key={account.role}
                type="button"
                onClick={() => fillTestAccount(account)}
                className="rounded-xl border border-yellow-100 bg-white p-2 text-center hover:border-yellow-400 hover:shadow-sm transition"
              >
                <p className="font-semibold text-black">{account.role}</p>
                <p className="text-zinc-500 truncate">{account.email}</p>
                <p className="text-zinc-400">{account.password}</p>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default OAuth
