import { useLocation, useNavigate } from "react-router-dom";
import '@fortawesome/fontawesome-free/css/all.min.css';
import "../Footer.css";
import logo from "../assets/logo.png";

export default function Footer() {
  const location = useLocation();
  const navigate = useNavigate();
  const isVisible = location.pathname === "/" || location.pathname === "/destinos";

  if (!isVisible) return null;

  const handleInicioClick = () => {
    if (location.pathname !== "/") {
      navigate("/");
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleDestinosClick = () => {
    if (location.pathname !== "/destinos") {
      navigate("/destinos");
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Columna 1: Logo + descripción */}
        <div className="footer-col">
          <img src={logo} alt="Logo" className="footer-logo" />
          <p>Tu agencia de viajes de confianza para explorar el mundo con tranquilidad y emoción.</p>
        </div>

        {/* Columna 2: Enlaces rápidos */}
        <div className="footer-col">
          <h4>Enlaces rápidos</h4>
          <ul>
            <li><button onClick={handleInicioClick} style={{ background: "none", border: "none", padding: 0, color: "white", cursor: "pointer" }}>Inicio</button></li>
            <li><button onClick={handleDestinosClick} style={{ background: "none", border: "none", padding: 0, color: "white", cursor: "pointer" }}>Destinos</button></li>
            <li><button style={{ background: "none", border: "none", padding: 0, color: "white", cursor: "pointer" }}>Contacto</button></li>
            <li><a href="/login">Acceder</a></li>
          </ul>
        </div>

        {/* Columna 3: Contacto */}
        <div className="footer-col">
          <h4>Contacto</h4>
          <p>Email: info@viajandojuntos.com</p>
          <p>Tel: +54 9 11 1234 5678</p>
          <p>Buenos Aires, Argentina</p>
        </div>

        {/* Columna 4: Redes Sociales */}
        <div className="footer-col">
          <h4>Seguinos en</h4>
          <div className="footer-socials">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-facebook-f"></i>
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-instagram"></i>
            </a>
            <a href="https://wa.me/5491123456789" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-whatsapp"></i>
            </a>
          </div>

        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} Viajando Juntos. Todos los derechos reservados.</p>
      </div>
    </footer>
  );
}