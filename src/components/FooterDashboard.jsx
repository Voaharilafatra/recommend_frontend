import { Link } from 'react-router-dom'
import { FiHome, FiPackage, FiStar, FiUser, FiMap, FiLogOut, FiHelpCircle } from 'react-icons/fi'
import { useAuth } from '../contexts/AuthContext'
import { useNavigate } from 'react-router-dom'

function FooterDashboard() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  const footerLinks = [
    { label: 'Accueil', icon: FiHome, href: '/dashboard' },
    { label: 'Services', icon: FiPackage, href: '/my-services' },
    { label: 'Avis', icon: FiStar, href: '/my-reviews' },
    { label: 'Profil', icon: FiUser, href: '/profile' },
    { label: 'Carte', icon: FiMap, href: '/map' },
  ]

  const legalLinks = [
    { label: 'Aide', href: '/' },
    { label: 'Conditions', href: '/' },
    { label: 'Confidentialite', href: '/' },
  ]

  return (
    <footer className="border-t border-zinc-200 bg-white px-5 py-6 sm:px-8 lg:px-10" role="contentinfo">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col items-center justify-between gap-6 lg:flex-row">
          <div className="flex items-center gap-3">
            <span className="grid h-8 w-8 place-items-center rounded-xl bg-yellow-400 text-xs font-black text-white">T</span>
            <div>
              <span className="text-sm font-bold text-black">TADIAVO-EO</span>
              <span className="block text-xs text-zinc-400">Espace connecte</span>
            </div>
          </div>

          <nav className="flex flex-wrap items-center justify-center gap-4 text-sm" aria-label="Navigation pied de page">
            {footerLinks.map((item) => (
              <Link
                key={item.label}
                to={item.href}
                className="flex items-center gap-1 text-zinc-500 transition hover:text-yellow-400"
              >
                <item.icon className="h-4 w-4" aria-hidden="true" />
                <span>{item.label}</span>
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <span className="grid h-8 w-8 place-items-center rounded-full bg-yellow-400 text-xs font-bold text-white">
              {user?.avatar || user?.name?.charAt(0) || 'U'}
            </span>
            <div className="text-sm">
              <p className="font-medium text-black">{user?.name}</p>
              <p className="text-xs text-zinc-400">{user?.email}</p>
              <span className="text-xs text-yellow-500 capitalize">{user?.role}</span>
            </div>
          </div>

          <button
            onClick={handleLogout}
            className="flex items-center gap-2 rounded-full border border-red-200 px-4 py-2 text-sm text-red-500 transition hover:bg-red-50"
            aria-label="Deconnexion"
          >
            <FiLogOut className="h-4 w-4" />
            Deconnexion
          </button>
        </div>

        <div className="mt-4 flex flex-wrap items-center justify-center gap-4 border-t border-zinc-100 pt-4 text-xs text-zinc-400">
          {legalLinks.map((link) => (
            <Link key={link.label} to={link.href} className="flex items-center gap-1 hover:text-yellow-400 transition">
              {link.label === 'Aide' && <FiHelpCircle className="h-3 w-3" />}
              {link.label}
            </Link>
          ))}
          <span>Copyright 2026 TADIAVO-EO</span>
        </div>
      </div>
    </footer>
  )
}

export default FooterDashboard
