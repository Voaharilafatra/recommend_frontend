import { FiArrowRight, FiCompass, FiHeart, FiMapPin, FiShield, FiStar, FiZap } from 'react-icons/fi'

const features = [
  { icon: FiZap, title: 'Visibilité pour petits prestataires', text: 'Augmentez votre présence locale pour être trouvé par plus de clients.' },
  { icon: FiHeart, title: 'Recommandations personnalisées', text: 'Des résultats adaptés à chaque besoin et chaque zone.' },
  { icon: FiStar, title: 'Avis et ranking', text: 'Notez les services, consultez les retours et choisissez en confiance.' },
  { icon: FiMapPin, title: 'Directions géolocalisées', text: 'Obtenez l’itinéraire direct vers les meilleures adresses proches de vous.' },
]

const guideSteps = [
  { title: 'Rechercher', description: 'Choisissez votre catégorie et trouvez les meilleurs prestataires locaux.' },
  { title: 'Comparer', description: 'Consultez les avis, les distances et les services proposés.' },
  { title: 'Réserver', description: 'Réservez ou contactez rapidement votre choix.' },
]

const testimonials = [
  { name: 'Florida', role: 'Cliente satisfaite', text: 'Super service ! – Florida', initials: 'F' },
  { name: 'Mira', role: 'Voyageuse', text: 'La carte est claire et la recherche locale est instantanée.', initials: 'M' },
  { name: 'Rivo', role: 'Prestataire', text: 'Nous avons gagné en visibilité auprès de nouveaux clients.', initials: 'R' },
]

function Home() {
  return (
    <main className="bg-[#fdfbff] text-[#18131d]">
      <section id="accueil" className="relative overflow-hidden px-5 pb-20 pt-28 sm:px-8 md:pb-28 lg:px-10">
        <div className="mx-auto grid max-w-7xl items-center gap-16 lg:grid-cols-[1.05fr_.95fr]">
          <div className="max-w-2xl">
            <span className="inline-flex rounded-full bg-[#f4ebff] px-4 py-2 text-sm font-semibold text-[#7210EA]">TADIAVO-EO · Trouvez localement</span>
            <h1 className="mt-8 text-4xl font-extrabold tracking-[-0.05em] sm:text-5xl lg:text-6xl">Trouvez les meilleurs services autour de vous, en quelques secondes.</h1>
            <p className="mt-6 max-w-xl text-base leading-7 text-zinc-600 sm:text-lg">TADIAVO-EO met en relation clients et prestataires locaux avec une expérience fluide, sécurisée et optimisée pour la découverte.</p>
            <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
              <a href="#apropos" className="inline-flex items-center justify-center gap-2 rounded-full bg-[#7210EA] px-7 py-4 text-sm font-semibold text-white transition hover:bg-[#5609b5]">En savoir plus <FiArrowRight /></a>
              <a href="#service" className="inline-flex items-center justify-center gap-2 rounded-full border border-zinc-200 bg-white px-7 py-4 text-sm font-semibold text-[#18131d] transition hover:border-[#7210EA] hover:text-[#7210EA]">Nos services</a>
            </div>
          </div>
          <div className="relative mx-auto w-full max-w-[520px]">
            <div className="absolute -right-6 top-10 h-36 w-36 rounded-full bg-[#f4ebff] blur-2xl" />
            <div className="absolute -left-10 bottom-6 h-28 w-28 rounded-full bg-[#fff0f9] blur-2xl" />
            <div className="relative overflow-hidden rounded-[2rem] border border-[#ece7ff] bg-white p-5 shadow-[0_30px_90px_-40px_rgba(114,16,234,0.35)]">
              <div className="flex items-center justify-between rounded-3xl bg-[#f8f3ff] px-5 py-4">
                <div>
                  <p className="text-xs uppercase tracking-[0.24em] text-[#7210ea]/80">Carte moderne</p>
                  <p className="mt-2 text-sm font-bold text-[#18131d]">Prestataires à proximité</p>
                </div>
                <div className="grid h-11 w-11 place-items-center rounded-2xl bg-[#7210EA] text-white"><FiMapPin /></div>
              </div>
              <div className="relative mt-6 h-[360px] overflow-hidden rounded-[1.8rem] bg-[#ede6ff] p-5">
                <div className="absolute left-6 top-8 h-14 w-14 rounded-3xl bg-[#fff4ff] shadow-lg" />
                <div className="absolute right-6 top-16 h-20 w-20 rounded-3xl bg-[#eedcff] shadow-lg" />
                <div className="absolute bottom-16 left-10 h-16 w-16 rounded-3xl bg-[#dcd5ff] shadow-lg" />
                <div className="absolute inset-x-0 bottom-0 h-1/2 rounded-t-[3rem] bg-gradient-to-t from-white to-transparent" />
                <div className="absolute left-10 top-24 flex items-center gap-3 rounded-full bg-white/90 px-3 py-2 shadow-lg backdrop-blur">
                  <span className="grid h-10 w-10 place-items-center rounded-2xl bg-[#7210ea] text-white"><FiStar /></span>
                  <div>
                    <p className="text-sm font-semibold text-[#18131d]">Café du Marché</p>
                    <p className="text-xs text-zinc-500">Restaurant · 0,5 km</p>
                  </div>
                </div>
                <div className="absolute right-8 top-40 grid h-12 w-12 place-items-center rounded-3xl bg-white text-[#7210ea] shadow-lg"><FiCompass /></div>
                <div className="absolute left-16 bottom-20 grid h-12 w-12 place-items-center rounded-3xl bg-white text-[#7210ea] shadow-lg"><FiHeart /></div>
                <div className="absolute right-20 bottom-28 grid h-12 w-12 place-items-center rounded-3xl bg-white text-[#7210ea] shadow-lg"><FiMapPin /></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="apropos" className="px-5 py-20 sm:px-8 lg:px-10">
        <div className="mx-auto grid max-w-7xl gap-16 lg:grid-cols-[.95fr_.95fr] lg:items-center">
          <div className="space-y-6">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#7210EA]">À propos</p>
            <h2 className="text-3xl font-extrabold tracking-[-0.04em] sm:text-4xl">Une expérience locale rapide, claire et fiable.</h2>
            <p className="max-w-2xl text-base leading-7 text-zinc-600">TADIAVO-EO connecte rapidement les utilisateurs aux meilleurs prestataires près de chez eux, avec des avis, une géolocalisation et un accès sécurisé via Google OAuth.</p>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-[2rem] border border-zinc-200 bg-white p-6 shadow-sm">
                <h3 className="font-semibold text-[#18131d]">Visibilité locale</h3>
                <p className="mt-3 text-sm leading-7 text-zinc-600">Une présentation claire des services disponibles à proximité.</p>
              </div>
              <div className="rounded-[2rem] border border-zinc-200 bg-white p-6 shadow-sm">
                <h3 className="font-semibold text-[#18131d]">Connexion simplifiée</h3>
                <p className="mt-3 text-sm leading-7 text-zinc-600">Authentification rapide via Google OAuth, sans mot de passe additionnel.</p>
              </div>
            </div>
          </div>
          <div className="rounded-[2rem] border border-zinc-200 bg-[#fcfbff] p-10 shadow-xl">
            <div className="space-y-6">
              <div className="rounded-[1.75rem] bg-white p-6 shadow-sm">
                <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#7210EA]">Mission</p>
                <p className="mt-4 text-sm leading-7 text-zinc-600">Offrir un service local moderne aux clients et prestataires, avec un parcours intuitif et sécurisé.</p>
              </div>
              <div className="rounded-[1.75rem] bg-[#f4ebff] p-6">
                <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#7210EA]">Confiance</p>
                <p className="mt-4 text-sm leading-7 text-zinc-600">Utilisez une plateforme qui met la confiance et la simplicité au centre de l’expérience.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="service" className="border-y border-zinc-100 bg-[#fbf7ff] px-5 py-20 sm:px-8 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#7210EA]">Service</p>
            <h2 className="mt-4 text-3xl font-extrabold tracking-[-0.04em] sm:text-4xl">Découvrez les services que vous pouvez activer.</h2>
          </div>
          <div className="mt-12 grid gap-6 lg:grid-cols-4">
            {features.map(({ icon: Icon, title, text }) => (
              <article key={title} className="rounded-[2rem] border border-zinc-200 bg-white p-7 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
                <span className="grid h-14 w-14 place-items-center rounded-3xl bg-[#f3e6ff] text-2xl text-[#7210EA]"><Icon /></span>
                <h3 className="mt-6 text-xl font-semibold text-[#18131d]">{title}</h3>
                <p className="mt-3 text-sm leading-7 text-zinc-600">{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="guide" className="px-5 py-20 sm:px-8 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-10 lg:grid-cols-[.95fr_.95fr] lg:items-center">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#7210EA]">Guide</p>
              <h2 className="mt-4 text-3xl font-extrabold tracking-[-0.04em] sm:text-4xl">Utilisez TADIAVO-EO en trois étapes simples.</h2>
              <p className="mt-4 max-w-2xl text-base leading-7 text-zinc-600">Recherchez, comparez et réservez le meilleur service dans votre zone, rapidement et sans obstacles.</p>
            </div>
            <div className="grid gap-6">
              {guideSteps.map((item) => (
                <div key={item.title} className="rounded-[2rem] border border-zinc-200 bg-white p-8 shadow-sm">
                  <p className="text-sm uppercase tracking-[0.22em] text-[#7210EA]">{item.title}</p>
                  <p className="mt-4 text-base leading-7 text-zinc-600">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="demo" className="bg-[#fbf7ff] px-5 py-20 sm:px-8 lg:px-10">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[.95fr_1.05fr] lg:items-center">
          <div className="max-w-xl">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#7210EA]">Démo</p>
            <h2 className="mt-4 text-3xl font-extrabold tracking-[-0.04em] sm:text-4xl">Explorez les services autour de vous en un clic.</h2>
            <p className="mt-5 text-base leading-7 text-zinc-600">Visualisez les prestataires activés, consultez leur profil et obtenez les directions directement depuis la carte.</p>
          </div>
          <div className="rounded-[2rem] border border-zinc-200 bg-white p-6 shadow-xl sm:p-8">
            <div className="flex items-center justify-between rounded-3xl bg-[#f3e6ff] px-5 py-4">
              <div>
                <p className="text-sm font-semibold text-[#18131d]">Carte de recherche</p>
                <p className="text-xs text-zinc-500">Vue des prestataires en temps réel</p>
              </div>
              <span className="inline-flex rounded-full bg-[#7210EA] px-3 py-1 text-xs font-semibold text-white">Actif</span>
            </div>
            <div className="mt-6 grid gap-4">
              <div className="rounded-[1.75rem] bg-[#ede6ff] p-5">
                <div className="flex items-center justify-between text-sm font-semibold text-[#18131d]">
                  <span>Carte</span>
                  <span>0,8 km</span>
                </div>
                <div className="mt-5 h-60 rounded-[1.5rem] bg-gradient-to-br from-[#f8f4ff] via-[#ede6ff] to-[#f3e6ff] p-4 shadow-inner">
                  <div className="flex h-full flex-col justify-between">
                    <div className="space-y-3">
                      <span className="inline-flex items-center gap-2 rounded-full bg-white/90 px-3 py-2 text-xs font-semibold text-[#7210EA] shadow">Google Maps API</span>
                      <div className="grid grid-cols-2 gap-3">
                        <div className="rounded-3xl bg-white/90 p-4 shadow-sm">
                          <p className="text-xs text-zinc-500">Préféré</p>
                          <p className="mt-2 font-semibold text-[#18131d]">Restaurant Plaisir</p>
                        </div>
                        <div className="rounded-3xl bg-white/90 p-4 shadow-sm">
                          <p className="text-xs text-zinc-500">Note</p>
                          <p className="mt-2 font-semibold text-[#18131d]">4,8/5</p>
                        </div>
                      </div>
                    </div>
                    <div className="rounded-[1.5rem] bg-white/70 p-4 shadow-inner">
                      <div className="flex items-center gap-3 text-sm text-zinc-600">
                        <span className="grid h-10 w-10 place-items-center rounded-3xl bg-[#f7eeff] text-[#7210EA]"><FiMapPin /></span>
                        <div>
                          <p className="font-semibold text-[#18131d]">Direction immédiate</p>
                          <p className="text-xs">Ouvrir l’itinéraire vers le prestataire</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="rounded-[1.75rem] bg-white p-5 shadow-sm">
                <div className="flex items-center gap-3 text-sm text-zinc-500">
                  <span className="grid h-9 w-9 place-items-center rounded-2xl bg-[#f6efff] text-[#7210EA]"><FiShield /></span>
                  <p>Authentification sécurisée avec Google OAuth.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="contact" className="px-5 py-20 sm:px-8 lg:px-10">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[.95fr_.65fr] lg:items-center">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#7210EA]">Contact</p>
            <h2 className="mt-4 text-3xl font-extrabold tracking-[-0.04em] sm:text-4xl">Contactez l’équipe TADIAVO-EO</h2>
            <p className="mt-4 max-w-2xl text-base leading-7 text-zinc-600">Prêt à lancer votre projet ? Envoyez-nous un message pour recevoir une réponse rapide et personnalisée.</p>
            <div className="mt-8 space-y-4 text-sm leading-7 text-zinc-600">
              <p><span className="font-semibold text-[#18131d]">Email :</span> mivononaandrehy7@gmail.com</p>
              <p><span className="font-semibold text-[#18131d]">Téléphone :</span> +261 34 12 345 67</p>
            </div>
          </div>
          <div className="rounded-[2rem] border border-zinc-200 bg-[#fbf7ff] p-10 shadow-xl">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#7210EA]">Nous écrire</p>
            <h3 className="mt-4 text-2xl font-semibold text-[#18131d]">Demande de contact rapide</h3>
            <p className="mt-3 text-sm leading-7 text-zinc-600">Laissez-nous un message et nous reviendrons vers vous très vite.</p>
            <div className="mt-8 space-y-4">
              <input type="text" placeholder="Votre nom" className="w-full rounded-3xl border border-zinc-200 bg-white px-5 py-4 text-sm text-[#18131d] outline-none ring-0 transition focus:border-[#7210EA]" />
              <input type="email" placeholder="Votre email" className="w-full rounded-3xl border border-zinc-200 bg-white px-5 py-4 text-sm text-[#18131d] outline-none ring-0 transition focus:border-[#7210EA]" />
              <textarea rows="4" placeholder="Votre message" className="w-full rounded-3xl border border-zinc-200 bg-white px-5 py-4 text-sm text-[#18131d] outline-none ring-0 transition focus:border-[#7210EA]"></textarea>
              <button className="w-full rounded-full bg-[#7210EA] px-6 py-4 text-sm font-semibold text-white transition hover:bg-[#5609b5]">Envoyer le message</button>
            </div>
          </div>
        </div>
      </section>

      <section className="px-5 pb-32 sm:px-8 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#7210EA]">Témoignages</p>
              <h2 className="mt-4 text-3xl font-extrabold tracking-[-0.04em] sm:text-4xl">Les avis qui font confiance à TADIAVO-EO.</h2>
            </div>
            <div className="flex items-center gap-2 text-[#7210EA]">
              {[...Array(5)].map((_, index) => <FiStar key={index} className="text-lg" />)}
              <span className="text-sm font-semibold text-zinc-700">4,9 / 5</span>
            </div>
          </div>
          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {testimonials.map(({ name, role, text, initials }) => (
              <figure key={name} className="rounded-[2rem] border border-zinc-200 bg-white p-8 shadow-sm">
                <div className="flex gap-1 text-[#7210EA]">{[...Array(5)].map((_, index) => <FiStar key={index} />)}</div>
                <blockquote className="mt-5 text-base leading-7 text-zinc-700">“{text}”</blockquote>
                <figcaption className="mt-6 flex items-center gap-3">
                  <span className="grid h-11 w-11 place-items-center rounded-3xl bg-[#f3e6ff] text-sm font-bold text-[#7210EA]">{initials}</span>
                  <div>
                    <p className="font-semibold text-[#18131d]">{name}</p>
                    <p className="text-sm text-zinc-500">{role}</p>
                  </div>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}

export default Home
