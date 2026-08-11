import { useState, useEffect, useCallback, useMemo } from 'react'
import { FiSearch, FiMapPin, FiFilter, FiX, FiNavigation } from 'react-icons/fi'
import GoogleMap from './GoogleMap'
import ServiceCard from '../ServiceCard'
import { mockCategories, searchServices, filterByDistance } from '../../data/mockData'
import { useAuth } from '../../contexts/AuthContext'

const RECENT_SEARCHES_KEY = 'tadiavo_recent_searches'

function SearchMap({ initialQuery = '', initialCategory = '' }) {
  const { user } = useAuth()
  const [query, setQuery] = useState(initialQuery)
  const [category, setCategory] = useState(initialCategory)
  const [radius, setRadius] = useState(10)
  const [selectedService, setSelectedService] = useState(null)
  const [userLocation, setUserLocation] = useState(null)
  const [showFilters, setShowFilters] = useState(false)
  const [showList, setShowList] = useState(true)
  const [recentSearches, setRecentSearches] = useState([])
  const [showDirections, setShowDirections] = useState(false)

  useEffect(() => {
    const saved = localStorage.getItem(RECENT_SEARCHES_KEY)
    if (saved) setRecentSearches(JSON.parse(saved))
  }, [])

  useEffect(() => {
    if (user?.lat && user?.lng) {
      setUserLocation({ lat: user.lat, lng: user.lng })
    } else if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => setUserLocation({ lat: pos.coords.latitude, lng: pos.coords.longitude }),
        () => setUserLocation({ lat: -18.9137, lng: 47.5361 })
      )
    }
  }, [user])

  const results = useMemo(() => {
    let list = searchServices(query, category, '', userLocation?.lat, userLocation?.lng, radius)
    if (userLocation) {
      list = filterByDistance(list, userLocation.lat, userLocation.lng, radius)
    }
    return list
  }, [query, category, radius, userLocation])

  const saveSearch = useCallback((q) => {
    if (!q.trim()) return
    setRecentSearches((prev) => {
      const updated = [q, ...prev.filter((s) => s !== q)].slice(0, 5)
      localStorage.setItem(RECENT_SEARCHES_KEY, JSON.stringify(updated))
      return updated
    })
  }, [])

  const handleSearch = (e) => {
    e.preventDefault()
    saveSearch(query)
  }

  const handleMyLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((pos) => {
        setUserLocation({ lat: pos.coords.latitude, lng: pos.coords.longitude })
      })
    }
  }

  const handleMarkerClick = (service) => {
    setSelectedService(service)
    setShowList(false)
  }

  return (
    <div className="relative min-h-[calc(100dvh-96px)] flex flex-col lg:flex-row">
      {/* Overlay recherche */}
      <div className="absolute top-4 left-4 right-4 z-20 lg:left-auto lg:right-auto lg:w-[calc(60%-2rem)] lg:max-w-xl">
        <form onSubmit={handleSearch} className="flex gap-2">
          <div className="relative flex-1">
            <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Rechercher un service..."
              className="w-full rounded-full border border-zinc-200 bg-white pl-12 pr-4 py-3 shadow-lg outline-none focus:border-yellow-400"
            />
          </div>
          <button
            type="button"
            onClick={() => setShowFilters(!showFilters)}
            className="grid h-12 w-12 place-items-center rounded-full bg-white border border-zinc-200 shadow-lg hover:border-yellow-400 transition"
            aria-label="Filtres"
          >
            <FiFilter />
          </button>
          <button
            type="button"
            onClick={handleMyLocation}
            className="grid h-12 w-12 place-items-center rounded-full bg-yellow-400 text-white shadow-lg hover:bg-yellow-500 transition"
            aria-label="Ma position"
          >
            <FiMapPin />
          </button>
        </form>

        {showFilters && (
          <div className="mt-2 rounded-2xl border border-zinc-200 bg-white p-4 shadow-xl animate-fade-in-up">
            <div className="flex items-center justify-between mb-3">
              <span className="font-semibold text-black">Filtres</span>
              <button onClick={() => setShowFilters(false)} aria-label="Fermer filtres">
                <FiX />
              </button>
            </div>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full rounded-full border border-zinc-200 px-4 py-2 mb-3 outline-none focus:border-yellow-400"
            >
              {mockCategories.map((cat) => (
                <option key={cat} value={cat === 'Toutes categories' || cat === 'Toutes catégories' ? '' : cat}>
                  {cat}
                </option>
              ))}
            </select>
            <label className="text-sm text-zinc-600">Rayon : {radius} km</label>
            <input
              type="range"
              min="1"
              max="50"
              value={radius}
              onChange={(e) => setRadius(Number(e.target.value))}
              className="w-full accent-yellow-400"
            />
            {recentSearches.length > 0 && (
              <div className="mt-3">
                <p className="text-xs text-zinc-500 mb-1">Recherches recentes</p>
                <div className="flex flex-wrap gap-1">
                  {recentSearches.map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => setQuery(s)}
                      className="rounded-full bg-yellow-50 px-3 py-1 text-xs text-zinc-600 hover:bg-yellow-100"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Liste resultats - Desktop 40% droite, Mobile overlay */}
      <div
        className={`${
          showList ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        } absolute lg:relative z-10 lg:z-0 w-full lg:w-[40%] h-full bg-white border-r border-zinc-200 overflow-y-auto transition-transform duration-300`}
      >
        <div className="p-4 pt-24 lg:pt-4">
          <div className="flex items-center justify-between mb-4">
            <p className="text-sm text-zinc-600">{results.length} resultat(s)</p>
            <button
              onClick={() => setShowList(false)}
              className="lg:hidden text-sm text-yellow-500"
            >
              Voir carte
            </button>
          </div>
          <div className="space-y-4">
            {results.map((service) => (
              <div
                key={service.id}
                onClick={() => {
                  setSelectedService(service)
                  setShowList(false)
                }}
                className={`cursor-pointer transition ${
                  selectedService?.id === service.id ? 'ring-2 ring-yellow-400 rounded-[2rem]' : ''
                }`}
              >
                <ServiceCard service={service} compact />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Carte - Desktop 60% gauche */}
      <div className="flex-1 h-full relative">
        <GoogleMap
          services={results}
          center={selectedService ? { lat: selectedService.lat, lng: selectedService.lng } : userLocation}
          zoom={selectedService ? 15 : 13}
          selectedService={selectedService}
          userLocation={userLocation}
          radius={radius}
          showDirections={showDirections}
          onMarkerClick={handleMarkerClick}
        />

        {!showList && (
          <button
            onClick={() => setShowList(true)}
            className="absolute bottom-4 left-4 z-10 rounded-full bg-white px-4 py-2 text-sm font-semibold shadow-lg lg:hidden"
          >
            Voir liste ({results.length})
          </button>
        )}

        {selectedService && userLocation && (
          <button
            onClick={() => setShowDirections(!showDirections)}
            className="absolute bottom-4 right-4 z-10 flex items-center gap-2 rounded-full bg-yellow-400 px-4 py-2 text-sm font-semibold text-white shadow-lg hover:bg-yellow-500 transition"
          >
            <FiNavigation /> Itineraire
          </button>
        )}
      </div>
    </div>
  )
}

export default SearchMap
