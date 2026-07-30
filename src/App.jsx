import React from 'react'
import { FaRocket, FaGithub, FaHeart } from 'react-icons/fa'
import { SiReact, SiTailwindcss, SiVite } from 'react-icons/si'
import { MdEmail, MdPhone } from 'react-icons/md'
import { IoFlash, IoStar, IoPerson } from 'react-icons/io5'

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl p-8 md:p-12 text-center border border-white/20">
        
        {/* Icône avec React Icons */}
        <div className="flex justify-center mb-6">
          <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg transform hover:scale-110 transition-transform duration-300">
            <IoFlash className="w-14 h-14 text-white" />
          </div>
        </div>

        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
          Bienvenue sur notre page
        </h1>
        
        <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-6">
          Frontend de Vohary
        </h2>

        <p className="text-gray-600 text-lg mb-8 leading-relaxed">
          Découvrez notre interface moderne construite avec
          <span className="font-semibold text-blue-600 inline-flex items-center gap-1 mx-1">
            <SiReact className="inline" /> React
          </span>
          <span className="font-semibold text-purple-600 inline-flex items-center gap-1 mx-1">
            <SiVite className="inline" /> Vite
          </span>
          <span className="font-semibold text-pink-600 inline-flex items-center gap-1 mx-1">
            <SiTailwindcss className="inline" /> Tailwind CSS
          </span>
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold py-3 px-8 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 flex items-center justify-center gap-2">
            <FaRocket /> Commencer
          </button>
          <button className="bg-white hover:bg-gray-50 text-gray-700 font-semibold py-3 px-8 rounded-xl shadow-lg hover:shadow-xl border border-gray-200 transform hover:scale-105 transition-all duration-200 flex items-center justify-center gap-2">
            <FaHeart className="text-red-500" /> En savoir plus
          </button>
        </div>

        <div className="mt-8 pt-6 border-t border-gray-200/50">
          <p className="text-sm text-gray-500 flex items-center justify-center gap-2">
            <FaGithub className="text-gray-400" /> © 2026 Vohary - Tous droits réservés
          </p>
        </div>
      </div>
    </div>
  )
}

export default App