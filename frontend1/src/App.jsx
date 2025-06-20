import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom";
import Home from "./paginas/Home.jsx";
import Destinos from "./paginas/Destinos.jsx";
import Carrito from "./paginas/Carrito.jsx";
import Header from "./paginas/Header.jsx";
import CarritoInfo from "./paginas/CarritoInfo.jsx";
import Infraestructura from "./paginas/Infraestructura.jsx";
import EtapasFinales from "./paginas/EtapasFinales.jsx";
import Compra from "./paginas/Compra.jsx";
import Login from "./paginas/Login.jsx";
import Registro from "./paginas/Registro.jsx";
import Pendientes from "./paginas/Pendientes.jsx";   
import Perfil from "./paginas/Perfil.jsx";
import Footer from "./paginas/Footer.jsx"; // ✅ Nuevo import

import { CarritoProvider } from "./context/CarritoContext.jsx";
import { AuthProvider, useAuth } from "./context/AuthContext.jsx";
import { PendientesProvider } from "./context/PendientesContext.jsx";  

function RutaProtegida({ children }) {
  const { usuario, cargando } = useAuth();
  const token = localStorage.getItem('token');
  if (cargando) return <div className="text-center p-10">Cargando...</div>;
  if (!token) return <Navigate to="/login" replace />;
  return children;
}

// ✅ Footer solo en rutas permitidas
function AppContent() {
  const location = useLocation();
  const mostrarFooter = location.pathname === "/" || location.pathname === "/destinos";

  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/destinos" element={<Destinos />} />
        <Route
          path="/carrito"
          element={
            <RutaProtegida>
              <Carrito />
            </RutaProtegida>
          }
        />
        <Route
          path="/carrito-info"
          element={
            <RutaProtegida>
              <CarritoInfo />
            </RutaProtegida>
          }
        />
        <Route path="/infraestructura" element={<Infraestructura />} />
        <Route path="/etapas-finales" element={<EtapasFinales />} />
        <Route
          path="/compra"
          element={
            <RutaProtegida>
              <Compra />
            </RutaProtegida>
          }
        />
        <Route
          path="/pendientes"
          element={
            <RutaProtegida>
              <Pendientes />
            </RutaProtegida>
          }
        />
        <Route
          path="/perfil"
          element={
            <RutaProtegida>
              <Perfil />
            </RutaProtegida>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/registro" element={<Registro />} />
        <Route path="*" element={<div className="text-center p-10">Página no encontrada</div>} />
      </Routes>
      {mostrarFooter && <Footer />} {/* ✅ Solo en Home y Destinos */}
    </>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <CarritoProvider>
        <PendientesProvider>  
          <Router>
            <AppContent />
          </Router>
        </PendientesProvider>
      </CarritoProvider>
    </AuthProvider>
  );
}
