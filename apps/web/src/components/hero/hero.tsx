/**
 * @component Hero - Section principale d'accueil
 * @author Mehdi NAOUI
 * @description Composant hero avec image de fond, titre principal et bouton CTA
 * @project Auto95Clean - SaaS booking system and payment
 * @features Image de fond voiture de luxe, titre accrocheur, bouton de réservation
 * @returns {JSX.Element} Section hero avec overlay de texte sur image
 */

import hero_bkgnd_pict from "../../assets/u1484863334_ultra_realistic_black_luxury_car_in_dark_studio_l_f798993d-24ea-490d-af96-6f913a8d1c21_2.png";
import hero_bkgnd_pict_resize from "../../assets/u1484863334_ultra_realistic_black_luxury_car_in_dark_studio_l_f798993d-24ea-490d-af96-6f913a8d1c21_2_trimmed_enhanced_resolution_2.png";


const hero = ()=>{

    return(
        <div className="relative text-center">
            <img className="w-screen h-auto mask-b-from-70% mask-b-to-100% " src={hero_bkgnd_pict_resize}/>
            <div className="w-full absolute top-30 left-0 text-center mt-10">
      <h1 className="text-7xl font-bold font-display  text-white text-center">
         Réserver votre lavage auto en ligne
      </h1>
      <h2 className="text-3xl mt-5  font-display text-stone-400 text-center">
         Choisissez votre créneau, on s’occupe du reste.
      </h2>
      <button className="mt-10 cursor-pointer bg-blue-text hover:bg-blue-700 text-white font-display text-2xl py-2 px-4 rounded transition-transform hover:scale-125 ">
          Prendre un rendez-vous
      </button>
    </div>
        </div>
    );

}

export default hero;