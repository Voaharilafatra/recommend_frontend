import { useState } from 'react'
import { Link } from 'react-router-dom'
import { FiMapPin, FiHeart, FiShare2, FiNavigation } from 'react-icons/fi'
import RatingStars from './RatingStars'
import { useAuth } from '../contexts/AuthContext'

function ServiceCard({ service, compact = false, onMapClick }) {
  const { user, toggleFavorite } = useAuth()
  const [imgError, setImgError] = useState(false)
  const isFavorite = user?.favorites?.includes(service.id)

  const handleShare = (e) => {
    e.preventDefault()
    e.stopPropagation()
    if (navigator.share) {
      navigator.share({ title: service.title, url: `${window.location.origin}/service/${service.id}` })
    } else {
      navigator.clipboard.writeText(`${window.location.origin}/service/${service.id}`)
    }
  }

  const handleFavorite = (e) => {
    e.preventDefault()
    e.stopPropagation()
    toggleFavorite && toggleFavorite(service.id)
  }

  const cardContent = (
    <div
      className={`group rounded-[2rem] border border-zinc-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-lg hover:border-yellow-400 ${
        compact ? 'p-4' : 'p-6'
      }`}
    >
      <div className={`relative w-full rounded-xl bg-yellow-50 overflow-hidden ${compact ? 'aspect-[16/9] mb-3' : 'aspect-video mb-4'}`}>
        {!imgError ? (
          <img
            src={service.image}
            alt={service.title}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            onError={() => setImgError(true)}
          />
        ) : (
          <div className="flex h-full items-center justify-center text-yellow-600 text-sm font-medium">Image indisponible</div>
        )}
        {service.isNew && (
          <span className="absolute left-2 top-2 rounded-full bg-black px-2 py-0.5 text-[10px] font-bold text-white">New</span>
        )}
        {service.isPromo && (
          <span className="absolute right-2 top-2 rounded-full bg-yellow-400 px-2 py-0.5 text-[10px] font-bold text-black">Promo</span>
        )}
      </div>

      <div className="flex items-start justify-between gap-2">
        <h3 className={`font-semibold text-black group-hover:text-yellow-400 transition-colors ${compact ? 'text-base' : 'text-lg'}`}>
          {service.title}
        </h3>
        <RatingStars rating={service.rating} size="small" />
      </div>

      <p className="mt-1 text-xs text-zinc-500">{service.reviews} avis</p>
      <p className="mt-2 text-sm text-zinc-600 line-clamp-2">{service.description}</p>

      <div className="mt-2 flex items-center gap-2 text-sm text-zinc-500">
        <span className="grid h-6 w-6 place-items-center rounded-full bg-yellow-100 text-xs font-bold text-yellow-600">
          {service.prestataire?.charAt(0)}
        </span>
        <span>{service.prestataire}</span>
      </div>

      <div className="mt-3 flex items-center justify-between text-sm text-zinc-500">
        <div className="flex items-center gap-1">
          <FiMapPin className="text-yellow-400 shrink-0" />
          <span className="truncate max-w-[140px]">{service.location}</span>
          {service.distance != null && <span className="text-yellow-500 font-medium">({service.distance} km)</span>}
        </div>
      </div>

      <div className="mt-2 flex flex-wrap gap-1">
        {service.tags?.slice(0, 3).map((tag) => (
          <span key={tag} className="rounded-full bg-yellow-50 px-2 py-0.5 text-[10px] font-medium text-yellow-700">
            {tag}
          </span>
        ))}
      </div>

      <div className="mt-4 pt-3 border-t border-zinc-100 flex items-center justify-between">
        <span className="text-lg font-bold text-yellow-400">{service.price?.toLocaleString()} Ar</span>
        <div className="flex items-center gap-1">
          <button
            onClick={handleFavorite}
            aria-label={isFavorite ? 'Retirer des favoris' : 'Ajouter aux favoris'}
            className={`grid h-8 w-8 place-items-center rounded-full border transition ${
              isFavorite ? 'border-red-300 bg-red-50 text-red-500' : 'border-zinc-200 text-zinc-500 hover:border-red-300 hover:text-red-500'
            }`}
          >
            <FiHeart className={`h-4 w-4 ${isFavorite ? 'fill-red-500' : ''}`} />
          </button>
          <button
            onClick={handleShare}
            aria-label="Partager"
            className="grid h-8 w-8 place-items-center rounded-full border border-zinc-200 text-zinc-500 hover:border-yellow-400 hover:text-yellow-400 transition"
          >
            <FiShare2 className="h-4 w-4" />
          </button>
          {onMapClick && (
            <button
              onClick={(e) => { e.preventDefault(); e.stopPropagation(); onMapClick(service) }}
              aria-label="Voir sur la carte"
              className="grid h-8 w-8 place-items-center rounded-full border border-zinc-200 text-zinc-500 hover:border-yellow-400 hover:text-yellow-400 transition"
            >
              <FiNavigation className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  )

  if (compact) return cardContent

  return (
    <Link to={`/service/${service.id}`} className="block focus:outline-none focus:ring-2 focus:ring-yellow-400 rounded-[2rem]">
      {cardContent}
    </Link>
  )
}

export default ServiceCard
