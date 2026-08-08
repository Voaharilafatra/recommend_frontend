import { lazy, Suspense, useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route, useLocation, Navigate } from 'react-router-dom'
import { AuthProvider, useAuth } from './contexts/AuthContext'
import Header from './components/Header.jsx'
import Footer from './components/Footer.jsx'
import HeaderDashboard from './components/HeaderDashboard.jsx'
import FooterDashboard from './components/FooterDashboard.jsx'
import Loader from './components/Loader.jsx'
import MobileNav from './components/MobileNav.jsx'
import BackToTop from './components/BackToTop.jsx'
import PrivateRoute from './components/auth/PrivateRoute.jsx'

const Home = lazy(() => import('./pages/Home.jsx'))
const OAuth = lazy(() => import('./pages/OAuth.jsx'))
const Dashboard = lazy(() => import('./pages/Dashboard.jsx'))
const SearchResults = lazy(() => import('./pages/SearchResults.jsx'))
const MapView = lazy(() => import('./pages/MapView.jsx'))
const Profile = lazy(() => import('./pages/Profile.jsx'))
const Favorites = lazy(() => import('./pages/Favorites.jsx'))
const MyServices = lazy(() => import('./pages/MyServices.jsx'))
const MyReviews = lazy(() => import('./pages/MyReviews.jsx'))
const ServiceDetail = lazy(() => import('./pages/ServiceDetail.jsx'))

function PageLoader() {
  return (
    <div className="flex min-h-[50vh] items-center justify-center">
      <div className="h-8 w-8 animate-spin rounded-full border-4 border-yellow-400/20 border-t-yellow-400" />
    </div>
  )
}

function Layout() {
  const { user, isAuthenticated } = useAuth()
  const location = useLocation()

  const isFullScreenMap = location.pathname === '/map'
  const isAuthPage = location.pathname === '/oauth'
  const isPublicHome = location.pathname === '/'

  const protectedRoutes = [
    '/dashboard', '/profile', '/favorites', '/my-services', '/my-reviews',
    '/search', '/map',
  ]
  const isProtectedRoute = protectedRoutes.some((r) => location.pathname.startsWith(r))
  const showDashboardLayout = isAuthenticated && isProtectedRoute && !isFullScreenMap

  return (
    <>
      {!isFullScreenMap && !isAuthPage && (showDashboardLayout ? <HeaderDashboard /> : !isPublicHome || !isAuthenticated ? <Header /> : <Header />)}

      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/oauth" element={<OAuth />} />
          <Route path="/service/:id" element={<ServiceDetail />} />

          <Route path="/dashboard" element={
            <PrivateRoute><Dashboard /></PrivateRoute>
          } />
          <Route path="/profile" element={
            <PrivateRoute><Profile /></PrivateRoute>
          } />
          <Route path="/favorites" element={
            <PrivateRoute><Favorites /></PrivateRoute>
          } />
          <Route path="/my-services" element={
            <PrivateRoute requiredRoles={['prestataire', 'admin']}><MyServices /></PrivateRoute>
          } />
          <Route path="/my-reviews" element={
            <PrivateRoute><MyReviews /></PrivateRoute>
          } />
          <Route path="/search" element={
            <PrivateRoute><SearchResults /></PrivateRoute>
          } />
          <Route path="/map" element={
            <PrivateRoute><MapView /></PrivateRoute>
          } />

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Suspense>

      {!isFullScreenMap && !isAuthPage && (showDashboardLayout ? <FooterDashboard /> : <Footer />)}

      {!showDashboardLayout && !isFullScreenMap && !isAuthPage && <MobileNav />}
      <BackToTop />
    </>
  )
}

function App() {
  const [showLoader, setShowLoader] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setShowLoader(false), 4000)
    return () => clearTimeout(timer)
  }, [])

  if (showLoader) {
    return <Loader />
  }

  return (
    <AuthProvider>
      <BrowserRouter>
        <Layout />
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App
