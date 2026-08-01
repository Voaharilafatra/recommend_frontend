import { FiMapPin, FiStar, FiUsers, FiZap } from 'react-icons/fi'

const metrics = [
  { title: 'Prestataires actifs', value: '128', icon: FiMapPin },
  { title: 'Avis publiés', value: '4,860', icon: FiStar },
  { title: 'Nouveaux clients', value: '1,230', icon: FiUsers },
  { title: 'Visites aujourd’hui', value: '5,280', icon: FiZap },
]

const overviewItems = [
  { title: 'Réservations', subtitle: 'Dernières 24h', value: '86' },
  { title: 'Demandes de devis', subtitle: 'Nouvelle semaine', value: '34' },
  { title: 'Messages clients', subtitle: 'Réponses en attente', value: '12' },
]

const tasks = [
  { title: 'Valider les nouvelles demandes', status: 'En attente' },
  { title: 'Répondre aux messages clients', status: 'Urgent' },
  { title: 'Publier 2 nouveaux services', status: 'Planifié' },
]

const topServices = [
  { name: 'Café du Marché', rating: '4,9', category: 'Restaurant' },
  { name: 'Hôtel La Baie', rating: '4,8', category: 'Hôtel' },
  { name: 'Spa Zen', rating: '4,7', category: 'Bien-être' },
]

function Dashboard() {
  return (
    <main className="min-h-screen bg-[#f8f6ff] text-[#18131d] px-5 py-24 sm:px-8 lg:px-10">
      <div className="mx-auto max-w-7xl space-y-10">
        <div className="rounded-[2rem] bg-white p-10 shadow-xl">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#7210EA]">Tableau de bord</p>
              <h1 className="mt-3 text-4xl font-extrabold sm:text-5xl">Bienvenue dans votre espace TADIAVO-EO</h1>
              <p className="mt-4 max-w-2xl text-base leading-7 text-zinc-600">Suivez vos services, gérez les demandes et mesurez l’impact de votre présence locale.</p>
            </div>
            <div className="grid gap-3 sm:grid-cols-2 lg:auto-cols-max">
              <button className="rounded-full bg-[#7210EA] px-6 py-4 text-sm font-semibold text-white transition hover:bg-[#5609b5]">Voir les statistiques</button>
              <button className="rounded-full border border-zinc-200 bg-white px-6 py-4 text-sm font-semibold text-[#18131d] transition hover:bg-[#f4f1ff]">Nouvelle annonce</button>
            </div>
          </div>

          <div className="mt-10 grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
            {metrics.map(({ title, value, icon: Icon }) => (
              <div key={title} className="rounded-[1.75rem] border border-zinc-200 bg-[#fbf7ff] p-6 shadow-sm">
                <div className="flex items-center justify-between text-sm font-semibold text-[#18131d]">
                  <span>{title}</span>
                  <span className="grid h-11 w-11 place-items-center rounded-2xl bg-[#e9dbff] text-[#7210EA]"><Icon /></span>
                </div>
                <p className="mt-6 text-3xl font-extrabold text-[#18131d]">{value}</p>
              </div>
            ))}
          </div>

          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            {overviewItems.map((item) => (
              <div key={item.title} className="rounded-[1.75rem] border border-zinc-200 bg-white p-6 shadow-sm">
                <p className="text-sm font-semibold uppercase tracking-[0.22em] text-zinc-500">{item.subtitle}</p>
                <h2 className="mt-4 text-2xl font-semibold text-[#18131d]">{item.title}</h2>
                <p className="mt-3 text-4xl font-extrabold text-[#7210EA]">{item.value}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="grid gap-6 xl:grid-cols-[1.25fr_.75fr]">
          <div className="rounded-[2rem] border border-zinc-200 bg-white p-8 shadow-xl">
            <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="text-xl font-semibold text-[#18131d]">Activité récente</h2>
                <p className="mt-2 text-sm text-zinc-600">Les actions récentes sont affichées ici pour votre suivi.</p>
              </div>
              <button className="rounded-full border border-zinc-200 bg-[#fbf7ff] px-4 py-2 text-sm font-semibold text-[#18131d] transition hover:bg-[#f1edff]">Filtrer</button>
            </div>
            <ul className="mt-8 space-y-4 text-sm text-zinc-600">
              {[
                'Nouvelle évaluation reçue pour “Café du Marché”.',
                'Profil prestataire mis à jour avec succès.',
                '6 demandes de contact traitées aujourd’hui.',
                'Alertes de disponibilité prêtes pour publication.',
              ].map((item) => (
                <li key={item} className="rounded-3xl bg-[#fbf7ff] p-5">{item}</li>
              ))}
            </ul>
          </div>

          <div className="space-y-6">
            <div className="rounded-[2rem] border border-zinc-200 bg-white p-8 shadow-xl">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <h2 className="text-xl font-semibold text-[#18131d]">Tâches prioritaires</h2>
                  <p className="mt-2 text-sm text-zinc-600">Terminez les actions importantes du jour.</p>
                </div>
                <span className="rounded-full bg-[#ede6ff] px-4 py-2 text-xs font-semibold text-[#7210EA]">4 tâches</span>
              </div>
              <div className="mt-6 space-y-4">
                {tasks.map((task) => (
                  <div key={task.title} className="rounded-3xl bg-[#f7f2ff] p-5">
                    <div className="flex items-center justify-between text-sm font-semibold text-[#18131d]">
                      <span>{task.title}</span>
                      <span className="rounded-full bg-[#e9dbff] px-3 py-1 text-xs font-semibold text-[#7210EA]">{task.status}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-[2rem] border border-zinc-200 bg-white p-8 shadow-xl">
              <h2 className="text-xl font-semibold text-[#18131d]">Top prestataires</h2>
              <div className="mt-6 space-y-4">
                {topServices.map((item) => (
                  <div key={item.name} className="rounded-3xl bg-[#f7f2ff] p-5">
                    <div className="flex items-center justify-between text-sm font-semibold text-[#18131d]">
                      <span>{item.name}</span>
                      <span>{item.rating} ★</span>
                    </div>
                    <p className="mt-2 text-sm text-zinc-600">{item.category}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-[2rem] border border-zinc-200 bg-white p-8 shadow-xl">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h2 className="text-xl font-semibold text-[#18131d]">Tendances récentes</h2>
              <p className="mt-2 text-sm text-zinc-600">Une vue synthétique des performances et des demandes du moment.</p>
            </div>
            <button className="rounded-full border border-zinc-200 bg-[#fbf7ff] px-4 py-2 text-sm font-semibold text-[#18131d] transition hover:bg-[#f1edff]">Voir tout</button>
          </div>
          <div className="mt-8 grid gap-4 lg:grid-cols-3">
            <div className="rounded-[1.75rem] bg-[#f7f2ff] p-6">
              <p className="text-sm uppercase tracking-[0.22em] text-[#7210EA]">Tendance</p>
              <p className="mt-3 text-2xl font-semibold text-[#18131d]">28% d’engagement en plus</p>
            </div>
            <div className="rounded-[1.75rem] bg-[#f7f2ff] p-6">
              <p className="text-sm uppercase tracking-[0.22em] text-[#7210EA]">Conversion</p>
              <p className="mt-3 text-2xl font-semibold text-[#18131d]">+14% de réservations</p>
            </div>
            <div className="rounded-[1.75rem] bg-[#f7f2ff] p-6">
              <p className="text-sm uppercase tracking-[0.22em] text-[#7210EA]">Messages</p>
              <p className="mt-3 text-2xl font-semibold text-[#18131d]">12 demandes en attente</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

export default Dashboard
