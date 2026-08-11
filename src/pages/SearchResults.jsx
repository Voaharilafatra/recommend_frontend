import { useState, useEffect, useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import { searchServices, mockCategories, calculateDistance } from '../data/mockData'
import ServiceCard from '../components/ServiceCard'
import GoogleMap from '../components/maps/GoogleMap'
import { FiFilter, FiX, FiMapPin, FiList } from 'react-icons/fi'

function SearchResults() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [query, setQuery] = useState(searchParams.get('q') || '')
  const [loading, setLoading] = useState(false)
  const [showFilters, setShowFilters] = useState(false)
  const [showMobileList, setShowMobileList] = useState(true)
  const [selectedService, setSelectedService] = useState(null)
  const [userLocation, setUserLocation] = useState(null)
  const [showDirections, setShowDirections] = useState(false)
  const [filters, setFilters] = useState({
    category: '',
    location: '',
    minPrice: 0,
    maxPrice: 200000,
    minRating: 0,
    radius: 25,
    sortBy: 'relevance',
    activeOnly: true,
  })

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => setUserLocation({ lat: pos.coords.latitude, lng: pos.coords.longitude }),
        () => setUserLocation({ lat: -18.9137, lng: 47.5361 })
      )
    }
  }, [])

  const results = useMemo(() => {
    let list = searchServices(query, filters.category, filters.location, userLocation?.lat, userLocation?.lng, filters.radius)
    list = list.filter((s) => s.price >= filters.minPrice && s.price <= filters.maxPrice)
    if (filters.minRating > 0) list = list.filter((s) => s.rating >= filters.minRating)
    if (filters.activeOnly) list = list.filter((s) => s.status === 'active')

    if (userLocation) {
      list = list.map((s) => ({
        ...s,
        distance: calculateDistance(userLocation.lat, userLocation.lng, s.lat, s.lng),
      }))
    }

    switch (filters.sortBy) {
      case 'distance':
        list.sort((a, b) => (a.distance || 999) - (b.distance || 999))
        break
      case 'price':
        list.sort((a, b) => a.price - b.price)
        break
      case 'rating':
        list.sort((a, b) => b.rating - a.rating)
        break
      default:
        break
    }
    return list
  }, [query, filters, userLocation])

  const handleSearch = (e) => {
    e.preventDefault()
    setLoading(true)
    setSearchParams({ q: query })
    setTimeout(() => setLoading(false), 400)
  }

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }))
  }

  return (
    <div className="min-h-[calc(100dvh-96px)] flex flex-col lg:flex-row">
      {/* Liste - 60% desktop gauche */}
      <div className={`${
        showMobileList ? 'flex' : 'hidden'
      } lg:flex flex-col w-full lg:w-[60%] h-full overflow-hidden border-r border-zinc-200`}>
        <div className="p-4 border-b border-zinc-200 bg-white shrink-0">
          <form onSubmit={handleSearch} className="flex gap-2">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Rechercher un service..."
              className="flex-1 rounded-full border border-zinc-200 px-4 py-2.5 outline-none focus:border-yellow-400"
            />
            <button type="submit" className="rounded-full bg-yellow-400 px-5 py-2.5 text-sm font-semibold text-white hover:bg-yellow-500 transition">
              Rechercher
            </button>
          </form>

          <div className="mt-3 flex flex-wrap items-center gap-2">
            <button onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-1 rounded-full border border-zinc-200 px-3 py-1.5 text-xs hover:border-yellow-400 transition">
              <FiFilter className="h-3 w-3" /> Filtres
            </button>
            <select value={filters.sortBy} onChange={(e) => handleFilterChange('sortBy', e.target.value)}
              className="rounded-full border border-zinc-200 px-3 py-1.5 text-xs outline-none focus:border-yellow-400">
              <option value="relevance">Pertinence</option>
              <option value="distance">Distance</option>
              <option value="price">Prix</option>
              <option value="rating">Note</option>
            </select>
            <span className="text-xs text-zinc-500">{results.length} resultat(s)</span>
            <button onClick={() => setShowMobileList(false)} className="lg:hidden ml-auto text-xs text-yellow-500">
              Voir carte
            </button>
          </div>

          {showFilters && (
            <div className="mt-3 rounded-xl border border-zinc-200 bg-zinc-50 p-4 space-y-3 animate-fade-in-up">
              <div className="flex justify-between">
                <span className="text-sm font-semibold">Filtres avances</span>
                <button onClick={() => setShowFilters(false)}><FiX /></button>
              </div>
              <select value={filters.category} onChange={(e) => handleFilterChange('category', e.target.value)}
                className="w-full rounded-full border border-zinc-200 px-3 py-2 text-sm">
                {mockCategories.map((cat) => (
                  <option key={cat} value={cat.includes('Toutes') ? '' : cat}>{cat}</option>
                ))}
              </select>
              <div>
                <label className="text-xs text-zinc-500">Rayon : {filters.radius} km</label>
                <input type="range" min="1" max="50" value={filters.radius}
                  onChange={(e) => handleFilterChange('radius', Number(e.target.value))} className="w-full accent-yellow-400" />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <input type="number" placeholder="Prix min" value={filters.minPrice}
                  onChange={(e) => handleFilterChange('minPrice', Number(e.target.value))}
                  className="rounded-full border border-zinc-200 px-3 py-2 text-sm" />
                <input type="number" placeholder="Prix max" value={filters.maxPrice}
                  onChange={(e) => handleFilterChange('maxPrice', Number(e.target.value))}
                  className="rounded-full border border-zinc-200 px-3 py-2 text-sm" />
              </div>
              <select value={filters.minRating} onChange={(e) => handleFilterChange('minRating', Number(e.target.value))}
                className="w-full rounded-full border border-zinc-200 px-3 py-2 text-sm">
                <option value={0}>Note minimum</option>
                <option value={4}>4+ etoiles</option>
                <option value={3}>3+ etoiles</option>
                <option value={2}>2+ etoiles</option>
              </select>
              <label className="flex items-center gap-2 text-sm">
                <input type="checkbox" checked={filters.activeOnly}
                  onChange={(e) => handleFilterChange('activeOnly', e.target.checked)} className="accent-yellow-400" />
                Services actifs uniquement
              </label>
            </div>
          )}
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {loading ? (
            <div className="flex justify-center py-20">
              <div className="h-8 w-8 animate-spin rounded-full border-4 border-yellow-400/20 border-t-yellow-400" />
            </div>
          ) : results.length === 0 ? (
            <div className="text-center py-20">
              <p className="font-semibold text-black">Aucun resultat</p>
              <p className="text-sm text-zinc-500 mt-2">Modifiez vos criteres de recherche</p>
            </div>
          ) : (
            results.map((service) => (
              <div
                key={service.id}
                onClick={() => setSelectedService(service)}
                className={`cursor-pointer ${selectedService?.id === service.id ? 'ring-2 ring-yellow-400 rounded-[2rem]' : ''}`}
              >
                <ServiceCard service={service} compact />
              </div>
            ))
          )}
        </div>
      </div>

      {/* Carte - 40% desktop droite */}
      <div className={`${showMobileList ? 'hidden' : 'block'} lg:block flex-1 h-full relative`}>
        <GoogleMap
          services={results}
          center={selectedService ? { lat: selectedService.lat, lng: selectedService.lng } : userLocation}
          zoom={selectedService ? 15 : 13}
          selectedService={selectedService}
          userLocation={userLocation}
          radius={filters.radius}
          showDirections={showDirections}
          onMarkerClick={setSelectedService}
        />

        <button
          onClick={() => setShowMobileList(true)}
          className="absolute bottom-4 left-4 z-10 flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-semibold shadow-lg lg:hidden"
        >
          <FiList /> Liste ({results.length})
        </button>

        {selectedService && userLocation && (
          <button
            onClick={() => setShowDirections(!showDirections)}
            className="absolute bottom-4 right-4 z-10 flex items-center gap-2 rounded-full bg-yellow-400 px-4 py-2 text-sm font-semibold text-white shadow-lg"
          >
            <FiMapPin /> Itineraire
          </button>
        )}
      </div>
    </div>
  )
}

export default SearchResults
