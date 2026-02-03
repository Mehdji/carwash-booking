/*
Mehdi NAOUI 
Navbar.tsx
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
                        <a className ="text-blue-text font-display hover:text-blue-text-hover transition-transform hover:scale-125 " href ="">Services</a>
                        <a className ="text-blue-text font-display hover:text-blue-text-hover transition-transform hover:scale-125" href ="">Formules&Tarifs</a>
                        <a className ="text-blue-text font-display hover:text-blue-text-hover transition-transform hover:scale-125" href ="">Pourquoi nous choisir?</a>
                        <a className ="text-blue-text font-display hover:text-blue-text-hover transition-transform hover:scale-125" href ="">Se connecter</a>
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;