import { useState, useRef, useEffect } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { FiUser, FiLogOut, FiSettings, FiBell, FiHome, FiPackage, FiStar, FiMenu, FiX, FiMap, FiSearch, FiHelpCircle } from 'react-icons/fi'
import { useAuth } from '../contexts/AuthContext'
import { mockNotifications } from '../data/mockData'

function HeaderDashboard() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const [showMenu, setShowMenu] = useState(false)
  const [showNotifications, setShowNotifications] = useState(false)
  const [showMobileNav, setShowMobileNav] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const menuRef = useRef(null)

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setShowMenu(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  const handleSearch = (e) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`)
    }
  }

  const unreadCount = mockNotifications.filter((n) => !n.read).length

  const navItems = [
    { label: 'Accueil', icon: FiHome, href: '/dashboard' },
    { label: 'Mes services', icon: FiPackage, href: '/my-services', roles: ['prestataire', 'admin'] },
    { label: 'Mes avis', icon: FiStar, href: '/my-reviews' },
    { label: 'Carte', icon: FiMap, href: '/map' },
  ].filter((item) => !item.roles || item.roles.includes(user?.role))

  const isActive = (href) => location.pathname === href

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-zinc-200 bg-white/95 backdrop-blur-xl shadow-sm" role="banner">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-3 sm:px-8 lg:px-10">
        <Link to="/dashboard" className="flex items-center gap-3 text-lg font-extrabold text-black" aria-label="TADIAVO-EO Accueil">
          <span className="grid h-10 w-10 place-items-center rounded-xl bg-yellow-400 text-sm font-black text-white">T</span>
          <span className="hidden sm:inline">TADIAVO-EO</span>
        </Link>

        <nav className="hidden items-center gap-2 text-sm font-medium text-zinc-600 lg:flex" aria-label="Navigation principale">
          {navItems.map((item) => (
            <Link
              key={item.label}
              to={item.href}
              className={`flex items-center gap-2 rounded-full px-4 py-2 transition-all ${
                isActive(item.href) ? 'bg-yellow-50 text-yellow-500' : 'hover:bg-yellow-50 hover:text-yellow-400'
              }`}
              aria-current={isActive(item.href) ? 'page' : undefined}
            >
              <item.icon className="h-4 w-4" aria-hidden="true" />
              {item.label}
            </Link>
          ))}
        </nav>

        <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-xs mx-4">
          <div className="relative w-full">
            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400 h-4 w-4" aria-hidden="true" />
            <input
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Recherche rapide..."
              className="w-full rounded-full border border-zinc-200 pl-10 pr-4 py-2 text-sm outline-none focus:border-yellow-400"
              aria-label="Recherche rapide"
            />
          </div>
        </form>

        <div className="flex items-center gap-2">
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative grid h-10 w-10 place-items-center rounded-full bg-yellow-50 text-yellow-400 transition hover:bg-yellow-100"
              aria-label={`Notifications${unreadCount ? `, ${unreadCount} non lues` : ''}`}
            >
              <FiBell className="h-5 w-5" />
              {unreadCount > 0 && (
                <span className="absolute -right-0.5 -top-0.5 grid h-4 w-4 place-items-center rounded-full bg-red-500 text-[10px] font-bold text-white">
                  {unreadCount}
                </span>
              )}
            </button>
            {showNotifications && (
              <div className="absolute right-0 mt-2 w-72 rounded-2xl border border-zinc-200 bg-white shadow-xl animate-fade-in-up">
                <div className="border-b border-zinc-100 px-4 py-3 font-semibold text-black">Notifications</div>
                <div className="max-h-64 overflow-y-auto p-2">
                  {mockNotifications.map((n) => (
                    <div key={n.id} className={`rounded-xl px-3 py-2 text-sm ${n.read ? 'text-zinc-500' : 'bg-yellow-50 text-black font-medium'}`}>
                      {n.message}
                      <p className="text-xs text-zinc-400 mt-0.5">{n.date}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="relative" ref={menuRef}>
            <button
              onClick={() => setShowMenu(!showMenu)}
              className="flex items-center gap-2 rounded-full border border-zinc-200 bg-white px-2 py-1 transition hover:border-yellow-400"
              aria-expanded={showMenu}
              aria-haspopup="true"
              aria-label="Menu utilisateur"
            >
              <span className="grid h-8 w-8 place-items-center rounded-full bg-yellow-400 text-sm font-bold text-white">
                {user?.avatar || user?.name?.charAt(0) || 'U'}
              </span>
              <span className="hidden text-sm font-semibold text-black lg:inline">{user?.name}</span>
            </button>

            {showMenu && (
              <div className="absolute right-0 mt-2 w-64 rounded-2xl border border-zinc-200 bg-white shadow-xl animate-fade-in-up" role="menu">
                <div className="border-b border-zinc-100 px-4 py-3">
                  <p className="font-semibold text-black">{user?.name}</p>
                  <p className="text-xs text-zinc-500">{user?.email}</p>
                  <span className="mt-1 inline-block rounded-full bg-yellow-50 px-2 py-0.5 text-xs font-medium text-yellow-400 capitalize">
                    {user?.role}
                  </span>
                </div>
                <div className="p-2">
                  <Link to="/profile" role="menuitem" className="flex items-center gap-3 rounded-xl px-3 py-2 text-sm text-zinc-600 transition hover:bg-yellow-50 hover:text-yellow-400">
                    <FiUser className="h-4 w-4" /> Profil
                  </Link>
                  <Link to="/profile" role="menuitem" className="flex items-center gap-3 rounded-xl px-3 py-2 text-sm text-zinc-600 transition hover:bg-yellow-50 hover:text-yellow-400">
                    <FiSettings className="h-4 w-4" /> Parametres
                  </Link>
                  <Link to="/" role="menuitem" className="flex items-center gap-3 rounded-xl px-3 py-2 text-sm text-zinc-600 transition hover:bg-yellow-50 hover:text-yellow-400">
                    <FiHelpCircle className="h-4 w-4" /> Aide
                  </Link>
                  <button onClick={handleLogout} role="menuitem" className="flex w-full items-center gap-3 rounded-xl px-3 py-2 text-sm text-red-600 transition hover:bg-red-50">
                    <FiLogOut className="h-4 w-4" /> Deconnexion
                  </button>
                </div>
              </div>
            )}
          </div>

          <button
            onClick={() => setShowMobileNav(!showMobileNav)}
            className="grid h-10 w-10 place-items-center rounded-full border border-zinc-200 bg-white text-zinc-700 transition hover:bg-yellow-50 lg:hidden"
            aria-label={showMobileNav ? 'Fermer le menu' : 'Ouvrir le menu'}
            aria-expanded={showMobileNav}
          >
            {showMobileNav ? <FiX className="h-5 w-5" /> : <FiMenu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {showMobileNav && (
        <nav className="border-t border-zinc-200 bg-white px-5 py-4 lg:hidden animate-fade-in-up" aria-label="Navigation mobile">
          <form onSubmit={handleSearch} className="mb-4">
            <input
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Rechercher..."
              className="w-full rounded-full border border-zinc-200 px-4 py-2 text-sm outline-none focus:border-yellow-400"
            />
          </form>
          {navItems.map((item) => (
            <Link
              key={item.label}
              to={item.href}
              onClick={() => setShowMobileNav(false)}
              className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium text-zinc-600 hover:bg-yellow-50"
            >
              <item.icon className="h-5 w-5" /> {item.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  )
}

export default HeaderDashboard
