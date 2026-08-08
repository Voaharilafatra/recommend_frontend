import { useState, useEffect, useMemo } from 'react'
import { FiSearch, FiFilter, FiMapPin, FiShare2, FiPlus, FiMinus, FiMaximize, FiList, FiX } from 'react-icons/fi'
import GoogleMap from '../components/maps/GoogleMap'
import ServiceCard from '../components/ServiceCard'
import { searchServices, mockCategories } from '../data/mockData'
import { categoryColors } from '../components/maps/mapUtils'
import { useAuth } from '../contexts/AuthContext'

function MapView() {
  const { user } = useAuth()
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState('')
  const [radius, setRadius] = useState(10)
  const [selectedService, setSelectedService] = useState(null)
  const [userLocation, setUserLocation] = useState(null)
  const [showFilters, setShowFilters] = useState(false)
  const [showList, setShowList] = useState(false)
  const [showDirections, setShowDirections] = useState(false)
  const [showLegend, setShowLegend] = useState(true)

  useEffect(() => {
    if (user?.lat) {
      setUserLocation({ lat: user.lat, lng: user.lng })
    } else if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => setUserLocation({ lat: pos.coords.latitude, lng: pos.coords.longitude }),
        () => setUserLocation({ lat: -18.9137, lng: 47.5361 })
      )
    }
  }, [user])

  const results = useMemo(
    () => searchServices(query, category, '', userLocation?.lat, userLocation?.lng, radius),
    [query, category, radius, userLocation]
  )

  const handleMyLocation = () => {
    navigator.geolocation.getCurrentPosition((pos) => {
      setUserLocation({ lat: pos.coords.latitude, lng: pos.coords.longitude })
    })
  }

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href)
  }

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen()
    } else {
      document.exitFullscreen()
    }
  }

  return (
    <div className="relative h-screen w-full">
      <GoogleMap
        services={results}
        center={selectedService ? { lat: selectedService.lat, lng: selectedService.lng } : userLocation}
        zoom={selectedService ? 15 : 13}
        selectedService={selectedService}
        userLocation={userLocation}
        radius={radius}
        showDirections={showDirections}
        onMarkerClick={setSelectedService}
        className="h-full"
      />

      {/* Barre de recherche */}
      <div className="absolute top-4 left-4 right-4 z-20 max-w-xl">
        <form onSubmit={(e) => e.preventDefault()} className="flex gap-2">
          <div className="relative flex-1">
            <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Rechercher..."
              className="w-full rounded-full border border-zinc-200 bg-white pl-12 pr-4 py-3 shadow-lg outline-none focus:border-yellow-400"
            />
          </div>
          <button type="button" onClick={() => setShowFilters(!showFilters)}
            className="grid h-12 w-12 place-items-center rounded-full bg-white shadow-lg border border-zinc-200 hover:border-yellow-400 transition"
            aria-label="Filtres">
            <FiFilter />
          </button>
        </form>
      </div>

      {/* Filtres overlay gauche */}
      {showFilters && (
        <div className="absolute top-20 left-4 z-20 w-72 rounded-2xl border border-zinc-200 bg-white p-4 shadow-xl animate-slide-in-left">
          <div className="flex justify-between mb-3">
            <span className="font-semibold text-black">Filtres</span>
            <button onClick={() => setShowFilters(false)} aria-label="Fermer"><FiX /></button>
          </div>
          <select value={category} onChange={(e) => setCategory(e.target.value)}
            className="w-full rounded-full border border-zinc-200 px-4 py-2 mb-3 text-sm outline-none focus:border-yellow-400">
            {mockCategories.map((cat) => (
              <option key={cat} value={cat.includes('Toutes') ? '' : cat}>{cat}</option>
            ))}
          </select>
          <label className="text-xs text-zinc-500">Rayon : {radius} km</label>
          <input type="range" min="1" max="50" value={radius}
            onChange={(e) => setRadius(Number(e.target.value))} className="w-full accent-yellow-400" />
        </div>
      )}

      {/* Controles droite */}
      <div className="absolute top-20 right-4 z-20 flex flex-col gap-2">
        <button onClick={handleMyLocation} className="grid h-10 w-10 place-items-center rounded-full bg-white shadow-lg border border-zinc-200 hover:border-yellow-400 transition" aria-label="Ma position">
          <FiMapPin />
        </button>
        <button onClick={toggleFullscreen} className="grid h-10 w-10 place-items-center rounded-full bg-white shadow-lg border border-zinc-200 hover:border-yellow-400 transition" aria-label="Plein ecran">
          <FiMaximize />
        </button>
        <button onClick={handleShare} className="grid h-10 w-10 place-items-center rounded-full bg-white shadow-lg border border-zinc-200 hover:border-yellow-400 transition" aria-label="Partager">
          <FiShare2 />
        </button>
        <button onClick={() => setShowList(!showList)} className="grid h-10 w-10 place-items-center rounded-full bg-white shadow-lg border border-zinc-200 hover:border-yellow-400 transition" aria-label="Liste">
          <FiList />
        </button>
      </div>

      {/* Legende bas droite */}
      {showLegend && (
        <div className="absolute bottom-4 right-4 z-20 rounded-2xl border border-zinc-200 bg-white p-4 shadow-lg max-w-xs animate-fade-in-up">
          <div className="flex justify-between mb-2">
            <span className="text-xs font-semibold text-black">Categories</span>
            <button onClick={() => setShowLegend(false)} className="text-zinc-400"><FiX className="h-3 w-3" /></button>
          </div>
          <div className="grid grid-cols-2 gap-1">
            {Object.entries(categoryColors).map(([cat, color]) => (
              <div key={cat} className="flex items-center gap-1.5">
                <span className="h-3 w-3 rounded-full shrink-0" style={{ backgroundColor: color }} />
                <span className="text-[10px] text-zinc-600 truncate">{cat}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Drawer liste mobile/desktop */}
      {showList && (
        <div className="absolute bottom-0 left-0 right-0 z-20 max-h-[50vh] overflow-y-auto rounded-t-2xl border-t border-zinc-200 bg-white p-4 shadow-2xl animate-slide-in-left">
          <div className="flex justify-between mb-3">
            <span className="font-semibold text-black">{results.length} resultat(s)</span>
            <button onClick={() => setShowList(false)}><FiX /></button>
          </div>
          <div className="space-y-3">
            {results.slice(0, 10).map((service) => (
              <div key={service.id} onClick={() => { setSelectedService(service); setShowList(false) }}>
                <ServiceCard service={service} compact />
              </div>
            ))}
          </div>
        </div>
      )}

      {selectedService && userLocation && (
        <button
          onClick={() => setShowDirections(!showDirections)}
          className="absolute bottom-4 left-4 z-20 rounded-full bg-yellow-400 px-5 py-2.5 text-sm font-semibold text-white shadow-lg hover:bg-yellow-500 transition"
        >
          Itineraire
        </button>
      )}
    </div>
  )
}

export default MapView
