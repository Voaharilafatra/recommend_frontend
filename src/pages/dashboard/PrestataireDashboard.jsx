import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { FiPackage, FiStar, FiMessageCircle, FiUsers, FiPlus, FiDownload, FiEdit, FiTrash2, FiEye, FiToggleLeft, FiToggleRight } from 'react-icons/fi'
import GoogleMap from '../../components/maps/GoogleMap'
import CommentList from '../../components/CommentList'
import { getServicesByPrestataire, getReviewsForPrestataire } from '../../data/mockData'

function PrestataireDashboard({ user }) {
  const [online, setOnline] = useState(true)
  const [replyReviews, setReplyReviews] = useState([])
  const [sortReviews, setSortReviews] = useState('date')

  const services = getServicesByPrestataire(user.id)
  const reviews = getReviewsForPrestataire(user.id)
  const displayReviews = replyReviews.length ? replyReviews : reviews

  const avgRating = services.length
    ? (services.reduce((sum, s) => sum + s.rating, 0) / services.length).toFixed(1)
    : '0'

  const stats = [
    { icon: FiPackage, label: 'Services', value: services.length },
    { icon: FiStar, label: 'Note moyenne', value: `${avgRating}/5` },
    { icon: FiMessageCircle, label: 'Avis recus', value: reviews.length },
    { icon: FiUsers, label: 'Clients', value: 28 },
  ]

  const viewsData = [
    { day: 'Lun', views: 12 },
    { day: 'Mar', views: 18 },
    { day: 'Mer', views: 25 },
    { day: 'Jeu', views: 15 },
    { day: 'Ven', views: 22 },
    { day: 'Sam', views: 30 },
    { day: 'Dim', views: 8 },
  ]

  const handleReply = (reviewId, text) => {
    setReplyReviews((prev) =>
      (prev.length ? prev : reviews).map((r) =>
        r.id === reviewId ? { ...r, reply: text } : r
      )
    )
  }

  const exportCSV = () => {
    const header = 'Utilisateur,Note,Commentaire,Date\n'
    const rows = reviews.map((r) => `"${r.user}",${r.rating},"${r.comment}","${r.date}"`).join('\n')
    const blob = new Blob([header + rows], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'avis.csv'
    a.click()
  }

  const sortedReviews = useMemo(() => {
    const list = [...displayReviews]
    if (sortReviews === 'rating') return list.sort((a, b) => b.rating - a.rating)
    return list.sort((a, b) => new Date(b.date) - new Date(a.date))
  }, [displayReviews, sortReviews])

  return (
    <div className="space-y-8 animate-fade-in-up">
      <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-4">
          <span className="grid h-16 w-16 place-items-center rounded-full bg-yellow-400 text-2xl font-bold text-white">
            {user.avatar}
          </span>
          <div>
            <h1 className="text-2xl font-bold text-black">Bienvenue, {user.name}</h1>
            <button
              onClick={() => setOnline(!online)}
              className={`mt-1 flex items-center gap-2 rounded-full px-3 py-1 text-xs font-medium ${
                online ? 'bg-green-50 text-green-600' : 'bg-zinc-100 text-zinc-500'
              }`}
            >
              <span className={`h-2 w-2 rounded-full ${online ? 'bg-green-500' : 'bg-zinc-400'}`} />
              {online ? 'En ligne' : 'Hors ligne'}
            </button>
          </div>
        </div>
      </header>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <div key={stat.label} className="rounded-[1.5rem] border border-zinc-200 bg-white p-6 shadow-sm hover:-translate-y-1 hover:shadow-lg transition-all duration-300">
            <stat.icon className="h-6 w-6 text-yellow-400" />
            <p className="mt-3 text-2xl font-bold text-black">{stat.value}</p>
            <p className="text-sm text-zinc-500">{stat.label}</p>
          </div>
        ))}
      </div>

      <div className="flex flex-wrap gap-3">
        <Link to="/my-services" className="flex items-center gap-2 rounded-full bg-yellow-400 px-5 py-2.5 text-sm font-semibold text-white hover:bg-yellow-500 transition">
          <FiPlus /> Publier un service
        </Link>
        <button onClick={exportCSV} className="flex items-center gap-2 rounded-full border border-zinc-200 px-5 py-2.5 text-sm font-semibold hover:border-yellow-400 transition">
          <FiDownload /> Exporter les avis
        </button>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-[1.5rem] border border-zinc-200 bg-white p-6 shadow-sm">
          <h2 className="font-bold text-black mb-4">Vues par jour</h2>
          <div className="flex items-end gap-2 h-32">
            {viewsData.map((d) => (
              <div key={d.day} className="flex-1 flex flex-col items-center gap-1">
                <div
                  className="w-full rounded-t-lg bg-yellow-400 transition-all duration-500"
                  style={{ height: `${(d.views / 30) * 100}%` }}
                />
                <span className="text-[10px] text-zinc-500">{d.day}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-[1.5rem] border border-zinc-200 bg-white p-6 shadow-sm">
          <h2 className="font-bold text-black mb-4">Performance</h2>
          <div className="space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-zinc-500">Taux de reponse</span>
              <span className="font-semibold text-black">85%</span>
            </div>
            <div className="h-2 rounded-full bg-zinc-100"><div className="h-full w-[85%] rounded-full bg-yellow-400" /></div>
            <div className="flex justify-between text-sm">
              <span className="text-zinc-500">Satisfaction client</span>
              <span className="font-semibold text-black">92%</span>
            </div>
            <div className="h-2 rounded-full bg-zinc-100"><div className="h-full w-[92%] rounded-full bg-green-500" /></div>
          </div>
        </div>
      </div>

      <div className="rounded-[1.5rem] border border-zinc-200 bg-white p-6 shadow-sm">
        <h2 className="font-bold text-black mb-4">Localisation des services</h2>
        <div className="h-64 rounded-xl overflow-hidden">
          <GoogleMap services={services} center={{ lat: user.lat, lng: user.lng }} zoom={13} />
        </div>
      </div>

      <div className="rounded-[1.5rem] border border-zinc-200 bg-white p-6 shadow-sm">
        <h2 className="font-bold text-black mb-4">Mes services</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-zinc-200 text-left text-zinc-500">
                <th className="pb-3 pr-4">Titre</th>
                <th className="pb-3 pr-4">Statut</th>
                <th className="pb-3 pr-4">Vues</th>
                <th className="pb-3 pr-4">Note</th>
                <th className="pb-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {services.map((service) => (
                <tr key={service.id} className="border-b border-zinc-100">
                  <td className="py-3 pr-4 font-medium text-black">{service.title}</td>
                  <td className="py-3 pr-4">
                    <span className={`rounded-full px-2 py-0.5 text-xs ${
                      service.status === 'active' ? 'bg-green-50 text-green-600' : 'bg-zinc-100 text-zinc-500'
                    }`}>
                      {service.status === 'active' ? 'Actif' : 'Inactif'}
                    </span>
                  </td>
                  <td className="py-3 pr-4">{service.views}</td>
                  <td className="py-3 pr-4">{service.rating}</td>
                  <td className="py-3">
                    <div className="flex gap-1">
                      <button className="grid h-8 w-8 place-items-center rounded-full hover:bg-yellow-50" aria-label="Modifier"><FiEdit className="h-4 w-4" /></button>
                      <button className="grid h-8 w-8 place-items-center rounded-full hover:bg-yellow-50" aria-label="Voir"><FiEye className="h-4 w-4" /></button>
                      <button className="grid h-8 w-8 place-items-center rounded-full hover:bg-red-50 text-red-500" aria-label="Supprimer"><FiTrash2 className="h-4 w-4" /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="rounded-[1.5rem] border border-zinc-200 bg-white p-6 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
          <h2 className="font-bold text-black">Derniers avis</h2>
          <select
            value={sortReviews}
            onChange={(e) => setSortReviews(e.target.value)}
            className="rounded-full border border-zinc-200 px-4 py-2 text-sm outline-none focus:border-yellow-400"
          >
            <option value="date">Trier par date</option>
            <option value="rating">Trier par note</option>
          </select>
        </div>
        <CommentList reviews={sortedReviews} canReply onReply={handleReply} />
      </div>
    </div>
  )
}

export default PrestataireDashboard
