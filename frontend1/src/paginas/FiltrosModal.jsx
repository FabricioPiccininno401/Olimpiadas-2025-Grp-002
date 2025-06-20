import React, { useState } from "react";
import "../FiltrosModal.css";

export default function FiltrosModal({ filtros, setFiltros, onClose, onBuscar }) {
  const [vista, setVista] = useState("inicio");
  const [precioMin, setPrecioMin] = useState(filtros.precioMin || "");
  const [precioMax, setPrecioMax] = useState(filtros.precioMax || "");
  const [estrellas, setEstrellas] = useState(filtros.estrellas || "");
  const [diasNoches, setDiasNoches] = useState(filtros.diasNoches || "");

  const aplicarFiltros = () => {
    const nuevosFiltros = {
      precioMin,
      precioMax,
      estrellas,
      diasNoches,
    };

    setFiltros(nuevosFiltros);
    onClose();
    onBuscar(nuevosFiltros);
  };

  const restablecerFiltros = () => {
    setPrecioMin("");
    setPrecioMax("");
    setEstrellas("");
    setDiasNoches("");
    setFiltros({});
    if (onBuscar) onBuscar();
    onClose();
  };

  const opcionesDiasNoches = Array.from({ length: 14 }, (_, i) => {
    const dias = i + 1;
    const noches = i;
    return `${dias} DÍA${dias > 1 ? "S" : ""} / ${noches} NOCHE${noches !== 1 ? "S" : ""}`;
  });

  return (
    <div className="modal-filtros-overlay">

      <div className="modal-filtros">

        {vista === "inicio" && (
          <div className="filtros-content">
            <div className="principal">
              <button className="btn-cerrar" onClick={onClose}>⬅️</button>
              <h2>Filtrar paquetes</h2>
              <button className="btn-restablecer" onClick={restablecerFiltros}>Restablecer Todo</button>
            </div>
            <div className="botones-main">

              <div className="btn-style primero">
                <button onClick={() => setVista("precio")} className="filtro-btn">Precio</button>
                <span className="span">⬅️</span>
              </div>
              <div className="btn-style segundo">
                <button onClick={() => setVista("estrellas")} className="filtro-btn">Estrellas</button>
                <span className="span">⬅️</span>
              </div>
              <div className="btn-style tercero">
                <button onClick={() => setVista("dias")} className="filtro-btn">Días/Noches</button>
                <span className="span">⬅️</span>
              </div>

            </div>
            <div className="acciones-filtros">
              <button className="btn-aplicar" onClick={aplicarFiltros}>Aplicar</button>
            </div>
          </div>
        )}

        {vista === "precio" && (
          <div className="filtro-detalle">
            <div className="volver-precio">
              <button className="btn-volver" onClick={() => setVista("inicio")}>← Volver</button>
              <h3 className="h3-precio">Filtrar por Precio</h3>
            </div>
            <input
              type="number"
              placeholder="Precio mínimo"
              value={precioMin}
              onChange={(e) => setPrecioMin(e.target.value)}
            />
            <input
              type="number"
              placeholder="Precio máximo"
              value={precioMax}
              onChange={(e) => setPrecioMax(e.target.value)}
            />
          </div>
        )}

        {vista === "estrellas" && (
          <div className="filtro-detalle">
            <div className="volver-precio">
              <button className="btn-volver" onClick={() => setVista("inicio")}>← Volver</button>
              <h3 className="h3-precio">Filtrar por Estrellas</h3>
            </div>
            <select value={estrellas} onChange={(e) => setEstrellas(e.target.value)}>
              <option value="">Seleccionar</option>
              <option value="1">★</option>
              <option value="2">★★</option>
              <option value="3">★★★</option>
              <option value="4">★★★★</option>
              <option value="5">★★★★★</option>
            </select>
          </div>
        )}

        {vista === "dias" && (
          <div className="filtro-detalle">
            <div className="volver-precio">
              <button className="btn-volver" onClick={() => setVista("inicio")}>← Volver</button>
              <h3 className="h3-precio">Filtrar por Días/Noches</h3>
            </div>
            <select value={diasNoches} onChange={(e) => setDiasNoches(e.target.value)}>
              <option value="">Seleccionar</option>
              {opcionesDiasNoches.map((op, idx) => (
                <option key={idx} value={op}>{op}</option>
              ))}
            </select>
          </div>
        )}
      </div>
    </div>
  );
}
