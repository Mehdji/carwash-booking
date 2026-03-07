const Login = () => {
  return (
    <section id="login" className="mx-auto w-full max-w-6xl px-5 py-16 scroll-mt-32">
      <div className="grid w-full overflow-hidden rounded-2xl border border-white/10 bg-card shadow-2xl shadow-black/50 md:grid-cols-2">
        <div className="hidden bg-gradient-to-b from-antracite to-black-service p-10 text-left md:block">
          <p className="font-display text-sm uppercase tracking-[0.2em] text-blue-text">
            Auto 95 Clean
          </p>
          <h2 className="mt-5 font-display text-4xl font-bold text-white">
            Connectez-vous a votre espace client.
          </h2>
          <p className="mt-4 text-lg text-text-gray-seventy">
            Retrouvez vos reservations, vos formules et vos prochains
            rendez-vous en un clic.
          </p>
        </div>

        <div className="bg-antracite p-8 text-left sm:p-10">
          <h3 className="font-display text-3xl font-semibold text-white">
            Se connecter
          </h3>
          <p className="mt-2 text-sm text-text-gray-seventy">
            Renseignez vos identifiants pour continuer.
          </p>

          <form
            className="mt-8 space-y-5"
            onSubmit={(event) => event.preventDefault()}
          >
            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-sm text-text-gray-seventy"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                placeholder="email@exemple.com"
                className="w-full rounded-lg border border-white/15 bg-black-service px-4 py-3 text-white outline-none transition focus:border-blue-text"
                required
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="mb-2 block text-sm text-text-gray-seventy"
              >
                Mot de passe
              </label>
              <input
                id="password"
                type="password"
                placeholder="********"
                className="w-full rounded-lg border border-white/15 bg-black-service px-4 py-3 text-white outline-none transition focus:border-blue-text"
                required
              />
            </div>

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 text-text-gray-seventy">
                <input type="checkbox" className="accent-blue-text" />
                Se souvenir de moi
              </label>
              <a href="#" className="text-blue-text hover:text-blue-text-hover">
                Mot de passe oublie ?
              </a>
            </div>

            <button
              type="submit"
              className="w-full cursor-pointer rounded-lg bg-blue-text py-3 font-display text-lg text-white transition hover:bg-blue-text-hover"
            >
              Connexion
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Login;
