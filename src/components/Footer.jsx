function Footer() {
  return (
    <footer className="border-t border-zinc-200 bg-[#18131d] px-5 py-12 text-zinc-300 sm:px-8 lg:px-10">
      <div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-[1.6fr_1fr_1fr]">
        <div>
          <a href="/" className="flex items-center gap-3 text-white">
            <span className="grid h-11 w-11 place-items-center rounded-2xl bg-[#7210EA] text-sm font-black">T</span>
            TADIAVO-EO
          </a>
          <p className="mt-5 max-w-xs text-sm leading-7 text-zinc-400">Une plateforme moderne pour découvrir et gérer les meilleurs prestataires locaux.</p>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-[0.24em] text-white">Liens rapides</h3>
          <div className="mt-6 grid gap-3 text-sm text-zinc-400">
            <a href="/" className="transition hover:text-white">Accueil</a>
            <a href="/oauth" className="transition hover:text-white">OAuth</a>
            <a href="/dashboard" className="transition hover:text-white">Dashboard</a>
          </div>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-[0.24em] text-white">Contact</h3>
          <a href="mailto:mivononaandrehy7@gmail.com" className="mt-6 block text-sm text-zinc-400 transition hover:text-white">mivononaandrehy7@gmail.com</a>
          <div className="mt-7 flex items-center gap-3">
            <a href="#" className="grid h-11 w-11 place-items-center rounded-2xl bg-zinc-900 text-zinc-300 transition hover:bg-[#7210EA] hover:text-white">F</a>
            <a href="#" className="grid h-11 w-11 place-items-center rounded-2xl bg-zinc-900 text-zinc-300 transition hover:bg-[#7210EA] hover:text-white">I</a>
            <a href="#" className="grid h-11 w-11 place-items-center rounded-2xl bg-zinc-900 text-zinc-300 transition hover:bg-[#7210EA] hover:text-white">L</a>
          </div>
        </div>
      </div>
      <div className="mx-auto mt-10 max-w-7xl text-center text-xs text-zinc-500">Copyright © 2026 TADIAVO-EO</div>
    </footer>
  )
}

export default Footer
