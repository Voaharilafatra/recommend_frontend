import { useState, useMemo } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { getFavoriteServices, mockCategories } from '../data/mockData'
import ServiceCard from '../components/ServiceCard'
import { FiHeart, FiShare2, FiTrash2, FiSearch } from 'react-icons/fi'

function Favorites() {
  const { user, toggleFavorite, updateUser } = useAuth()
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('')
  const [sortBy, setSortBy] = useState('date')

  const favorites = getFavoriteServices(user?.favorites || [])

  const filtered = useMemo(() => {
    let list = [...favorites]
    if (search) {
      const q = search.toLowerCase()
      list = list.filter((s) => s.title.toLowerCase().includes(q) || s.category.toLowerCase().includes(q))
    }
    if (category) list = list.filter((s) => s.category === category)
    if (sortBy === 'rating') list.sort((a, b) => b.rating - a.rating)
    else if (sortBy === 'price') list.sort((a, b) => a.price - b.price)
    return list
  }, [favorites, search, category, sortBy])

  const clearAll = () => {
    updateUser({ favorites: [] })
  }

  const handleShare = () => {
    const text = `Mes favoris TADIAVO-EO: ${favorites.map((s) => s.title).join(', ')}`
    navigator.clipboard.writeText(text)
  }

  return (
    <div className="px-5 py-20 pt-28 sm:px-8 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl font-bold text-black flex items-center gap-2">
              <FiHeart className="text-red-500" /> Mes favoris
            </h1>
            <p className="text-sm text-zinc-500">{favorites.length} service(s) sauvegarde(s)</p>
          </div>
          <div className="flex gap-2">
            <button onClick={handleShare} className="flex items-center gap-2 rounded-full border border-zinc-200 px-4 py-2 text-sm hover:border-yellow-400 transition">
              <FiShare2 /> Partager
            </button>
            {favorites.length > 0 && (
              <button onClick={clearAll} className="flex items-center gap-2 rounded-full border border-red-200 px-4 py-2 text-sm text-red-500 hover:bg-red-50 transition">
                <FiTrash2 /> Vider
              </button>
            )}
          </div>
        </div>

        {favorites.length > 0 && (
          <div className="flex flex-wrap gap-3 mb-6">
            <div className="relative flex-1 min-w-[200px]">
              <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400" />
              <input
                type="text"
                placeholder="Rechercher dans les favoris..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full rounded-full border border-zinc-200 pl-12 pr-4 py-2.5 outline-none focus:border-yellow-400"
              />
            </div>
            <select value={category} onChange={(e) => setCategory(e.target.value)}
              className="rounded-full border border-zinc-200 px-4 py-2.5 text-sm outline-none focus:border-yellow-400">
              <option value="">Toutes categories</option>
              {mockCategories.filter((c) => !c.includes('Toutes')).map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
            <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}
              className="rounded-full border border-zinc-200 px-4 py-2.5 text-sm outline-none focus:border-yellow-400">
              <option value="date">Date d'ajout</option>
              <option value="rating">Note</option>
              <option value="price">Prix</option>
            </select>
          </div>
        )}

        {filtered.length === 0 ? (
          <div className="text-center py-20">
            <FiHeart className="mx-auto h-16 w-16 text-zinc-300" />
            <p className="mt-4 text-xl font-semibold text-black">Aucun favori</p>
            <p className="mt-2 text-zinc-500">Ajoutez des services a vos favoris depuis la recherche ou la carte</p>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filtered.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default Favorites
