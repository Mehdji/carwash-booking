import logo from '../../assets/Logo_no_Bg.png'; // Adjust the path to your logo file

const footer = ()=> {
    return(
        <div>
            <div id="footer" className="flex flex-col items-center my-5 gap-1 bg-footer">
            <img className="h-20 w-auto object-contain" src={logo} alt="logo" />
            <a href="#formules" className="scroll-smooth">
                <p className="text-text-gray-seventy">Tarifs</p>
            </a>
            <a href="#services" className="scroll-smooth">
                <p className="text-text-gray-seventy">Services</p>
            </a>
            <a href="#pourquoi" className="scroll-smooth">
                <p className="text-text-gray-seventy">Pourquoi nous choisir</p>
            </a>
            <a href="#footer" className="scroll-smooth">
                <p className="text-text-gray-seventy">Contacts</p>
            </a>
            <p className="text-text-gray-seventy">Créer un compte</p>
            <p className="text-text-gray-seventy">Se connecter</p>
            <p className="text-text-gray-sixtyfive">07 65 62 16 98</p>
            <p className="text-text-gray-sixtyfive">auto95clean@hotmail.com</p>
            <p className="text-text-gray-sixtyfive">88 rue Michel Carré, 95100 Argenteuil</p>
            <p className="text-text-gray-sixtyfive">© 2025 AUTO 95 CLEAN — Tous droits réservés.</p>
            </div>
        </div>
    );
}

export default footer;
