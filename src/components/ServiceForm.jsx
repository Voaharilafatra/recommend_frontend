import { useState } from 'react'
import { FiUpload, FiX, FiSave } from 'react-icons/fi'
import { mockCategories } from '../data/mockData'

const initialForm = {
  title: '',
  description: '',
  category: '',
  location: '',
  lat: -18.9137,
  lng: 47.5361,
  price: '',
  phone: '',
  email: '',
  tags: [],
  disponibility: 'Lun-Ven 8h-18h',
  image: null,
}

function ServiceForm({ onSubmit, initialData, onSaveDraft }) {
  const [form, setForm] = useState(initialData || initialForm)
  const [errors, setErrors] = useState({})
  const [tagInput, setTagInput] = useState('')
  const [preview, setPreview] = useState(initialData?.image || null)
  const [success, setSuccess] = useState('')
  const [submitting, setSubmitting] = useState(false)

  const validate = () => {
    const e = {}
    if (!form.title.trim()) e.title = 'Titre requis'
    if (!form.description || form.description.length < 50) e.description = 'Minimum 50 caracteres'
    if (!form.category) e.category = 'Categorie requise'
    if (!form.location.trim()) e.location = 'Localisation requise'
    if (!form.price || Number(form.price) <= 0) e.price = 'Prix superieur a 0'
    if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Email invalide'
    if (form.phone && !/^[\d\s+\-()]+$/.test(form.phone)) e.phone = 'Telephone invalide'
    if (form.lat < -90 || form.lat > 90) e.lat = 'Latitude invalide'
    if (form.lng < -180 || form.lng > 180) e.lng = 'Longitude invalide'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }))
    setErrors((prev) => ({ ...prev, [field]: undefined }))
  }

  const handleImageDrop = (e) => {
    e.preventDefault()
    const file = e.dataTransfer?.files?.[0] || e.target?.files?.[0]
    if (file) {
      const url = URL.createObjectURL(file)
      setPreview(url)
      handleChange('image', url)
    }
  }

  const addTag = () => {
    if (tagInput.trim() && form.tags.length < 5) {
      handleChange('tags', [...form.tags, tagInput.trim()])
      setTagInput('')
    }
  }

  const removeTag = (tag) => {
    handleChange('tags', form.tags.filter((t) => t !== tag))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validate()) return
    setSubmitting(true)
    try {
      await new Promise((r) => setTimeout(r, 800))
      onSubmit && onSubmit(form)
      setSuccess('Service publie avec succes')
    } catch {
      setErrors({ submit: 'Erreur lors de la soumission' })
    } finally {
      setSubmitting(false)
    }
  }

  const handleDraft = () => {
    onSaveDraft && onSaveDraft(form)
    localStorage.setItem('service_draft', JSON.stringify(form))
    setSuccess('Brouillon sauvegarde')
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {success && (
        <div className="rounded-xl bg-green-50 border border-green-200 p-3 text-sm text-green-600">{success}</div>
      )}
      {errors.submit && (
        <div className="rounded-xl bg-red-50 border border-red-200 p-3 text-sm text-red-600">{errors.submit}</div>
      )}

      <div>
        <label className="text-sm font-medium text-black">Titre *</label>
        <input
          type="text"
          value={form.title}
          onChange={(e) => handleChange('title', e.target.value)}
          className="mt-1 w-full rounded-full border border-zinc-200 px-4 py-3 outline-none focus:border-yellow-400"
        />
        {errors.title && <p className="mt-1 text-xs text-red-500">{errors.title}</p>}
      </div>

      <div>
        <label className="text-sm font-medium text-black">Description * (min 50 caracteres)</label>
        <textarea
          value={form.description}
          onChange={(e) => handleChange('description', e.target.value)}
          rows={4}
          className="mt-1 w-full rounded-2xl border border-zinc-200 px-4 py-3 outline-none focus:border-yellow-400"
        />
        {errors.description && <p className="mt-1 text-xs text-red-500">{errors.description}</p>}
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label className="text-sm font-medium text-black">Categorie *</label>
          <select
            value={form.category}
            onChange={(e) => handleChange('category', e.target.value)}
            className="mt-1 w-full rounded-full border border-zinc-200 px-4 py-3 outline-none focus:border-yellow-400"
          >
            <option value="">Selectionner</option>
            {mockCategories.filter((c) => !c.includes('Toutes')).map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
          {errors.category && <p className="mt-1 text-xs text-red-500">{errors.category}</p>}
        </div>
        <div>
          <label className="text-sm font-medium text-black">Prix (Ar) *</label>
          <input
            type="number"
            value={form.price}
            onChange={(e) => handleChange('price', e.target.value)}
            className="mt-1 w-full rounded-full border border-zinc-200 px-4 py-3 outline-none focus:border-yellow-400"
          />
          {errors.price && <p className="mt-1 text-xs text-red-500">{errors.price}</p>}
        </div>
      </div>

      <div>
        <label className="text-sm font-medium text-black">Localisation *</label>
        <input
          type="text"
          value={form.location}
          onChange={(e) => handleChange('location', e.target.value)}
          placeholder="Antananarivo, Analakely"
          className="mt-1 w-full rounded-full border border-zinc-200 px-4 py-3 outline-none focus:border-yellow-400"
        />
        {errors.location && <p className="mt-1 text-xs text-red-500">{errors.location}</p>}
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label className="text-sm font-medium text-black">Latitude</label>
          <input
            type="number"
            step="any"
            value={form.lat}
            onChange={(e) => handleChange('lat', Number(e.target.value))}
            className="mt-1 w-full rounded-full border border-zinc-200 px-4 py-3 outline-none focus:border-yellow-400"
          />
        </div>
        <div>
          <label className="text-sm font-medium text-black">Longitude</label>
          <input
            type="number"
            step="any"
            value={form.lng}
            onChange={(e) => handleChange('lng', Number(e.target.value))}
            className="mt-1 w-full rounded-full border border-zinc-200 px-4 py-3 outline-none focus:border-yellow-400"
          />
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label className="text-sm font-medium text-black">Telephone</label>
          <input
            type="tel"
            value={form.phone}
            onChange={(e) => handleChange('phone', e.target.value)}
            className="mt-1 w-full rounded-full border border-zinc-200 px-4 py-3 outline-none focus:border-yellow-400"
          />
          {errors.phone && <p className="mt-1 text-xs text-red-500">{errors.phone}</p>}
        </div>
        <div>
          <label className="text-sm font-medium text-black">Email</label>
          <input
            type="email"
            value={form.email}
            onChange={(e) => handleChange('email', e.target.value)}
            className="mt-1 w-full rounded-full border border-zinc-200 px-4 py-3 outline-none focus:border-yellow-400"
          />
          {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email}</p>}
        </div>
      </div>

      <div>
        <label className="text-sm font-medium text-black">Disponibilites</label>
        <input
          type="text"
          value={form.disponibility}
          onChange={(e) => handleChange('disponibility', e.target.value)}
          className="mt-1 w-full rounded-full border border-zinc-200 px-4 py-3 outline-none focus:border-yellow-400"
        />
      </div>

      <div>
        <label className="text-sm font-medium text-black">Tags</label>
        <div className="mt-1 flex gap-2">
          <input
            type="text"
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
            className="flex-1 rounded-full border border-zinc-200 px-4 py-2 outline-none focus:border-yellow-400"
            placeholder="Ajouter un tag"
          />
          <button type="button" onClick={addTag} className="rounded-full bg-yellow-400 px-4 py-2 text-sm font-semibold text-white">+</button>
        </div>
        <div className="mt-2 flex flex-wrap gap-2">
          {form.tags.map((tag) => (
            <span key={tag} className="flex items-center gap-1 rounded-full bg-yellow-50 px-3 py-1 text-sm">
              {tag}
              <button type="button" onClick={() => removeTag(tag)}><FiX className="h-3 w-3" /></button>
            </span>
          ))}
        </div>
      </div>

      <div>
        <label className="text-sm font-medium text-black">Image</label>
        <div
          onDrop={handleImageDrop}
          onDragOver={(e) => e.preventDefault()}
          className="mt-1 flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-zinc-200 p-8 hover:border-yellow-400 transition cursor-pointer"
        >
          {preview ? (
            <img src={preview} alt="Preview" className="h-40 rounded-xl object-cover" />
          ) : (
            <>
              <FiUpload className="h-8 w-8 text-zinc-400" />
              <p className="mt-2 text-sm text-zinc-500">Glissez une image ou cliquez</p>
            </>
          )}
          <input type="file" accept="image/*" onChange={handleImageDrop} className="mt-2 text-sm" />
        </div>
      </div>

      <div className="flex flex-wrap gap-3">
        <button
          type="submit"
          disabled={submitting}
          className="rounded-full bg-yellow-400 px-8 py-3 font-semibold text-white hover:bg-yellow-500 hover:scale-105 transition disabled:opacity-50"
        >
          {submitting ? 'Publication...' : 'Publier le service'}
        </button>
        <button
          type="button"
          onClick={handleDraft}
          className="flex items-center gap-2 rounded-full border border-zinc-200 px-6 py-3 font-semibold text-black hover:border-yellow-400 transition"
        >
          <FiSave /> Sauvegarder brouillon
        </button>
      </div>
    </form>
  )
}

export default ServiceForm
