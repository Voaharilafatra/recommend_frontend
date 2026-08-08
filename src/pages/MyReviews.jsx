import { useState, useMemo } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { getReviewsByUser, getReviewsForPrestataire, mockServices } from '../data/mockData'
import CommentList from '../components/CommentList'
import RatingStars from '../components/RatingStars'
import { FiDownload, FiStar } from 'react-icons/fi'

function MyReviews() {
  const { user } = useAuth()
  const [filterRating, setFilterRating] = useState(0)
  const [filterService, setFilterService] = useState('')
  const [sortBy, setSortBy] = useState('date')

  const isPrestataire = user?.role === 'prestataire'
  const reviews = isPrestataire
    ? getReviewsForPrestataire(user.id)
    : getReviewsByUser(user?.name)

  const avgRating = reviews.length
    ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
    : '0'

  const filtered = useMemo(() => {
    let list = [...reviews]
    if (filterRating > 0) list = list.filter((r) => Math.floor(r.rating) === filterRating)
    if (filterService) list = list.filter((r) => r.serviceId === Number(filterService))
    if (sortBy === 'rating') list.sort((a, b) => b.rating - a.rating)
    else list.sort((a, b) => new Date(b.date) - new Date(a.date))
    return list
  }, [reviews, filterRating, filterService, sortBy])

  const prestataireServices = isPrestataire ? mockServices.filter((s) => s.prestataireId === user.id) : []

  const exportCSV = () => {
    const header = 'Utilisateur,Note,Commentaire,Date\n'
    const rows = reviews.map((r) => `"${r.user}",${r.rating},"${r.comment}","${r.date}"`).join('\n')
    const blob = new Blob([header + rows], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'mes-avis.csv'
    a.click()
  }

  return (
    <div className="px-5 py-20 pt-28 sm:px-8 lg:px-10">
      <div className="mx-auto max-w-3xl">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl font-bold text-black">
              {isPrestataire ? 'Avis recus' : 'Mes avis'}
            </h1>
            <p className="text-sm text-zinc-500">{reviews.length} avis</p>
          </div>
          <button onClick={exportCSV} className="flex items-center gap-2 rounded-full border border-zinc-200 px-4 py-2 text-sm hover:border-yellow-400 transition">
            <FiDownload /> Exporter
          </button>
        </div>

        <div className="rounded-[1.5rem] border border-zinc-200 bg-white p-6 shadow-sm mb-8 flex items-center gap-4">
          <FiStar className="h-8 w-8 text-yellow-400" />
          <div>
            <p className="text-sm text-zinc-500">Note moyenne</p>
            <div className="flex items-center gap-2">
              <span className="text-2xl font-bold text-black">{avgRating}</span>
              <RatingStars rating={Number(avgRating)} size="small" />
            </div>
          </div>
        </div>

        <div className="flex flex-wrap gap-3 mb-6">
          <select value={filterRating} onChange={(e) => setFilterRating(Number(e.target.value))}
            className="rounded-full border border-zinc-200 px-4 py-2 text-sm outline-none focus:border-yellow-400">
            <option value={0}>Toutes les notes</option>
            {[5, 4, 3, 2, 1].map((n) => (
              <option key={n} value={n}>{n} etoile(s)</option>
            ))}
          </select>
          {isPrestataire && (
            <select value={filterService} onChange={(e) => setFilterService(e.target.value)}
              className="rounded-full border border-zinc-200 px-4 py-2 text-sm outline-none focus:border-yellow-400">
              <option value="">Tous les services</option>
              {prestataireServices.map((s) => (
                <option key={s.id} value={s.id}>{s.title}</option>
              ))}
            </select>
          )}
          <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}
            className="rounded-full border border-zinc-200 px-4 py-2 text-sm outline-none focus:border-yellow-400">
            <option value="date">Trier par date</option>
            <option value="rating">Trier par note</option>
          </select>
        </div>

        <CommentList
          reviews={filtered}
          canReply={isPrestataire}
          showModeration={user?.role === 'admin'}
        />
      </div>
    </div>
  )
}

export default MyReviews
