const cta = ()=>{
    return(
        <div>
            <div className="container_cta flex flex-col items-center bg-linear-to-b from-[#0E0E0E] to-[#0E0E0E]/85  justify-center gap-20 w-full h-screen text-center ">
      <h1 id="hero" className="text-5xl font-bold font-display  text-white text-center">
         Prêt à redonner éclat à votre véhicule ?
      </h1>
      <h2 className="text-2xl mt-5  font-display text-stone-400 text-center">
         Réservez votre lavage en quelques clics, nous nous occupons du reste.
      </h2>
      <button className="mt-10 cursor-pointer bg-blue-text hover:bg-blue-700 text-white shadow-[0_0_70px_rgba(0,159,227)] hover:shadow-[0_0_40px_rgba(0,159,227)] font-display text-1xl py-2 px-4 rounded transition-all  hover:scale-125 ">
          Prendre un rendez-vous
      </button>
    </div>
        </div>
    );
}

export default cta;