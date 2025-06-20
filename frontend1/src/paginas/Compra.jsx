import { useState } from "react";
import "../Compra.css";  // Importante importar el CSS global

export default function Compra({ paquete }) {
  const [medioPago, setMedioPago] = useState("tarjeta");
  const usuario = JSON.parse(localStorage.getItem("user"));

  const handleConfirmar = () => {
    if (!usuario) {
      alert("Debes iniciar sesión para comprar");
      return;
    }

    // Enviar a backend (axios/fetch)
    console.log("Usuario:", usuario.email);
    console.log("Compra:", paquete, medioPago);
    alert("Compra realizada");
  };

  return (
    <div className="container">
      <h2 className="title">Compra de: {paquete.nombre}</h2>

      <p className="price">
        Precio: <span>${paquete.precio}</span>
      </p>

      <div className="form-group">
        <label>Medio de pago:</label>
        <select
          value={medioPago}
          onChange={(e) => setMedioPago(e.target.value)}
        >
          <option value="tarjeta">Tarjeta de crédito</option>
          <option value="debito">Tarjeta de débito</option>
          <option value="transferencia">Transferencia</option>
          <option value="mercadopago">Mercado Pago</option>
        </select>
      </div>

      <button onClick={handleConfirmar} className="button">
        Confirmar compra
      </button>
    </div>
  );
}
