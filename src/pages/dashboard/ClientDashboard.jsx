import { useState, useEffect, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { FiEye, FiStar, FiHeart, FiSearch, FiMapPin, FiTrendingUp } from 'react-icons/fi'
import GoogleMap from '../../components/maps/GoogleMap'
import ServiceCard from '../../components/ServiceCard'
import { mockServices, getServicesNearby, getFavoriteServices } from '../../data/mockData'

function SimpleBarChart({ data, labelKey, valueKey, color = '#fbbf24' }) {
  const max = Math.max(...data.map((d) => d[valueKey]), 1)
  return (
    <div className="space-y-2">
      {data.map((item) => (
        <div key={item[labelKey]} className="flex items-center gap-2">
          <span className="w-24 truncate text-xs text-zinc-500">{item[labelKey]}</span>
          <div className="flex-1 h-4 rounded-full bg-zinc-100 overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-500"
              style={{ width: `${(item[valueKey] / max) * 100}%`, backgroundColor: color }}
            />
          </div>
          <span className="text-xs font-medium text-zinc-600 w-8">{item[valueKey]}</span>
        </div>
      ))}
    </div>
  )
}

function ClientDashboard({ user, onUpdate }) {
  const [radius, setRadius] = useState(5)
  const [selectedCategory, setSelectedCategory] = useState('')
  const [now, setNow] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 60000)
    return () => clearInterval(timer)
  }, [])

  const nearbyServices = useMemo(
    () => getServicesNearby(user.lat, user.lng, radius),
    [user.lat, user.lng, radius]
  )

  const favorites = getFavoriteServices(user.favorites || [])
  const recommended = mockServices.filter((s) => s.rating >= 4.5).slice(0, 6)

  const categoryStats = useMemo(() => {
    const counts = {}
    mockServices.forEach((s) => {
      counts[s.category] = (counts[s.category] || 0) + 1
    })
    return Object.entries(counts).map(([category, count]) => ({ category, count }))
  }, [])

  const searchTrend = [
    { week: 'S1', count: 3 },
    { week: 'S2', count: 5 },
    { week: 'S3', count: 7 },
    { week: 'S4', count: 4 },
  ]

  const stats = [
    { icon: FiEye, label: 'Services consultes', value: 24, color: 'text-blue-500' },
    { icon: FiStar, label: 'Notes donnees', value: 3, color: 'text-yellow-400' },
    { icon: FiHeart, label: 'Favoris', value: favorites.length, color: 'text-red-500' },
    { icon: FiTrendingUp, label: 'Recommandes', value: recommended.length, color: 'text-green-500' },
  ]

  const filteredRecommended = selectedCategory
    ? recommended.filter((s) => s.category === selectedCategory)
    : recommended

  return (
    <div className="space-y-8 animate-fade-in-up">
      <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-4">
          <span className="grid h-16 w-16 place-items-center rounded-full bg-yellow-400 text-2xl font-bold text-white">
            {user.avatar}
          </span>
          <div>
            <h1 className="text-2xl font-bold text-black">Bienvenue, {user.name}</h1>
            <p className="text-sm text-zinc-500">
              {now.toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long' })} - {now.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}
            </p>
          </div>
        </div>
      </header>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <div key={stat.label} className="rounded-[1.5rem] border border-zinc-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
            <stat.icon className={`h-6 w-6 ${stat.color}`} />
            <p className="mt-3 text-2xl font-bold text-black">{stat.value}</p>
            <p className="text-sm text-zinc-500">{stat.label}</p>
          </div>
        ))}
      </div>

      <div className="flex flex-wrap gap-3">
        <Link to="/search" className="flex items-center gap-2 rounded-full bg-yellow-400 px-5 py-2.5 text-sm font-semibold text-white hover:bg-yellow-500 transition">
          <FiSearch /> Rechercher un service
        </Link>
        <Link to="/favorites" className="flex items-center gap-2 rounded-full border border-zinc-200 px-5 py-2.5 text-sm font-semibold hover:border-yellow-400 transition">
          <FiHeart /> Voir mes favoris
        </Link>
        <Link to="/map" className="flex items-center gap-2 rounded-full border border-zinc-200 px-5 py-2.5 text-sm font-semibold hover:border-yellow-400 transition">
          <FiMapPin /> Services a proximite
        </Link>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-[1.5rem] border border-zinc-200 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-bold text-black">Services a proximite</h2>
            <div className="flex gap-1">
              {[2, 5, 10].map((r) => (
                <button
                  key={r}
                  onClick={() => setRadius(r)}
                  className={`rounded-full px-3 py-1 text-xs font-medium transition ${
                    radius === r ? 'bg-yellow-400 text-white' : 'bg-zinc-100 text-zinc-600 hover:bg-yellow-50'
                  }`}
                >
                  {r} km
                </button>
              ))}
            </div>
          </div>
          <div className="h-64 rounded-xl overflow-hidden">
            <GoogleMap services={nearbyServices} userLocation={{ lat: user.lat, lng: user.lng }} radius={radius} zoom={13} />
          </div>
        </div>

        <div className="rounded-[1.5rem] border border-zinc-200 bg-white p-6 shadow-sm">
          <h2 className="font-bold text-black mb-4">Categories consultees</h2>
          <SimpleBarChart data={categoryStats} labelKey="category" valueKey="count" />
        </div>
      </div>

      <div className="rounded-[1.5rem] border border-zinc-200 bg-white p-6 shadow-sm">
        <h2 className="font-bold text-black mb-4">Evolution des recherches</h2>
        <SimpleBarChart data={searchTrend} labelKey="week" valueKey="count" />
      </div>

      <div>
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <h2 className="text-xl font-bold text-black">Recommandations</h2>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="rounded-full border border-zinc-200 px-4 py-2 text-sm outline-none focus:border-yellow-400"
          >
            <option value="">Toutes categories</option>
            {[...new Set(mockServices.map((s) => s.category))].map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredRecommended.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>
      </div>

      <div className="rounded-[1.5rem] border border-zinc-200 bg-white p-6 shadow-sm">
        <h2 className="font-bold text-black mb-4">Activites recentes</h2>
        <div className="space-y-3">
          {[
            { action: 'Consultation', target: 'Plomberie Express', date: '2026-07-12' },
            { action: 'Ajout favori', target: 'Cuisine Gourmande', date: '2026-07-11' },
            { action: 'Avis laisse', target: 'Clinique Sante Plus', date: '2026-07-10' },
          ].map((activity, i) => (
            <div key={i} className="flex items-center justify-between border-b border-zinc-100 pb-3 last:border-0">
              <div>
                <p className="text-sm font-medium text-black">{activity.action}</p>
                <p className="text-xs text-zinc-500">{activity.target}</p>
              </div>
              <span className="text-xs text-zinc-400">{activity.date}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default ClientDashboard
