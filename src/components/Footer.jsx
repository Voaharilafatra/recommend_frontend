import { FaFacebook, FaInstagram, FaLinkedin } from 'react-icons/fa'

function Footer() {
  return (
    <footer className="border-t border-yellow-300 bg-yellow-400 px-5 py-12 text-black sm:px-8 lg:px-10">
      <div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-[1.6fr_1fr_1fr]">
        <div>
          <a href="/" className="flex items-center gap-3 text-black">
            <span className="grid h-11 w-11 place-items-center rounded-2xl bg-white text-sm font-black text-yellow-400">T</span>
            TADIAVO-EO
          </a>
          <p className="mt-5 max-w-xs text-sm leading-7 text-black/70">Une plateforme moderne pour découvrir et gérer les meilleurs prestataires locaux.</p>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-[0.24em] text-black">Liens rapides</h3>
          <div className="mt-6 grid gap-3 text-sm text-black/70">
            <a href="/" className="transition hover:text-black">Accueil</a>
            <a href="/oauth" className="transition hover:text-black">OAuth</a>
            <a href="/dashboard" className="transition hover:text-black">Dashboard</a>
          </div>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-[0.24em] text-black">Contact</h3>
          <a href="mailto:mivononaandrehy7@gmail.com" className="mt-6 block text-sm text-black/70 transition hover:text-black">mivononaandrehy7@gmail.com</a>
          <div className="mt-7 flex items-center gap-3">
            <a 
              href="#" 
              className="grid h-11 w-11 place-items-center rounded-2xl bg-black/10 text-black transition hover:bg-black hover:text-white"
              aria-label="Facebook"
            >
              <FaFacebook className="h-5 w-5" />
            </a>
            <a 
              href="#" 
              className="grid h-11 w-11 place-items-center rounded-2xl bg-black/10 text-black transition hover:bg-black hover:text-white"
              aria-label="Instagram"
            >
              <FaInstagram className="h-5 w-5" />
            </a>
            <a 
              href="#" 
              className="grid h-11 w-11 place-items-center rounded-2xl bg-black/10 text-black transition hover:bg-black hover:text-white"
              aria-label="LinkedIn"
            >
              <FaLinkedin className="h-5 w-5" />
            </a>
          </div>
        </div>
      </div>
      <div className="mx-auto mt-10 max-w-7xl text-center text-xs text-black/50">Copyright  2026 TADIAVO-EO</div>
    </footer>
  )
}

export default Footer