import { Link } from "react-router-dom";
import Footer from "../paginas/Footer"; // ✅ IMPORTACIÓN DEL FOOTER
import "../Home.css";

import portada from "../assets/imgBRC.jpg";
import destinosImg from "../assets/imgMENDOZA.jpg";
import beneficiosImg from "../assets/imgIGUAZU.jpg";
import contactoImg from "../assets/imgSALTA.jpeg";

export default function Home() {
  return (
    <div className="home-container">
      {/* HERO */}
      <section className="hero-section">
        <img src={portada} alt="Portada" className="hero-img" />
        <div className="hero-overlay animate-fadein">
          <h1>
            Descubrí el mundo con <span>Viajando Juntos</span>
          </h1>
          <p>Ofertas exclusivas en paquetes a los mejores destinos</p>
          <Link to="/destinos" className="btn-explorar">Explorar Destinos</Link>
        </div>
      </section>

      {/* DESTACADOS */}
      <section className="section">
        <div className="section-content animate-up">
          <img src={destinosImg} alt="Destinos" className="section-img hover-zoom" />
          <div>
            <h2>Paquetes destacados</h2>
            <p>
              Descubrí nuestras ofertas más buscadas, ideales para escapadas románticas, vacaciones en familia o aventuras con amigos. Aprovechá las promociones exclusivas y reserva ahora.
            </p>
            <Link to="/destinos" className="btn-ver-mas">Ver paquetes</Link>
          </div>
        </div>
      </section>

      {/* BENEFICIOS */}
      <section className="section reverse">
        <div className="section-content animate-up">
          <img src={beneficiosImg} alt="Beneficios" className="section-img hover-zoom" />
          <div>
            <h2>¿Por qué elegirnos?</h2>
            <ul>
              <li>✔️ Atención personalizada</li>
              <li>✔️ Precios bajos y financiación</li>
              <li>✔️ Opiniones reales de clientes</li>
              <li>✔️ +10 años de experiencia</li>
              <li>✔️ Asistencia 24/7 durante tu viaje</li>
            </ul>
          </div>
        </div>
      </section>

      {/* CONTACTO */}
      <section className="section">
        <div className="section-content animate-up">
          <img src={contactoImg} alt="Contacto" className="section-img hover-zoom" />
          <div>
            <h2>¿Tenés dudas?</h2>
            <p>Contactanos por WhatsApp, correo o completando nuestro formulario. ¡Estamos para ayudarte en todo momento!</p>
            <Link to="/contacto" className="btn-contacto">Contactar</Link>
          </div>
        </div>
      </section>

      
    </div>
  );
}
