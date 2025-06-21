import React, { useState, useEffect } from "react";
import { useCarrito } from "../context/CarritoContext";
import { useAuth } from "../context/AuthContext";
import FiltrosModal from "../paginas/FiltrosModal";
import Footer from "../paginas/Footer"; // ✅ IMPORTACIÓN DEL FOOTER
import "../Destinos.css";

export default function Destinos() {
  const [mostrarFiltros, setMostrarFiltros] = useState(false);
  const [destinos, setDestinos] = useState([]);
  const [filtros, setFiltros] = useState({});
  const [estadoBoton, setEstadoBoton] = useState({});
  const [usuario, setUsuario] = useState(null);
  const [nuevoDestino, setNuevoDestino] = useState({
    nombre: "",
    duracion: "",
    precioOriginal: 0,
    precio: 0,
    ahorro: 0,
    paquete: "PAQUETE",
    salida: "Saliendo desde Buenos Aires",
    combo: "Hotel + Vuelo",
    imagen: "",
    rating: 0,
    estrellas: 0,
  });

  const { agregarAlCarrito } = useCarrito();
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) return;
    fetch("http://localhost:3001/api/usuario", {
      method: "GET",
      headers: { Authorization: token },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Token inválido");
        return res.json();
      })
      .then((data) => setUsuario(data))
      .catch((err) => console.error("Error al obtener usuario:", err));
  }, []);

  useEffect(() => {
    fetch("http://localhost:3001/api/servicios")
      .then((res) => res.json())
      .then((data) => setDestinos(data))
      .catch((err) => console.error("Error al cargar servicios:", err));
  }, []);

  const manejarClick = (destino) => {
    setEstadoBoton((prev) => ({ ...prev, [destino.id]: "agregando" }));
    fetch("http://localhost:3001/api/carrito", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify({ id_Producto: destino.id }),
    })
      .then(() => {
        setEstadoBoton((prev) => ({ ...prev, [destino.id]: "agregado" }));
        setTimeout(() => {
          setEstadoBoton((prev) => ({ ...prev, [destino.id]: "normal" }));
        }, 1200);
      })
      .catch((err) => {
        console.error("Error al agregar al carrito:", err);
        setEstadoBoton((prev) => ({ ...prev, [destino.id]: "normal" }));
      });
  };

  const buscarVuelos = (filtrosAplicados) => {
    let resultados = destinos.filter((d) => {
      return (
        (!filtrosAplicados.precioMin || d.precio >= parseInt(filtrosAplicados.precioMin)) &&
        (!filtrosAplicados.precioMax || d.precio <= parseInt(filtrosAplicados.precioMax)) &&
        (!filtrosAplicados.estrellas || d.estrellas === parseInt(filtrosAplicados.estrellas)) &&
        (!filtrosAplicados.diasNoches || d.duracion === filtrosAplicados.diasNoches)
      );
    });
    setDestinos(resultados);
  };

  const handleAgregarDestino = (e) => {
    e.preventDefault();
    fetch("http://localhost:3001/api/agregar_destino", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify(nuevoDestino),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.ok) {
          alert("Destino agregado exitosamente");
          setDestinos((prev) => [...prev, data.nuevoDestino]);
          setNuevoDestino({
            nombre: "",
            duracion: "",
            precioOriginal: 0,
            precio: 0,
            imagen: "",
            rating: 0,
            estrellas: 0,
          });
        } else alert("Error al agregar destino");
      })
      .catch((err) => console.error("Error al agregar destino:", err));
  };

  return (
    <div className="destinos-container">
      <h1 className="destinos-titulo">Ofertas en paquetes turísticos para los mejores destinos</h1>
      <div className="caja-filtrar">
        <button onClick={() => setMostrarFiltros(true)} className="btn-filtrar">
          <span className="icono">🔍</span> Filtrar
        </button>
      </div>

      {mostrarFiltros && (
        <FiltrosModal
          filtros={filtros}
          setFiltros={setFiltros}
          onClose={() => setMostrarFiltros(false)}
          onBuscar={buscarVuelos}
        />
      )}

      {usuario?.rol === "admin" && (
        <form onSubmit={handleAgregarDestino} className="form-admin-destinos">
          <h2>Agregar nuevo destino</h2>
          <label className="destinos-admin-label">Nombre del paquete:</label>
          <input
            name="nombre"
            className="destinos-admin-input"
            placeholder="Ej: Paquetes a Salta"
            value={nuevoDestino.nombre}
            onChange={e => setNuevoDestino({ ...nuevoDestino, nombre: e.target.value })}
            required
          />
          <label className="destinos-admin-label">Duracion Días/Noches:</label>
          <input
            name="duracion"
            className="destinos-admin-input"
            placeholder="Ej: 7 Días/6 Noches"
            value={nuevoDestino.duracion}
            onChange={e => setNuevoDestino({ ...nuevoDestino, duracion: e.target.value })}
            required
          />
          <label className="destinos-admin-label">Precio original:</label>
          <input
            name="precioOriginal"
            className="destinos-admin-input"
            type="number"
            placeholder="ej: 100000 sin puntos"
            value={nuevoDestino.precioOriginal}
            onChange={e => setNuevoDestino({ ...nuevoDestino, precioOriginal: parseInt(e.target.value) })}
            required
          />
          <label className="destinos-admin-label">Precio final:</label>
          <input
            name="precio"
            className="destinos-admin-input"
            type="number"
            placeholder="Ej: 90000 sin puntos"
            value={nuevoDestino.precio}
            onChange={e => setNuevoDestino({ ...nuevoDestino, precio: parseInt(e.target.value) })}
            required
          />
          <label className="destinos-admin-label">URL de la imagen:</label>
          <input
            name="imagen"
            className="destinos-admin-input"
            placeholder="URL de la imagen"
            value={nuevoDestino.imagen}
            onChange={e => setNuevoDestino({ ...nuevoDestino, imagen: e.target.value })}
          />
          <label className="destinos-admin-label">Calificación:</label>
          <input
            name="rating"
            className="destinos-admin-input"
            type="number"
            placeholder="Ej: 8.7"
            step="0.1"
            value={nuevoDestino.rating}
            onChange={e => setNuevoDestino({ ...nuevoDestino, rating: parseFloat(e.target.value) })}
          />
          <label className="destinos-admin-label">Estrellas:</label>
          <input
            name="estrellas"
            className="destinos-admin-input"
            type="number"
            placeholder="Ej: 4"
            value={nuevoDestino.estrellas}
            onChange={e => setNuevoDestino({ ...nuevoDestino, estrellas: parseInt(e.target.value) })}
          />
          <button type="submit" className="destinos-admin-button">Agregar destino</button>
        </form>
      )}

      <div className="packages-grid">
        {destinos.map((destino) => (
          <div key={destino.id} className="package-card">
            <img src={destino.imagen} alt={destino.nombre} className="package-img" />
            <div className="package-info">
              <span className="package-duration">{destino.duracion}</span>
              <p className="paquete">{destino.paquete}</p>
              <h2>{destino.nombre}</h2>
              <div className="package-rating">
                <span className="rating-number">{destino.rating}</span>
                <div className="stars">
                  {Array.from({ length: destino.estrellas }).map((_, i) => <span key={i}>⭐</span>)}
                </div>
              </div>
              <div className="combo-salida">
                <p className="salida">{destino.salida}</p>
                <p className="combo">{destino.combo}</p>
              </div>
              <div className="save-container">
                <div className="save-badge">Ahorra ${destino.ahorro}</div>
                <hr className="divider-line" />
              </div>
              <div className="package-prices">
                <span className="price-original">${destino.precioOriginal}</span>
                <span className="price-final">${destino.precio}</span>
              </div>
              {usuario?.rol === 'cliente' && (
                <button
                  onClick={() => manejarClick(destino)}
                  className={`btn-agregar ${estadoBoton[destino.id]}`}
                  disabled={["agregando", "agregado"].includes(estadoBoton[destino.id])}
                >
                  {estadoBoton[destino.id] === "agregando" ? "⏳ Agregando..." : estadoBoton[destino.id] === "agregado" ? "✅ Vuelo agregado" : "Reservar este vuelo 🛒"}
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {destinos.length === 0 && (
        <p className="sin-resultados">No hay resultados para los filtros aplicados.</p>
      )}

     
    </div>
  );
}
