function OAuth() {
  const handleSignIn = () => {
    window.location.href = '/dashboard'
  }

  return (
    <main className="bg-[#f9f7ff] min-h-screen px-5 py-20 sm:px-8 lg:px-10 text-[#18131d]">
      <div className="mx-auto max-w-4xl rounded-[2rem] border border-zinc-200 bg-white p-10 shadow-xl">
        <div className="mb-10 space-y-3">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#7210EA]">Connexion</p>
          <h1 className="text-4xl font-extrabold sm:text-5xl">Connexion avec Google OAuth</h1>
          <p className="max-w-2xl text-base leading-7 text-zinc-600">Authentifiez-vous avec votre compte Google pour accéder à votre espace sécurisé TADIAVO-EO.</p>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1.1fr_.9fr]">
          <div className="space-y-6 rounded-[2rem] bg-[#fbf7ff] p-8">
            <div className="rounded-[1.5rem] border border-[#e8dfff] bg-white p-6 shadow-sm">
              <h2 className="text-xl font-semibold text-[#18131d]">Pourquoi Google OAuth ?</h2>
              <p className="mt-3 text-sm leading-7 text-zinc-600">Une connexion rapide, sécurisée et sans mot de passe supplémentaire pour vos comptes clients et prestataires.</p>
            </div>
            <div className="grid gap-4">
              {[
                { title: 'Sécurité', description: 'Authentification sécurisée avec la technologie Google.' },
                { title: 'Rapidité', description: 'Connexion instantanée en un seul clic.' },
                { title: 'Sérénité', description: 'Moins de friction et une expérience utilisateur fluide.' },
              ].map((item) => (
                <div key={item.title} className="rounded-[1.5rem] border border-zinc-200 bg-white p-5">
                  <h3 className="font-semibold text-[#18131d]">{item.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-zinc-600">{item.description}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[2rem] bg-[#fff] p-8 shadow-xl">
            <div className="space-y-4">
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#7210EA]">Accès rapide</p>
              <div className="rounded-[1.75rem] border border-zinc-200 bg-[#f6f1ff] p-6">
                <p className="text-sm font-semibold text-[#18131d]">Se connecter avec Google</p>
                <p className="mt-3 text-sm leading-7 text-zinc-600">Redirection vers Google pour autorisation et sécurisation de votre session.</p>
                <button onClick={handleSignIn} className="mt-6 w-full rounded-full bg-[#7210EA] px-6 py-4 text-sm font-semibold text-white transition hover:bg-[#5609b5]">
                  Se connecter avec Google
                </button>
              </div>
            </div>

            <div className="mt-10 grid gap-4 rounded-[1.75rem] border border-zinc-200 bg-[#fbf7ff] p-6">
              <div>
                <p className="text-sm font-semibold text-[#18131d]">Étape 1</p>
                <p className="mt-2 text-sm text-zinc-600">Cliquez sur le bouton Google.</p>
              </div>
              <div>
                <p className="text-sm font-semibold text-[#18131d]">Étape 2</p>
                <p className="mt-2 text-sm text-zinc-600">Autorisez l’accès à votre compte.</p>
              </div>
              <div>
                <p className="text-sm font-semibold text-[#18131d]">Étape 3</p>
                <p className="mt-2 text-sm text-zinc-600">Accédez à votre tableau de bord personnalisé.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

export default OAuth
