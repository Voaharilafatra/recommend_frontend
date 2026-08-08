import { Link } from 'react-router-dom'
import { FiX, FiStar, FiMapPin, FiPhone, FiHeart, FiNavigation } from 'react-icons/fi'
import { useAuth } from '../../contexts/AuthContext'
import { getCategoryColor } from './mapUtils'

/**
 * ServicePopup - InfoWindow personnalisée affichée au clic sur un marqueur.
 * Props : service, distance, onClose, onDirections
 */
function ServicePopup({ service, distance, onClose, onDirections }) {
  const { user, toggleFavorite } = useAuth()
  if (!service) return null

  const isFavorite = user?.favorites?.includes(service.id)

  return (
    <div className="w-72 rounded-2xl border border-zinc-200 bg-white shadow-xl animate-zoom-in overflow-hidden">
      <div className="relative">
        <img
          src={service.image}
          alt={service.title}
          className="h-28 w-full object-cover"
          onError={(e) => { e.target.src = 'https://via.placeholder.com/400x200/fef9c3/854d0e?text=Service' }}
        />
        <button
          onClick={onClose}
          aria-label="Fermer"
          className="absolute right-2 top-2 grid h-7 w-7 place-items-center rounded-full bg-white/90 text-zinc-600 shadow transition hover:bg-red-50 hover:text-red-500"
        >
          <FiX className="h-4 w-4" />
        </button>
        <span
          className="absolute left-2 top-2 rounded-full px-2 py-1 text-[10px] font-semibold text-white"
          style={{ backgroundColor: getCategoryColor(service.category) }}
        >
          {service.category}
        </span>
      </div>

      <div className="p-4">
        <Link to={`/service/${service.id}`} className="font-semibold text-black hover:text-yellow-500 transition-colors">
          {service.title}
        </Link>

        <div className="mt-1 flex items-center gap-2 text-sm">
          <span className="flex items-center gap-1 text-yellow-400">
            <FiStar className="fill-yellow-400" /> {service.rating}
          </span>
          <span className="text-zinc-400">({service.reviews} avis)</span>
        </div>

        {distance !== undefined && distance !== null && (
          <div className="mt-1 flex items-center gap-1 text-xs text-zinc-500">
            <FiMapPin className="text-yellow-400" /> {distance} km de vous
          </div>
        )}

        <p className="mt-2 text-xs text-zinc-600 line-clamp-2">{service.description}</p>

        <div className="mt-3 flex items-center justify-between">
          <span className="text-sm font-bold text-yellow-500">{service.price?.toLocaleString()} Ar</span>
          <a href={`tel:${service.phone}`} className="flex items-center gap-1 text-xs text-zinc-500 hover:text-yellow-500">
            <FiPhone className="h-3 w-3" /> {service.phone}
          </a>
        </div>

        <div className="mt-3 flex items-center gap-2">
          <Link
            to={`/service/${service.id}`}
            className="flex-1 rounded-full bg-yellow-400 px-3 py-2 text-center text-xs font-semibold text-white transition hover:bg-yellow-500 hover:scale-105"
          >
            Voir détail
          </Link>
          <button
            onClick={() => onDirections && onDirections(service)}
            aria-label="Itinéraire"
            className="grid h-9 w-9 place-items-center rounded-full border border-zinc-200 text-zinc-600 transition hover:border-yellow-400 hover:text-yellow-500"
          >
            <FiNavigation className="h-4 w-4" />
          </button>
          <button
            onClick={() => toggleFavorite && toggleFavorite(service.id)}
            aria-label="Favoris"
            className={`grid h-9 w-9 place-items-center rounded-full border transition ${
              isFavorite ? 'border-red-300 bg-red-50 text-red-500' : 'border-zinc-200 text-zinc-600 hover:border-red-300 hover:text-red-500'
            }`}
          >
            <FiHeart className={`h-4 w-4 ${isFavorite ? 'fill-red-500' : ''}`} />
          </button>
        </div>
      </div>
    </div>
  )
}

export default ServicePopup
