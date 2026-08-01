const navItems = [
  { label: 'Accueil', href: '#accueil' },
  { label: 'A propos', href: '#apropos' },
  { label: 'Service', href: '#service' },
  { label: 'Guide', href: '#guide' },
  { label: 'Contact', href: '#contact' },
]

function Header() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-zinc-200 bg-white/95 backdrop-blur-xl shadow-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-8 lg:px-10">
        <a href="#accueil" className="flex items-center gap-3 text-lg font-extrabold text-[#18131d]">
          <span className="grid h-11 w-11 place-items-center rounded-2xl bg-[#7210EA] text-sm font-black text-white">T</span>
          TADIAVO-EO
        </a>

        <nav className="hidden items-center gap-8 text-sm font-medium text-zinc-600 md:flex">
          {navItems.map((item) => (
            <a key={item.href} href={item.href} className="transition hover:text-[#7210EA]">
              {item.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <a href="/oauth" className="rounded-full bg-[#7210EA] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#5609b5]">
            Connexion
          </a>
        </div>
      </div>
    </header>
  )
}

export default Header
