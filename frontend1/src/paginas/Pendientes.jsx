
import "../Historial.css";
import { useState, useEffect } from "react";

export default function Pendientes() {
  const [busqueda, setBusqueda] = useState(""); // input
  const [resultado, setResultado] = useState([]);
  const [usuario, setUsuario] = useState(null);
  const esAdmin = usuario?.rol === "admin";
  const [pendiente, setPendiente] = useState([]);
  const token = localStorage.getItem("token");
  //Verifica rol de usuario
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
  //Carga pedidos pendientes de entrega en la web
  useEffect(() => {
    if(!esAdmin && usuario){
    fetch("http://localhost:3001/api/pendientes", {
      method: "GET",
      headers: {
        Authorization: token,
      },
    })
      .then((res) => res.json())
      .then((data) => 
        setPendiente(data))
      .catch((error) => console.error("Error al obtener carrito:", error));
  }}, [usuario]);
  //Elimina oedido de pedidos pendientes y la BD (Rol usuario)
  const eliminarPedido = (id_Pedido) => {
    
    console.log("Fetch front activado/EliminarPedido")
    fetch("http://localhost:3001/api/EliminarPedido", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify({ id_Pedido }),
    })
      .then(res => res.json())
      .then((data) => {
         if (data.ok) {
        // Acá actualizás el estado para quitar el elemento borrado
        setPendiente((prev) => prev.filter(item => item.id !== id_Pedido));
      }
      })
      .catch(err => {
        console.error("Error al agregar al carrito:", err);
        setEstadoBoton(prev => ({ ...prev, [id_Producto]: "normal" }));
      });
  };
  
  const buscarPendientes = (id_usuario) => {
  
  fetch("http://localhost:3001/api/buscar_pedidos", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id_usuario }),
  })
    .then((res) => res.json())
    .then((data) => setPendiente(data))
    .catch((error) =>
      console.error("Error al obtener datos de pendientes:", error),
      
    );
  };

  const eliminarPedidoAdmin = (id_usuario, id_pendiente) =>{
     console.log("Fetch front activado/EliminarPedidoAdmin"+id_usuario+"    "+id_pendiente)
    fetch("http://localhost:3001/api/eliminarPedidoAdmin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id_usuario, id_pendiente }),
    })
      .then(res => res.json())
      .then((data) => {
         if (data.ok) {
        // Acá actualizás el estado para quitar el elemento borrado
        setPendiente((prev) => prev.filter(item => item.id !== id_pendiente));
      }
      })
      .catch(err => {
        console.error("Error al agregar al carrito:", err);
        setEstadoBoton(prev => ({ ...prev, [id_Producto]: "normal" }));
      });
  };

   const confirmarPago = (id_usuario,id_pendiente) => {
    
    console.log("Fetch front activado/ComfirmarPedido")
    fetch("http://localhost:3001/api/comfirmarEnvio", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify({ id_usuario, id_pendiente }),
    })
      .then(res => res.json())
      .then((data) => {
         if (data.ok) {
        // Acá actualizás el estado para quitar el elemento comfirmado
        setPendiente((prev) => prev.filter(item => item.id !== id_pendiente));
      }
      })
      .catch(err => {
        console.error("Error al agregar al carrito:", err);
        setEstadoBoton(prev => ({ ...prev, [id_Producto]: "normal" }));
      });
  };
  
  return (
    <div className="historial-container">
      <h1>Viajes pendientes</h1>

      {/* Solo admin ve el buscador */}
        {esAdmin && (
        <div className="buscador-admin">
          <input
            type="text"
            placeholder="Buscar por ID de usuario..."
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            className="input-busqueda"
          />
          <button onClick={()=>{buscarPendientes(busqueda)}} className="btn-buscar">
            🔍 Buscar
          </button>
        </div>
      )}

      {pendiente.length == 0 ? (
        <div className="pendientes-vacio">
          <img
            src="https://cdn-icons-png.flaticon.com/512/4076/4076549.png"
            alt="Sin viajes"
            style={{ width: "150px", marginBottom: "20px", opacity: 0.7 }}
          />
          <h2 style={{ fontWeight: "normal", color: "#666" }}>
            No hay viajes pendientes
          </h2>
          <p style={{ color: "#999" }}>
            {esAdmin && busqueda
              ? "No se encontraron resultados para esa búsqueda."
              : "Todos tus viajes han sido confirmados o cancelados."}
          </p>
        </div>
      ) : (
        pendiente.map((item, index) => (
          <div key={index} className="historial-item">
            <img src={item.imagen} alt={item.nombre} />
            <div>
              <h3>{item.nombre}</h3>
              <p>Usuario ID: {item.id_User}</p>
              <p>Paquete: {item.paquete}</p>
              <p>Salida: {item.salida}</p>
              <p>Precio: ${item.precio.toLocaleString()}</p>

              <div style={{ marginTop: "10px" }}>
                {esAdmin && (
                  <button
                    onClick={() => confirmarPago(item.id_User,item.id)}
                    style={{
                      marginRight: "10px",
                      backgroundColor: "#4caf50",
                      color: "white",
                      padding: "5px 10px",
                      border: "none",
                      borderRadius: "5px",
                      cursor: "pointer",
                    }}
                  >
                    ✅ Confirmar Pago
                  </button>
                )}

                <button
                    onClick={() =>
                        esAdmin
                          ? eliminarPedidoAdmin(item.id_User, item.id)
                          : eliminarPedido(item.id)
                      } 
                      style={{
                        backgroundColor: "#f44336",
                        color: "white",
                        padding: "5px 10px",
                        border: "none",
                        borderRadius: "5px",
                        cursor: "pointer",
                      }}
                        >
                        ❌ Cancelar Viaje
                  </button>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
