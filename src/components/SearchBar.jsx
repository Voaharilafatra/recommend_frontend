import { useState, useEffect } from 'react'
import { FiSearch } from 'react-icons/fi'

function SearchBar({ onSearch, initialQuery = '' }) {
  const [query, setQuery] = useState(initialQuery)

  useEffect(() => {
    setQuery(initialQuery)
  }, [initialQuery])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (query.trim()) {
      onSearch(query.trim())
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex w-full max-w-3xl mx-auto">
      <div className="relative flex-1">
        <input
          type="text"
          placeholder="Que recherchez-vous ?"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full rounded-l-full border border-yellow-400 px-5 py-3 pl-12 outline-none focus:ring-2 focus:ring-yellow-400/30 transition-all duration-300"
        />
        <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-yellow-400" />
      </div>
      <button
        type="submit"
        className="rounded-r-full bg-yellow-400 px-6 py-3 text-white transition-all duration-300 hover:bg-yellow-500 hover:scale-105"
      >
        Rechercher
      </button>
    </form>
  )
}

export default SearchBar