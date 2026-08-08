import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { getServicesByPrestataire, mockCategories } from '../data/mockData'
import ServiceForm from '../components/ServiceForm'
import { FiPlus, FiSearch, FiEdit, FiTrash2, FiEye, FiMapPin, FiCopy } from 'react-icons/fi'

function MyServices() {
  const { user } = useAuth()
  const [showForm, setShowForm] = useState(false)
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('')
  const [statusFilter, setStatusFilter] = useState('')
  const [page, setPage] = useState(1)
  const perPage = 6

  const services = getServicesByPrestataire(user?.id)

  const filtered = useMemo(() => {
    return services.filter((s) => {
      if (search && !s.title.toLowerCase().includes(search.toLowerCase())) return false
      if (category && s.category !== category) return false
      if (statusFilter && s.status !== statusFilter) return false
      return true
    })
  }, [services, search, category, statusFilter])

  const paginated = filtered.slice((page - 1) * perPage, page * perPage)
  const totalPages = Math.ceil(filtered.length / perPage)

  const stats = {
    active: services.filter((s) => s.status === 'active').length,
    inactive: services.filter((s) => s.status !== 'active').length,
    views: services.reduce((sum, s) => sum + (s.views || 0), 0),
  }

  const handleSubmit = () => {
    setShowForm(false)
  }

  if (user?.role !== 'prestataire' && user?.role !== 'admin') {
    return (
      <div className="flex min-h-[50vh] items-center justify-center px-5">
        <p className="text-zinc-500">Cette page est reservee aux prestataires.</p>
      </div>
    )
  }

  return (
    <div className="px-5 py-20 pt-28 sm:px-8 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl font-bold text-black">Mes services</h1>
            <p className="text-sm text-zinc-500">{services.length} service(s)</p>
          </div>
          <button
            onClick={() => setShowForm(!showForm)}
            className="flex items-center gap-2 rounded-full bg-yellow-400 px-5 py-2.5 text-sm font-semibold text-white hover:bg-yellow-500 transition"
          >
            <FiPlus /> {showForm ? 'Annuler' : 'Ajouter un service'}
          </button>
        </div>

        {showForm && (
          <div className="mb-8 rounded-[2rem] border border-zinc-200 bg-white p-8 shadow-sm">
            <h2 className="font-bold text-black mb-6">Nouveau service</h2>
            <ServiceForm onSubmit={handleSubmit} />
          </div>
        )}

        <div className="grid gap-4 sm:grid-cols-3 mb-8">
          <div className="rounded-[1.5rem] border border-zinc-200 bg-white p-4 text-center">
            <p className="text-2xl font-bold text-green-500">{stats.active}</p>
            <p className="text-sm text-zinc-500">Actifs</p>
          </div>
          <div className="rounded-[1.5rem] border border-zinc-200 bg-white p-4 text-center">
            <p className="text-2xl font-bold text-zinc-400">{stats.inactive}</p>
            <p className="text-sm text-zinc-500">Inactifs</p>
          </div>
          <div className="rounded-[1.5rem] border border-zinc-200 bg-white p-4 text-center">
            <p className="text-2xl font-bold text-yellow-400">{stats.views}</p>
            <p className="text-sm text-zinc-500">Vues totales</p>
          </div>
        </div>

        <div className="flex flex-wrap gap-3 mb-6">
          <div className="relative flex-1 min-w-[200px]">
            <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400" />
            <input type="text" placeholder="Rechercher..." value={search} onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-full border border-zinc-200 pl-12 pr-4 py-2.5 outline-none focus:border-yellow-400" />
          </div>
          <select value={category} onChange={(e) => setCategory(e.target.value)}
            className="rounded-full border border-zinc-200 px-4 py-2.5 text-sm outline-none focus:border-yellow-400">
            <option value="">Toutes categories</option>
            {mockCategories.filter((c) => !c.includes('Toutes')).map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
          <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}
            className="rounded-full border border-zinc-200 px-4 py-2.5 text-sm outline-none focus:border-yellow-400">
            <option value="">Tous statuts</option>
            <option value="active">Actif</option>
            <option value="inactive">Inactif</option>
          </select>
        </div>

        <div className="space-y-4">
          {paginated.map((service) => (
            <div key={service.id} className="flex flex-col sm:flex-row sm:items-center gap-4 rounded-[1.5rem] border border-zinc-200 bg-white p-6 shadow-sm hover:shadow-lg transition">
              <img src={service.image} alt={service.title} className="h-20 w-20 rounded-xl object-cover" />
              <div className="flex-1">
                <h3 className="font-semibold text-black">{service.title}</h3>
                <p className="text-sm text-zinc-500">{service.category} - {service.price?.toLocaleString()} Ar</p>
                <div className="mt-1 flex flex-wrap gap-3 text-xs text-zinc-400">
                  <span>{service.views} vues</span>
                  <span>{service.rating}/5 ({service.reviews} avis)</span>
                  <span className={`rounded-full px-2 py-0.5 ${service.status === 'active' ? 'bg-green-50 text-green-600' : 'bg-zinc-100'}`}>
                    {service.status}
                  </span>
                </div>
              </div>
              <div className="flex flex-wrap gap-1">
                <button className="grid h-9 w-9 place-items-center rounded-full border border-zinc-200 hover:border-yellow-400 transition" aria-label="Modifier"><FiEdit className="h-4 w-4" /></button>
                <Link to={`/service/${service.id}`} className="grid h-9 w-9 place-items-center rounded-full border border-zinc-200 hover:border-yellow-400 transition" aria-label="Voir"><FiEye className="h-4 w-4" /></Link>
                <Link to="/map" className="grid h-9 w-9 place-items-center rounded-full border border-zinc-200 hover:border-yellow-400 transition" aria-label="Carte"><FiMapPin className="h-4 w-4" /></Link>
                <button className="grid h-9 w-9 place-items-center rounded-full border border-zinc-200 hover:border-yellow-400 transition" aria-label="Dupliquer"><FiCopy className="h-4 w-4" /></button>
                <button className="grid h-9 w-9 place-items-center rounded-full border border-red-200 text-red-500 hover:bg-red-50 transition" aria-label="Supprimer"><FiTrash2 className="h-4 w-4" /></button>
              </div>
            </div>
          ))}
        </div>

        {totalPages > 1 && (
          <div className="mt-6 flex justify-center gap-2">
            <button disabled={page <= 1} onClick={() => setPage(page - 1)} className="rounded-full border px-4 py-2 text-sm disabled:opacity-50">Precedent</button>
            <span className="text-sm text-zinc-500 py-2">{page}/{totalPages}</span>
            <button disabled={page >= totalPages} onClick={() => setPage(page + 1)} className="rounded-full border px-4 py-2 text-sm disabled:opacity-50">Suivant</button>
          </div>
        )}
      </div>
    </div>
  )
}

export default MyServices
