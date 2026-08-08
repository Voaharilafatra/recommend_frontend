import { Navigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import Loader from '../components/Loader'
import ClientDashboard from './dashboard/ClientDashboard'
import PrestataireDashboard from './dashboard/PrestataireDashboard'
import AdminDashboard from './dashboard/AdminDashboard'
import { mockServices, mockReviews, mockNotifications } from '../data/mockData'

function Dashboard() {
  const { user, loading, isAuthenticated, updateUser } = useAuth()

  if (loading) {
    return <Loader />
  }

  if (!isAuthenticated || !user) {
    return <Navigate to="/oauth" replace />
  }

  const sharedProps = {
    user,
    services: mockServices,
    reviews: mockReviews,
    stats: {},
    notifications: mockNotifications,
    onUpdate: updateUser,
  }

  const renderDashboard = () => {
    switch (user.role) {
      case 'client':
        return <ClientDashboard {...sharedProps} />
      case 'prestataire':
        return <PrestataireDashboard {...sharedProps} />
      case 'admin':
        return <AdminDashboard {...sharedProps} />
      default:
        return (
          <div className="flex min-h-[50vh] items-center justify-center">
            <div className="text-center">
              <h2 className="text-xl font-bold text-black">Role non reconnu</h2>
              <p className="mt-2 text-zinc-500">Votre compte n'a pas de role valide. Contactez l'administrateur.</p>
            </div>
          </div>
        )
    }
  }

  return (
    <div className="px-5 py-20 pt-28 sm:px-8 lg:px-10">
      <div className="mx-auto max-w-7xl">
        {renderDashboard()}
      </div>
    </div>
  )
}

export default Dashboard
