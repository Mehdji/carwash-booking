
import Navbar from "./components/navbar/navbar";
import Hero from "./components/hero/hero";
import Services from "./components/services/services";
import Formules from "./components/formules/formules";
import Pourquoi from "./components/pourquoi/pourquoi";
import Footer from "./components/footer/footer";
import Cta from "./components/cta/cta";



export default function App() {
  

  return(
    <div >
      <Navbar/>
      <Hero/>
      <Services/>
      <Formules/>
      <Pourquoi/>
      <Cta/>
      <Footer/>
      
      
      
    </div>
  );
}