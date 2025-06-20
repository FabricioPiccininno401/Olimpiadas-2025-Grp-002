import { Link, useNavigate, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { useState, useMemo } from "react";
import { useCarrito } from "../context/CarritoContext";
import { useAuth } from "../context/AuthContext";
import "../Header.css";
import logo from "../assets/logo.png";

export default function Header() {
  const [menuAbierto, setMenuAbierto] = useState(false);
  const { carrito } = useCarrito();
  const { usuario, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const toggleMenu = () => {
    setMenuAbierto(!menuAbierto);
  };

  const cantidadItems = carrito.length;

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const isAuthPage = useMemo(() => {
    return ["/login", "/registro", "/perfil"].includes(location.pathname);
  }, [location.pathname]);

  return (
    <header className={`header-container ${isAuthPage ? "static-header" : "fixed-header"}`}>
      <div className="header-content">
        <div className="header-logo">
          <Link to="/">
            <img src={logo} alt="Agencia de Viajes Logo" className="logo-image" />
          </Link>
        </div>

        <div className="separar">
          <nav className="header-nav-desktop">
            <Link to="/" className="header-link"><b>Inicio</b></Link>
            <Link to="/destinos" className="header-link"><b>Destinos</b></Link>
            <Link to="/carrito" className="header-link">
              <b>Carrito</b> {cantidadItems > 0 && `(${cantidadItems})`}
            </Link>
            <Link to="/pendientes" className="header-link pendientes"><b>Pendientes</b></Link>
          </nav>
        </div>

        <div className="acceder-menu">
          {usuario ? (
            <>
              <Link to="/perfil" className="btn-login">
                <div className="icon-container">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path d="M5.121 17.804A10.001 10.001 0 0012 22a10.001 10.001 0 006.879-4.196M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
              </Link>
            </>
          ) : (
            <Link to="/login" className="btn-login">
              <div className="icon-container">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                  <path d="M5.121 17.804A10.001 10.001 0 0012 22a10.001 10.001 0 006.879-4.196M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <span>Acceder</span>
            </Link>
          )}
          <button className="header-menu-button" onClick={toggleMenu}>
            {menuAbierto ? <X size={32} /> : <Menu size={32} />}
          </button>
        </div>
      </div>

      {menuAbierto && (
        <nav className="header-nav-mobile">
          <ul className="header-nav-mobile-list">
            <li><Link to="/" className="header-link">Inicio</Link></li>
            <li><Link to="/destinos" className="header-link">Destinos</Link></li>
            <li><Link to="/pendientes" className="header-link">Pendientes</Link></li>
            <li><Link to="/carrito" className="header-link">Carrito {cantidadItems > 0 && `(${cantidadItems})`}</Link></li>
            {usuario ? (
              <>
                <li><Link to="/perfil" className="header-link">Perfil</Link></li>
                <li>
                  <button onClick={handleLogout} className="header-link btn-logout-mobile">Salir</button>
                </li>
              </>
            ) : (
              <li><Link to="/login" className="header-link">Login</Link></li>
            )}
          </ul>
        </nav>
      )}
    </header>
  );
}
