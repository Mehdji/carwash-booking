import { type ChangeEvent, type FormEvent, useState } from "react";
import Footer from "../../components/footer/footer";
import { fetchLogin } from "../../api/auth.api";
import TextField from "../../components/textfield/textfield";



type LoginFormData = {
  email: string;
  password: string;
};




const Login = () => {



  const [formData, setFormData] = useState<LoginFormData>({
    email: "",
    password: "",
  });

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const response = await fetchLogin(formData);
    console.log(response);
  };

  return (
    <div className="relative left-1/2 min-h-screen w-screen -translate-x-1/2 bg-black-service text-white">
      <main className="flex justify-center px-5 pt-26 pb-16">
        <section id="login" className="mx-auto flex w-full max-w-xl flex-col items-center">


          <div className="text-center">
            <h1 className="font-display text-3xl font-bold text-white">Connexion</h1>
            <p className="mt-2 text-base text-text-gray-seventy">
              Connectez-vous pour gerer vos rendez-vous.
            </p>
          </div>


          <form
            className="mt-6 flex w-full max-w-sm flex-col gap-6 rounded-xl bg-card px-8 py-8 shadow-2xl shadow-black/40"
            onSubmit={handleSubmit}
          >
            <TextField
              id="email"
              name="email"
              label="Adresse email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="exemple@email.com"
              required
            />

            <TextField
              id="password"
              name="password"
              label="Mot de passe"
              type="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="************"
              required
            />

            <button
              type="submit"
              className="mt-1 w-full cursor-pointer rounded-lg bg-blue-text py-3 text-sm font-medium text-white transition hover:bg-blue-text-hover"
            >
              Se connecter
            </button>

            <div className="flex flex-col items-center gap-3 text-sm font-semibold text-text-gray-seventy">
              <a href="#" className="transition hover:text-blue-text">
                Mot de passe oublie?
              </a>
              <a href="#" className="transition hover:text-blue-text">
                Creer un compte.
              </a>
            </div>
          </form>
        </section>
      </main>

      <div className="flex justify-center">
        <Footer />
      </div>
    </div>
  );
};

export default Login;
