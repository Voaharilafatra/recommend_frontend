import { useState, useMemo } from 'react'
import { FiUsers, FiPackage, FiMessageCircle, FiFlag, FiDownload, FiCheck, FiX, FiShield } from 'react-icons/fi'
import { mockUsers, mockServices, mockReviews, mockReports } from '../../data/mockData'

function AdminDashboard({ user }) {
  const [users, setUsers] = useState(mockUsers.map(({ password, ...u }) => u))
  const [reports, setReports] = useState(mockReports)
  const [userFilter, setUserFilter] = useState({ role: '', search: '' })
  const [serviceFilter, setServiceFilter] = useState({ category: '', status: '' })
  const [userPage, setUserPage] = useState(1)
  const perPage = 20

  const stats = [
    { icon: FiUsers, label: 'Utilisateurs', value: users.length },
    { icon: FiPackage, label: 'Services', value: mockServices.length },
    { icon: FiMessageCircle, label: 'Avis', value: mockReviews.length },
    { icon: FiFlag, label: 'Signalements', value: reports.filter((r) => r.status === 'pending').length },
  ]

  const filteredUsers = useMemo(() => {
    return users.filter((u) => {
      if (userFilter.role && u.role !== userFilter.role) return false
      if (userFilter.search) {
        const q = userFilter.search.toLowerCase()
        return u.name.toLowerCase().includes(q) || u.email.toLowerCase().includes(q)
      }
      return true
    })
  }, [users, userFilter])

  const paginatedUsers = filteredUsers.slice((userPage - 1) * perPage, userPage * perPage)
  const totalUserPages = Math.ceil(filteredUsers.length / perPage)

  const filteredServices = mockServices.filter((s) => {
    if (serviceFilter.category && s.category !== serviceFilter.category) return false
    if (serviceFilter.status && s.status !== serviceFilter.status) return false
    return true
  })

  const categoryDistribution = useMemo(() => {
    const counts = {}
    mockServices.forEach((s) => { counts[s.category] = (counts[s.category] || 0) + 1 })
    return Object.entries(counts)
  }, [])

  const handleReportAction = (id, action) => {
    setReports((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status: action === 'accept' ? 'resolved' : 'rejected' } : r))
    )
  }

  const exportUsersCSV = () => {
    const header = 'Nom,Email,Role,Date\n'
    const rows = users.map((u) => `"${u.name}","${u.email}","${u.role}","${u.createdAt}"`).join('\n')
    const blob = new Blob([header + rows], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'utilisateurs.csv'
    a.click()
  }

  const updateUserRole = (id, role) => {
    setUsers((prev) => prev.map((u) => (u.id === id ? { ...u, role } : u)))
  }

  return (
    <div className="space-y-8 animate-fade-in-up">
      <header className="flex items-center gap-4">
        <span className="grid h-16 w-16 place-items-center rounded-full bg-black text-2xl font-bold text-yellow-400">
          {user.avatar}
        </span>
        <div>
          <h1 className="text-2xl font-bold text-black">Bienvenue, {user.name}</h1>
          <span className="inline-flex items-center gap-1 rounded-full bg-black px-3 py-1 text-xs font-bold text-yellow-400">
            <FiShield className="h-3 w-3" /> Administrateur
          </span>
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

      {reports.filter((r) => r.status === 'pending').length > 0 && (
        <div className="rounded-[1.5rem] border border-red-200 bg-red-50 p-6">
          <h2 className="font-bold text-black mb-4 flex items-center gap-2">
            <FiFlag className="text-red-500" /> Signalements en attente
          </h2>
          <div className="space-y-3">
            {reports.filter((r) => r.status === 'pending').map((report) => (
              <div key={report.id} className="flex flex-wrap items-center justify-between gap-2 rounded-xl bg-white p-4 border border-zinc-200">
                <div>
                  <p className="text-sm font-medium text-black">{report.reason}</p>
                  <p className="text-xs text-zinc-500">Par {report.user} - {report.date}</p>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => handleReportAction(report.id, 'accept')} className="flex items-center gap-1 rounded-full bg-green-500 px-3 py-1 text-xs text-white">
                    <FiCheck /> Accepter
                  </button>
                  <button onClick={() => handleReportAction(report.id, 'reject')} className="flex items-center gap-1 rounded-full bg-red-500 px-3 py-1 text-xs text-white">
                    <FiX /> Rejeter
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-[1.5rem] border border-zinc-200 bg-white p-6 shadow-sm">
          <h2 className="font-bold text-black mb-4">Repartition des categories</h2>
          <div className="space-y-2">
            {categoryDistribution.map(([cat, count]) => (
              <div key={cat} className="flex items-center gap-2">
                <span className="w-28 truncate text-xs text-zinc-500">{cat}</span>
                <div className="flex-1 h-3 rounded-full bg-zinc-100">
                  <div className="h-full rounded-full bg-yellow-400" style={{ width: `${(count / mockServices.length) * 100}%` }} />
                </div>
                <span className="text-xs font-medium">{count}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-[1.5rem] border border-zinc-200 bg-white p-6 shadow-sm">
          <h2 className="font-bold text-black mb-4">Activite journaliere</h2>
          <div className="flex items-end gap-1 h-32">
            {[12, 18, 25, 20, 30, 15, 22].map((v, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-1">
                <div className="w-full rounded-t bg-yellow-400" style={{ height: `${(v / 30) * 100}%` }} />
                <span className="text-[10px] text-zinc-400">{['L', 'M', 'M', 'J', 'V', 'S', 'D'][i]}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="rounded-[1.5rem] border border-zinc-200 bg-white p-6 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
          <h2 className="font-bold text-black">Gestion des utilisateurs</h2>
          <button onClick={exportUsersCSV} className="flex items-center gap-1 rounded-full border border-zinc-200 px-4 py-2 text-sm hover:border-yellow-400 transition">
            <FiDownload /> Export CSV
          </button>
        </div>
        <div className="flex flex-wrap gap-3 mb-4">
          <input
            type="text"
            placeholder="Rechercher nom ou email..."
            value={userFilter.search}
            onChange={(e) => { setUserFilter({ ...userFilter, search: e.target.value }); setUserPage(1) }}
            className="rounded-full border border-zinc-200 px-4 py-2 text-sm outline-none focus:border-yellow-400"
          />
          <select
            value={userFilter.role}
            onChange={(e) => { setUserFilter({ ...userFilter, role: e.target.value }); setUserPage(1) }}
            className="rounded-full border border-zinc-200 px-4 py-2 text-sm outline-none focus:border-yellow-400"
          >
            <option value="">Tous les roles</option>
            <option value="client">Client</option>
            <option value="prestataire">Prestataire</option>
            <option value="admin">Admin</option>
          </select>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-zinc-200 text-left text-zinc-500">
                <th className="pb-3 pr-4">Nom</th>
                <th className="pb-3 pr-4">Email</th>
                <th className="pb-3 pr-4">Role</th>
                <th className="pb-3 pr-4">Inscription</th>
                <th className="pb-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginatedUsers.map((u) => (
                <tr key={u.id} className="border-b border-zinc-100">
                  <td className="py-3 pr-4 font-medium">{u.name}</td>
                  <td className="py-3 pr-4">{u.email}</td>
                  <td className="py-3 pr-4">
                    <select
                      value={u.role}
                      onChange={(e) => updateUserRole(u.id, e.target.value)}
                      className="rounded-full border border-zinc-200 px-2 py-1 text-xs"
                    >
                      <option value="client">Client</option>
                      <option value="prestataire">Prestataire</option>
                      <option value="admin">Admin</option>
                    </select>
                  </td>
                  <td className="py-3 pr-4">{u.createdAt}</td>
                  <td className="py-3">
                    <button className="text-xs text-red-500 hover:underline">Suspendre</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {totalUserPages > 1 && (
          <div className="mt-4 flex justify-center gap-2">
            <button disabled={userPage <= 1} onClick={() => setUserPage(userPage - 1)} className="rounded-full border px-3 py-1 text-sm disabled:opacity-50">Precedent</button>
            <span className="text-sm text-zinc-500">{userPage}/{totalUserPages}</span>
            <button disabled={userPage >= totalUserPages} onClick={() => setUserPage(userPage + 1)} className="rounded-full border px-3 py-1 text-sm disabled:opacity-50">Suivant</button>
          </div>
        )}
      </div>

      <div className="rounded-[1.5rem] border border-zinc-200 bg-white p-6 shadow-sm">
        <h2 className="font-bold text-black mb-4">Gestion des services</h2>
        <div className="flex flex-wrap gap-3 mb-4">
          <select
            value={serviceFilter.category}
            onChange={(e) => setServiceFilter({ ...serviceFilter, category: e.target.value })}
            className="rounded-full border border-zinc-200 px-4 py-2 text-sm outline-none focus:border-yellow-400"
          >
            <option value="">Toutes categories</option>
            {[...new Set(mockServices.map((s) => s.category))].map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
          <select
            value={serviceFilter.status}
            onChange={(e) => setServiceFilter({ ...serviceFilter, status: e.target.value })}
            className="rounded-full border border-zinc-200 px-4 py-2 text-sm outline-none focus:border-yellow-400"
          >
            <option value="">Tous statuts</option>
            <option value="active">Actif</option>
            <option value="inactive">Inactif</option>
          </select>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-zinc-200 text-left text-zinc-500">
                <th className="pb-3 pr-4">Titre</th>
                <th className="pb-3 pr-4">Categorie</th>
                <th className="pb-3 pr-4">Prestataire</th>
                <th className="pb-3 pr-4">Statut</th>
                <th className="pb-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredServices.map((s) => (
                <tr key={s.id} className="border-b border-zinc-100">
                  <td className="py-3 pr-4 font-medium">{s.title}</td>
                  <td className="py-3 pr-4">{s.category}</td>
                  <td className="py-3 pr-4">{s.prestataire}</td>
                  <td className="py-3 pr-4">
                    <span className="rounded-full bg-green-50 px-2 py-0.5 text-xs text-green-600">{s.status}</span>
                  </td>
                  <td className="py-3">
                    <div className="flex gap-2">
                      <button className="text-xs text-green-600 hover:underline">Valider</button>
                      <button className="text-xs text-orange-500 hover:underline">Suspendre</button>
                      <button className="text-xs text-red-500 hover:underline">Supprimer</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="rounded-[1.5rem] border border-zinc-200 bg-white p-6 shadow-sm">
        <h2 className="font-bold text-black mb-4">Moderation des avis</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-zinc-200 text-left text-zinc-500">
                <th className="pb-3 pr-4">Utilisateur</th>
                <th className="pb-3 pr-4">Note</th>
                <th className="pb-3 pr-4">Commentaire</th>
                <th className="pb-3 pr-4">Date</th>
                <th className="pb-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {mockReviews.map((r) => (
                <tr key={r.id} className="border-b border-zinc-100">
                  <td className="py-3 pr-4">{r.user}</td>
                  <td className="py-3 pr-4">{r.rating}</td>
                  <td className="py-3 pr-4 max-w-xs truncate">{r.comment}</td>
                  <td className="py-3 pr-4">{r.date}</td>
                  <td className="py-3">
                    <div className="flex gap-2">
                      {r.reported && <span className="text-xs text-red-500">Flag</span>}
                      <button className="text-xs text-yellow-600 hover:underline">Moderer</button>
                      <button className="text-xs text-red-500 hover:underline">Supprimer</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default AdminDashboard
