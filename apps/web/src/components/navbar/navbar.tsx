/*
 * Mehdi NAOUI 
 * Navbar.tsx
 * Auto95Clean - Composant de navigation principale
 * Navbar fixe avec logo, liens de navigation et effets hover
 * SaaS de réservation et paiement pour lavage auto
 */

/**
 * @component Navbar - Barre de navigation principale
 * @description Navbar fixe avec logo et liens de navigation
 * @returns {JSX.Element} Element de navigation fixe
 */

import logo from "../../assets/Logo_no_Bg.png";

const Navbar = ()=>{

    return(
        <nav className="fixed top-0 left-0 right-0 z-50 bg-antracite">
            <div className="relative px-5 h-20 flex flex-row justify-items-start gap-12
  after:pointer-events-none after:absolute after:inset-x-0 after:bottom-0 after:h-px after:bg-white/10">
                <div className="navbar-left">
                    <a href="/" className="logo">
                        <img className="h-20 w-auto object-contain" src={logo} alt="logo" />
                    </a>
                </div>
            
                <div className="navbar-center w-full ">
                    <ul className ="nav-links h-20  flex items-center justify-around space-x-10 gap-5 ">
                        <a className ="text-blue-text font-display hover:text-blue-text-hover text-2xl transition-transform hover:scale-125 scroll-smooth " href ="#services">Services</a>
                        <a className ="text-blue-text font-display hover:text-blue-text-hover text-2xl transition-transform hover:scale-125" href ="">Formules&Tarifs</a>
                        <a className ="text-blue-text font-display hover:text-blue-text-hover text-2xl transition-transform hover:scale-125" href ="">Pourquoi nous choisir?</a>
                        <a className ="text-blue-text font-display hover:text-blue-text-hover text-2xl transition-transform hover:scale-125" href ="">Se connecter</a>
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;