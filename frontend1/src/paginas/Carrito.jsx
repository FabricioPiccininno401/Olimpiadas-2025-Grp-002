import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import "../Carrito.css";

export default function Carrito() {
  const [carrito, setCarrito] = useState([]);
  const token = localStorage.getItem("token");
  const [usuario, setUsuario]=useState(null)
  const [estadoCompra, setEstadoCompra] = useState("normal");
  const navigate = useNavigate();
  //Define rol de usuario.
  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }
  
    fetch("http://localhost:3001/api/usuario", {
      method: "GET",
      headers: {
        Authorization: token,
      },
    })
      .then(res => {
        if (!res.ok) throw new Error("Token inválido");
        return res.json();
      })
      .then(data => {
        setUsuario(data);
      })
      .catch(err => {
        console.error("Error al obtener datos del usuario:", err);
        navigate("/login"); // Redirige si falla
      });
    }, []);

  //Carga el carrito en la web
 useEffect(() => {
  if (usuario && usuario.rol !== "admin") {
    console.log("Carrito desde front");
    fetch(`http://localhost:3001/api/carrito_lista`, {
      method: "GET",
      headers: {
        Authorization: token,
      },
    })
      .then((res) => res.json())
      .then((data) => setCarrito(data))
      .catch((error) => console.error("Error al obtener carrito:", error));
  }
}, [usuario]);

  //Elimina mediante id el item del carrito
  const eliminarDelCarrito = (id_Producto) => {
    
    console.log("Fetch front activado/Eliminar")
    fetch("http://localhost:3001/api/eliminar", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify({ id_Producto }),
    })
      .then(res => res.json())
      .then((data) => {
         if (data.ok) {
        // Acá actualizás el estado para quitar el elemento borrado
        setCarrito((prev) => prev.filter(item => item.id !== id_Producto));
      }
      })
      .catch(err => {
        console.error("Error al agregar al carrito:", err);
        setEstadoBoton(prev => ({ ...prev, [id_Producto]: "normal" }));
      });
  };
 //Vacia la lista y envia todo a pendiente
  const comprar = () => {
    
    console.log("Fetch front activado/Comprar")
    fetch("http://localhost:3001/api/comprar", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify({}),
    })
      .then(res => res.json())
      .then((data) => {
         if (data.ok) {
        // Acá actualizás el estado para quitar el elemento borrado
        setCarrito([]);
      }
      })
      .catch(err => {
        console.error("Error al agregar al carrito:", err);
      });
  };

  

  const total = carrito.reduce((acc, item) => acc + item.precio * item.cantidad, 0);
  const totalOriginal = carrito.reduce((acc, item) => acc + item.precioOriginal * item.cantidad, 0);
  const totalAhorro = totalOriginal - total;
  
  

  const renderTextoBoton = () => {
    if (estadoCompra === "procesando") {
      return (
        <>
          ⏳ Iniciando compra...
        </>
      );
    }
    return "Iniciar Compra";
  };

  return (
    <div className="carrito-container">
      <h1 className="carrito-title">🛒 Mi Carrito de Compras</h1>
    
      {carrito.length === 0 ? (
        <div className="carrito-empty">
          <p>Tu carrito está vacío. ¡Explora nuestros destinos y agregá tus favoritos!</p>
        </div>
      ) : (
        <div className="carrito-content">
          {carrito.map((item) => (
            <div className="carrito-card" key={item.id}>
              <img src={item.imagen} alt={item.nombre} className="carrito-imagen" />

              <div className="carrito-info">
                <h2>{item.nombre} <span className="cantidad">X{item.cantidad}</span></h2>

                <div className="detalles">
                  <div>{item.paquete}</div>
                  <div>{item.salida}</div>
                  <div>{item.combo}</div>
                  <div>{item.duracion}</div>
                </div>

                <div className="rating-stars">
                  <div className="rating-box">{item.rating}</div>
                  <div className="stars">
                    {Array.from({ length: item.estrellas }).map((_, index) => (
                      <span key={index}>⭐</span>
                    ))}
                  </div>
                </div>

                <div className="precio-container">
                  <div className="descuento-box">Save ${(item.ahorro * item.cantidad).toLocaleString()}</div>
                  <div className="precios-impuestos">
                    <div className="precios">
                      <p className="precio-original">
                        ${(item.precioOriginal * item.cantidad).toLocaleString()}
                      </p>
                      <p className="precio-final">
                        ${(item.precio * item.cantidad).toLocaleString()}
                      </p>
                    </div>
                    <p className="impuestosC">Incluye impuestos, tasas y cargos</p>
                  </div>
                </div>

                <div className="contenedor-eliminar">
                  <button onClick={() => eliminarDelCarrito(item.id)} className="btn-eliminar">
                    Quitar ❌
                  </button>
                </div>
              </div>
            </div>
          ))}

          <div className="carrito-total">
            <div className="resumen-compra">
              <h3>Resumen de compra:</h3>
            </div>

            <div className="iniciar-compra">
              <button 
                onClick={comprar} 
                className={`btn-compra ${estadoCompra === "procesando" ? "desactivado" : ""}`}
                disabled={estadoCompra === "procesando"}
              >
                {renderTextoBoton()}
              </button>
            </div>

            <div className="totales">
              <p>Precio original: <strong>${totalOriginal.toLocaleString()}</strong></p>
              <p>Descuento total: <strong>-${totalAhorro.toLocaleString()}</strong></p>
              <p className="total-pagar">Total a pagar: <strong>${total.toLocaleString()}</strong></p>
            </div>

          </div>
        </div>
      )}
    </div>
  );
}
