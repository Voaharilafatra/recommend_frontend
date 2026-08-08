import { createContext, useContext, useState, useEffect, useCallback } from 'react'
import { mockLogin, mockUsers } from '../data/mockData'

const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [token, setToken] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Vérification automatique au chargement
  const checkAuth = useCallback(() => {
    setLoading(true)
    try {
      const savedUser = localStorage.getItem('user')
      const savedToken = localStorage.getItem('token')
      if (savedUser && savedToken) {
        setUser(JSON.parse(savedUser))
        setToken(savedToken)
      } else {
        setUser(null)
        setToken(null)
      }
    } catch (e) {
      localStorage.removeItem('user')
      localStorage.removeItem('token')
      setUser(null)
      setToken(null)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    checkAuth()
  }, [checkAuth])

  const login = async (email, password) => {
    setLoading(true)
    setError(null)
    try {
      if (!email || !password) {
        throw new Error('Veuillez renseigner votre email et mot de passe')
      }
      await new Promise((resolve) => setTimeout(resolve, 800))
      const data = mockLogin(email, password)
      setUser(data.user)
      setToken(data.token)
      localStorage.setItem('user', JSON.stringify(data.user))
      localStorage.setItem('token', data.token)
      return data
    } catch (err) {
      const message = err.message || 'Erreur de connexion'
      setError(message)
      throw new Error(message)
    } finally {
      setLoading(false)
    }
  }

  const logout = () => {
    setUser(null)
    setToken(null)
    setError(null)
    localStorage.removeItem('user')
    localStorage.removeItem('token')
  }

  const googleLogin = async () => {
    setLoading(true)
    setError(null)
    try {
      await new Promise((resolve) => setTimeout(resolve, 800))
      const googleUser = {
        id: 999,
        name: 'Utilisateur Google',
        email: 'google.user@gmail.com',
        role: 'client',
        avatar: 'GU',
        phone: '',
        location: 'Antananarivo',
        lat: -18.8792,
        lng: 47.5079,
        favorites: [],
        services: [],
        createdAt: new Date().toISOString().slice(0, 10),
      }
      const mockToken = 'google_mock_token_' + Date.now()
      setUser(googleUser)
      setToken(mockToken)
      localStorage.setItem('user', JSON.stringify(googleUser))
      localStorage.setItem('token', mockToken)
      return googleUser
    } catch (err) {
      setError('Erreur de connexion Google')
      throw err
    } finally {
      setLoading(false)
    }
  }

  const updateUser = (data) => {
    setUser((prev) => {
      const updated = { ...prev, ...data }
      localStorage.setItem('user', JSON.stringify(updated))
      return updated
    })
  }

  const changePassword = async (oldPassword, newPassword) => {
    setLoading(true)
    setError(null)
    try {
      await new Promise((resolve) => setTimeout(resolve, 800))
      const foundUser = mockUsers.find((u) => u.email === user?.email)
      if (!foundUser || foundUser.password !== oldPassword) {
        throw new Error('Ancien mot de passe incorrect')
      }
      if (!newPassword || newPassword.length < 6) {
        throw new Error('Le nouveau mot de passe doit contenir au moins 6 caractères')
      }
      // Simulation : pas de persistance réelle du mot de passe (mock)
      return true
    } catch (err) {
      setError(err.message)
      throw err
    } finally {
      setLoading(false)
    }
  }

  const toggleFavorite = (serviceId) => {
    setUser((prev) => {
      if (!prev) return prev
      const favorites = prev.favorites || []
      const updatedFavorites = favorites.includes(serviceId)
        ? favorites.filter((id) => id !== serviceId)
        : [...favorites, serviceId]
      const updated = { ...prev, favorites: updatedFavorites }
      localStorage.setItem('user', JSON.stringify(updated))
      return updated
    })
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        error,
        login,
        logout,
        googleLogin,
        checkAuth,
        updateUser,
        changePassword,
        toggleFavorite,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}
