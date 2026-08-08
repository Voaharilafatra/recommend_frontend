import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { FiMapPin, FiPhone, FiHeart, FiShare2, FiNavigation, FiFlag, FiClock, FiEye } from 'react-icons/fi'
import { getServiceById, getReviewsByServiceId, getSimilarServices, calculateDistance } from '../data/mockData'
import { useAuth } from '../contexts/AuthContext'
import RatingStars from '../components/RatingStars'
import CommentList from '../components/CommentList'
import ServiceCard from '../components/ServiceCard'
import GoogleMap from '../components/maps/GoogleMap'

function ServiceDetail() {
  const { id } = useParams()
  const { user, toggleFavorite } = useAuth()
  const [service, setService] = useState(null)
  const [reviews, setReviews] = useState([])
  const [userLocation, setUserLocation] = useState(null)
  const [showDirections, setShowDirections] = useState(false)

  useEffect(() => {
    const s = getServiceById(id)
    setService(s)
    if (s) setReviews(getReviewsByServiceId(id))
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => setUserLocation({ lat: pos.coords.latitude, lng: pos.coords.longitude })
      )
    }
  }, [id])

  if (!service) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <p className="text-zinc-500">Service introuvable</p>
      </div>
    )
  }

  const isFavorite = user?.favorites?.includes(service.id)
  const similar = getSimilarServices(service.id)
  const distance = userLocation
    ? calculateDistance(userLocation.lat, userLocation.lng, service.lat, service.lng)
    : null

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href)
  }

  return (
    <div className="px-5 py-20 pt-28 sm:px-8 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <div className="rounded-[2rem] overflow-hidden mb-8">
          <img src={service.image} alt={service.title} className="w-full h-64 sm:h-80 object-cover"
            onError={(e) => { e.target.src = 'https://via.placeholder.com/800x400/fef9c3/854d0e?text=Service' }} />
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-6">
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <span className="rounded-full bg-yellow-400 px-3 py-1 text-xs font-semibold text-black">{service.category}</span>
                {service.tags?.map((tag) => (
                  <span key={tag} className="rounded-full bg-yellow-50 px-3 py-1 text-xs text-yellow-700">{tag}</span>
                ))}
              </div>
              <h1 className="text-3xl font-bold text-black">{service.title}</h1>
              <div className="mt-2 flex items-center gap-4">
                <RatingStars rating={service.rating} total={service.reviews} showCount size="medium" />
              </div>
            </div>

            <div className="flex items-center gap-3">
              <span className="grid h-10 w-10 place-items-center rounded-full bg-yellow-400 text-sm font-bold text-white">
                {service.prestataire?.charAt(0)}
              </span>
              <div>
                <p className="font-semibold text-black">{service.prestataire}</p>
                <p className="text-sm text-zinc-500">Prestataire verifie</p>
              </div>
            </div>

            <p className="text-zinc-600 leading-relaxed">{service.description}</p>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-xl border border-zinc-200 p-4">
                <FiClock className="text-yellow-400 mb-2" />
                <p className="text-sm font-medium text-black">Disponibilites</p>
                <p className="text-sm text-zinc-500">{service.disponibility}</p>
              </div>
              <div className="rounded-xl border border-zinc-200 p-4">
                <FiEye className="text-yellow-400 mb-2" />
                <p className="text-sm font-medium text-black">Statistiques</p>
                <p className="text-sm text-zinc-500">{service.views} vues - Satisfaction 95%</p>
              </div>
            </div>

            <div>
              <h2 className="text-xl font-bold text-black mb-4">Avis ({reviews.length})</h2>
              <CommentList
                reviews={reviews}
                canReply={user?.role === 'prestataire' && service.prestataireId === user?.id}
                showModeration={user?.role === 'admin'}
              />
            </div>

            {similar.length > 0 && (
              <div>
                <h2 className="text-xl font-bold text-black mb-4">Services similaires</h2>
                <div className="grid gap-4 md:grid-cols-3">
                  {similar.map((s) => (
                    <ServiceCard key={s.id} service={s} />
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="space-y-4">
            <div className="rounded-[1.5rem] border border-zinc-200 bg-white p-6 shadow-sm sticky top-28">
              <p className="text-3xl font-bold text-yellow-400">{service.price?.toLocaleString()} Ar</p>
              {distance != null && (
                <p className="mt-1 flex items-center gap-1 text-sm text-zinc-500">
                  <FiMapPin className="text-yellow-400" /> {distance} km de vous
                </p>
              )}

              <div className="mt-4 space-y-2">
                <a href={`tel:${service.phone}`}
                  className="flex w-full items-center justify-center gap-2 rounded-full bg-yellow-400 px-4 py-3 font-semibold text-white hover:bg-yellow-500 transition">
                  <FiPhone /> Appeler
                </a>
                <button
                  onClick={() => toggleFavorite && toggleFavorite(service.id)}
                  className={`flex w-full items-center justify-center gap-2 rounded-full border px-4 py-3 font-semibold transition ${
                    isFavorite ? 'border-red-300 bg-red-50 text-red-500' : 'border-zinc-200 hover:border-yellow-400'
                  }`}
                >
                  <FiHeart className={isFavorite ? 'fill-red-500' : ''} />
                  {isFavorite ? 'Retirer des favoris' : 'Ajouter aux favoris'}
                </button>
                <button onClick={() => setShowDirections(!showDirections)}
                  className="flex w-full items-center justify-center gap-2 rounded-full border border-zinc-200 px-4 py-3 font-semibold hover:border-yellow-400 transition">
                  <FiNavigation /> Itineraire
                </button>
                <button onClick={handleShare}
                  className="flex w-full items-center justify-center gap-2 rounded-full border border-zinc-200 px-4 py-3 font-semibold hover:border-yellow-400 transition">
                  <FiShare2 /> Partager
                </button>
                <button className="flex w-full items-center justify-center gap-2 rounded-full border border-zinc-200 px-4 py-3 text-sm text-zinc-500 hover:border-red-300 hover:text-red-500 transition">
                  <FiFlag /> Signaler
                </button>
              </div>

              <div className="mt-4 pt-4 border-t border-zinc-100">
                <p className="text-sm text-zinc-500 flex items-center gap-1">
                  <FiMapPin className="text-yellow-400" /> {service.location}
                </p>
              </div>
            </div>

            <div className="rounded-[1.5rem] border border-zinc-200 overflow-hidden h-48">
              <GoogleMap
                services={[service]}
                center={{ lat: service.lat, lng: service.lng }}
                zoom={15}
                userLocation={userLocation}
                showDirections={showDirections}
              />
            </div>
            <Link to="/map" className="block text-center text-sm text-yellow-500 hover:underline">
              Voir sur la carte plein ecran
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ServiceDetail
