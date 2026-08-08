import { useState } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { FiUser, FiLock, FiBell, FiDownload, FiTrash2, FiCamera } from 'react-icons/fi'
import { getServicesByPrestataire } from '../data/mockData'

function Profile() {
  const { user, updateUser, changePassword } = useAuth()
  const [form, setForm] = useState({
    name: user?.name || '',
    phone: user?.phone || '',
    location: user?.location || '',
    lat: user?.lat || -18.9137,
    lng: user?.lng || 47.5361,
  })
  const [passwordForm, setPasswordForm] = useState({ old: '', new: '', confirm: '' })
  const [notifications, setNotifications] = useState({ email: true, push: true })
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  const [activeTab, setActiveTab] = useState('info')

  const prestataireServices = user?.role === 'prestataire' ? getServicesByPrestataire(user.id) : []

  const handleProfileSave = (e) => {
    e.preventDefault()
    updateUser(form)
    setMessage('Profil mis a jour avec succes')
    setTimeout(() => setMessage(''), 3000)
  }

  const handlePasswordChange = async (e) => {
    e.preventDefault()
    setError('')
    if (passwordForm.new !== passwordForm.confirm) {
      setError('Les mots de passe ne correspondent pas')
      return
    }
    if (passwordForm.new.length < 6) {
      setError('Minimum 6 caracteres')
      return
    }
    try {
      await changePassword(passwordForm.old, passwordForm.new)
      setMessage('Mot de passe modifie')
      setPasswordForm({ old: '', new: '', confirm: '' })
    } catch (err) {
      setError(err.message)
    }
  }

  const tabs = [
    { id: 'info', label: 'Informations', icon: FiUser },
    { id: 'security', label: 'Securite', icon: FiLock },
    { id: 'preferences', label: 'Preferences', icon: FiBell },
  ]

  return (
    <div className="px-5 py-20 pt-28 sm:px-8 lg:px-10">
      <div className="mx-auto max-w-3xl">
        <h1 className="text-2xl font-bold text-black mb-8">Mon profil</h1>

        {message && <div className="mb-4 rounded-xl bg-green-50 border border-green-200 p-3 text-sm text-green-600">{message}</div>}

        <div className="rounded-[2rem] border border-zinc-200 bg-white p-8 shadow-sm mb-8">
          <div className="flex flex-col sm:flex-row items-center gap-6">
            <div className="relative">
              <span className="grid h-24 w-24 place-items-center rounded-full bg-yellow-400 text-3xl font-bold text-white">
                {user?.avatar}
              </span>
              <button className="absolute bottom-0 right-0 grid h-8 w-8 place-items-center rounded-full bg-black text-white" aria-label="Changer photo">
                <FiCamera className="h-4 w-4" />
              </button>
            </div>
            <div className="text-center sm:text-left">
              <h2 className="text-xl font-bold text-black">{user?.name}</h2>
              <p className="text-sm text-zinc-500">{user?.email}</p>
              <span className="mt-2 inline-block rounded-full bg-yellow-50 px-3 py-1 text-xs font-semibold text-yellow-600 capitalize">
                {user?.role}
              </span>
              <p className="mt-1 text-xs text-zinc-400">Inscrit le {user?.createdAt}</p>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-6">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium transition ${
                activeTab === tab.id ? 'bg-yellow-400 text-white' : 'border border-zinc-200 text-zinc-600 hover:border-yellow-400'
              }`}
            >
              <tab.icon className="h-4 w-4" /> {tab.label}
            </button>
          ))}
        </div>

        {activeTab === 'info' && (
          <form onSubmit={handleProfileSave} className="rounded-[2rem] border border-zinc-200 bg-white p-8 shadow-sm space-y-4">
            <div>
              <label className="text-sm font-medium text-black">Nom complet</label>
              <input type="text" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="mt-1 w-full rounded-full border border-zinc-200 px-4 py-3 outline-none focus:border-yellow-400" />
            </div>
            <div>
              <label className="text-sm font-medium text-black">Email (lecture seule)</label>
              <input type="email" value={user?.email} disabled
                className="mt-1 w-full rounded-full border border-zinc-200 bg-zinc-50 px-4 py-3 text-zinc-500" />
            </div>
            <div>
              <label className="text-sm font-medium text-black">Telephone</label>
              <input type="tel" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })}
                className="mt-1 w-full rounded-full border border-zinc-200 px-4 py-3 outline-none focus:border-yellow-400" />
            </div>
            <div>
              <label className="text-sm font-medium text-black">Localisation</label>
              <input type="text" value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })}
                className="mt-1 w-full rounded-full border border-zinc-200 px-4 py-3 outline-none focus:border-yellow-400" />
            </div>
            <button type="submit" className="rounded-full bg-yellow-400 px-8 py-3 font-semibold text-white hover:bg-yellow-500 transition">
              Enregistrer
            </button>
          </form>
        )}

        {activeTab === 'security' && (
          <form onSubmit={handlePasswordChange} className="rounded-[2rem] border border-zinc-200 bg-white p-8 shadow-sm space-y-4">
            {error && <div className="rounded-xl bg-red-50 p-3 text-sm text-red-600">{error}</div>}
            <div>
              <label className="text-sm font-medium text-black">Ancien mot de passe</label>
              <input type="password" value={passwordForm.old} onChange={(e) => setPasswordForm({ ...passwordForm, old: e.target.value })}
                className="mt-1 w-full rounded-full border border-zinc-200 px-4 py-3 outline-none focus:border-yellow-400" />
            </div>
            <div>
              <label className="text-sm font-medium text-black">Nouveau mot de passe</label>
              <input type="password" value={passwordForm.new} onChange={(e) => setPasswordForm({ ...passwordForm, new: e.target.value })}
                className="mt-1 w-full rounded-full border border-zinc-200 px-4 py-3 outline-none focus:border-yellow-400" />
            </div>
            <div>
              <label className="text-sm font-medium text-black">Confirmer</label>
              <input type="password" value={passwordForm.confirm} onChange={(e) => setPasswordForm({ ...passwordForm, confirm: e.target.value })}
                className="mt-1 w-full rounded-full border border-zinc-200 px-4 py-3 outline-none focus:border-yellow-400" />
            </div>
            <button type="submit" className="rounded-full bg-yellow-400 px-8 py-3 font-semibold text-white hover:bg-yellow-500 transition">
              Changer le mot de passe
            </button>
          </form>
        )}

        {activeTab === 'preferences' && (
          <div className="rounded-[2rem] border border-zinc-200 bg-white p-8 shadow-sm space-y-4">
            <label className="flex items-center justify-between">
              <span className="text-sm font-medium">Notifications email</span>
              <input type="checkbox" checked={notifications.email} onChange={(e) => setNotifications({ ...notifications, email: e.target.checked })} className="accent-yellow-400" />
            </label>
            <label className="flex items-center justify-between">
              <span className="text-sm font-medium">Notifications push</span>
              <input type="checkbox" checked={notifications.push} onChange={(e) => setNotifications({ ...notifications, push: e.target.checked })} className="accent-yellow-400" />
            </label>
            <button className="flex items-center gap-2 rounded-full border border-zinc-200 px-5 py-2.5 text-sm hover:border-yellow-400 transition">
              <FiDownload /> Exporter mes donnees
            </button>
            <button className="flex items-center gap-2 rounded-full border border-red-200 px-5 py-2.5 text-sm text-red-500 hover:bg-red-50 transition">
              <FiTrash2 /> Supprimer mon compte
            </button>
          </div>
        )}

        {user?.role === 'prestataire' && prestataireServices.length > 0 && (
          <div className="mt-8 rounded-[2rem] border border-zinc-200 bg-white p-8 shadow-sm">
            <h3 className="font-bold text-black mb-4">Mes services ({prestataireServices.length})</h3>
            <div className="space-y-2">
              {prestataireServices.map((s) => (
                <div key={s.id} className="flex justify-between text-sm border-b border-zinc-100 pb-2">
                  <span>{s.title}</span>
                  <span className="text-yellow-400 font-medium">{s.rating}/5</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Profile
