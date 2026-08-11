import 'animate.css'

function Loader() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-white px-5 py-20">
      <div className="flex flex-col items-center gap-6 rounded-[2rem] border border-zinc-200 bg-white/95 p-10 shadow-2xl animate__animated animate__zoomIn">
        {/* Cercle de chargement animé */}
        <div className="relative flex h-20 w-20 items-center justify-center rounded-full bg-yellow-50 animate__animated animate__pulse animate__infinite">
          <div className="absolute h-16 w-16 animate-spin rounded-full border-4 border-yellow-400/20 border-t-yellow-400" />
          <div className="absolute h-12 w-12 animate-pulse rounded-full bg-yellow-400/10" />
          <span className="relative text-2xl font-black text-yellow-400 animate__animated animate__bounce animate__infinite">T</span>
        </div>
        
        <div className="flex flex-col items-center gap-2">
          <p className="text-center text-sm font-semibold text-black animate__animated animate__fadeInUp">
            Chargement de la page...
          </p>
          <div className="flex gap-1.5 animate__animated animate__fadeInUp animate__delay-1s">
            <span className="h-2 w-2 animate-bounce rounded-full bg-yellow-400 [animation-delay:-0.3s]"></span>
            <span className="h-2 w-2 animate-bounce rounded-full bg-yellow-400 [animation-delay:-0.15s]"></span>
            <span className="h-2 w-2 animate-bounce rounded-full bg-yellow-400"></span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Loader
