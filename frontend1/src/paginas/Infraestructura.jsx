export default function Infraestructura() {
  return (
    <div className="container">
      <h1>Infraestructura y Tecnología</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="card">
          <h2>🖥️ Servidores</h2>
          <p>Instalación en el Data Center del cliente con servidores de producción.</p>
        </div>
        <div className="card">
          <h2>🗄️ Base de datos</h2>
          <p>Elección de motor de base de datos según volumen de transacciones.</p>
        </div>
        <div className="card">
          <h2>🚀 Tecnologías</h2>
          <p>Selección de frameworks y lenguajes adecuados para cada capa.</p>
        </div>
      </div>
    </div>
  );
}