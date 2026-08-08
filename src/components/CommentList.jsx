import { useState } from 'react'
import RatingStars from './RatingStars'
import { FiFlag, FiTrash2, FiMessageCircle } from 'react-icons/fi'
import { useAuth } from '../contexts/AuthContext'

function formatRelativeDate(dateStr) {
  const diff = Date.now() - new Date(dateStr).getTime()
  const days = Math.floor(diff / 86400000)
  if (days === 0) return "Aujourd'hui"
  if (days === 1) return 'Hier'
  if (days < 30) return `Il y a ${days} jours`
  return dateStr
}

function CommentList({
  reviews = [],
  canReply = false,
  onReply,
  onDelete,
  onReport,
  showModeration = false,
}) {
  const { user } = useAuth()
  const [sortBy, setSortBy] = useState('date')
  const [filterRating, setFilterRating] = useState(0)
  const [page, setPage] = useState(1)
  const [replyModal, setReplyModal] = useState(null)
  const [replyText, setReplyText] = useState('')
  const perPage = 10

  let filtered = [...reviews]
  if (filterRating > 0) filtered = filtered.filter((r) => Math.floor(r.rating) === filterRating)
  filtered.sort((a, b) => {
    if (sortBy === 'rating') return b.rating - a.rating
    return new Date(b.date) - new Date(a.date)
  })

  const totalPages = Math.ceil(filtered.length / perPage)
  const paginated = filtered.slice((page - 1) * perPage, page * perPage)

  const handleReplySubmit = () => {
    if (replyModal && replyText.trim()) {
      onReply && onReply(replyModal.id, replyText)
      setReplyModal(null)
      setReplyText('')
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-4">
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="rounded-full border border-zinc-200 px-4 py-2 text-sm outline-none focus:border-yellow-400"
        >
          <option value="date">Trier par date</option>
          <option value="rating">Trier par note</option>
        </select>
        <select
          value={filterRating}
          onChange={(e) => { setFilterRating(Number(e.target.value)); setPage(1) }}
          className="rounded-full border border-zinc-200 px-4 py-2 text-sm outline-none focus:border-yellow-400"
        >
          <option value={0}>Toutes les notes</option>
          {[5, 4, 3, 2, 1].map((n) => (
            <option key={n} value={n}>{n} etoile(s)</option>
          ))}
        </select>
      </div>

      {paginated.length === 0 ? (
        <p className="text-center text-zinc-500 py-8">Aucun avis</p>
      ) : (
        paginated.map((review) => (
          <article
            key={review.id}
            className="rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm animate-fade-in-up"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-3">
                <span className="grid h-10 w-10 place-items-center rounded-full bg-yellow-400 text-sm font-bold text-white">
                  {review.user?.charAt(0) || 'U'}
                </span>
                <div>
                  <p className="font-semibold text-black">{review.user}</p>
                  <p className="text-xs text-zinc-400">{formatRelativeDate(review.date)}</p>
                </div>
              </div>
              <RatingStars rating={review.rating} size="small" />
            </div>
            <p className="mt-3 text-sm text-zinc-600">{review.comment}</p>
            {review.reply && (
              <div className="mt-3 rounded-xl bg-yellow-50 p-3 text-sm text-zinc-600 border-l-4 border-yellow-400">
                <p className="font-medium text-black text-xs mb-1">Reponse du prestataire</p>
                {review.reply}
              </div>
            )}
            {review.reported && showModeration && (
              <span className="mt-2 inline-block rounded-full bg-red-50 px-2 py-0.5 text-xs text-red-500">Signale</span>
            )}
            <div className="mt-3 flex flex-wrap gap-2">
              {canReply && !review.reply && (
                <button
                  onClick={() => setReplyModal(review)}
                  className="flex items-center gap-1 rounded-full border border-zinc-200 px-3 py-1 text-xs hover:border-yellow-400 transition"
                >
                  <FiMessageCircle className="h-3 w-3" /> Repondre
                </button>
              )}
              <button
                onClick={() => onReport && onReport(review.id)}
                className="flex items-center gap-1 rounded-full border border-zinc-200 px-3 py-1 text-xs hover:border-red-300 hover:text-red-500 transition"
              >
                <FiFlag className="h-3 w-3" /> Signaler
              </button>
              {(user?.role === 'admin' || review.userId === user?.id) && (
                <button
                  onClick={() => onDelete && onDelete(review.id)}
                  className="flex items-center gap-1 rounded-full border border-red-200 px-3 py-1 text-xs text-red-500 hover:bg-red-50 transition"
                >
                  <FiTrash2 className="h-3 w-3" /> Supprimer
                </button>
              )}
            </div>
          </article>
        ))
      )}

      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2">
          <button
            disabled={page <= 1}
            onClick={() => setPage(page - 1)}
            className="rounded-full border border-zinc-200 px-4 py-2 text-sm disabled:opacity-50"
          >
            Precedent
          </button>
          <span className="text-sm text-zinc-500">{page} / {totalPages}</span>
          <button
            disabled={page >= totalPages}
            onClick={() => setPage(page + 1)}
            className="rounded-full border border-zinc-200 px-4 py-2 text-sm disabled:opacity-50"
          >
            Suivant
          </button>
        </div>
      )}

      {replyModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl animate-zoom-in">
            <h3 className="font-bold text-black">Repondre a l'avis</h3>
            <textarea
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
              rows={4}
              className="mt-4 w-full rounded-2xl border border-zinc-200 p-3 outline-none focus:border-yellow-400"
              placeholder="Votre reponse..."
            />
            <div className="mt-4 flex gap-2 justify-end">
              <button onClick={() => setReplyModal(null)} className="rounded-full border border-zinc-200 px-4 py-2 text-sm">Annuler</button>
              <button onClick={handleReplySubmit} className="rounded-full bg-yellow-400 px-4 py-2 text-sm font-semibold text-white">Envoyer</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default CommentList
