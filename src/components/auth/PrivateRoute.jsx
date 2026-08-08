import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import Loader from '../Loader'

/**
 * PrivateRoute
 * Protege une route en verifiant l'authentification et, si besoin, le role
 * de l'utilisateur connecte.
 *
 * Props:
 * - children: le contenu a afficher si autorise
 * - requiredRoles: tableau optionnel des roles autorises (ex: ['admin'])
 * - redirectTo: route de redirection si non connecte (defaut: /oauth)
 */
function PrivateRoute({ children, requiredRoles, redirectTo = '/oauth' }) {
  const { isAuthenticated, loading, user } = useAuth()
  const location = useLocation()

  if (loading) {
    return <Loader />
  }

  if (!isAuthenticated) {
    return <Navigate to={redirectTo} state={{ from: location }} replace />
  }

  if (requiredRoles && requiredRoles.length > 0 && !requiredRoles.includes(user?.role)) {
    return <Navigate to="/dashboard" replace />
  }

  return children
}

export default PrivateRoute
