export default function CarritoInfo() {
  return (
    <div className="container">
      <h1>Carrito de Compras</h1>
      <p className="text-center mb-8">Funcionalidades esenciales para mejorar la experiencia del usuario.</p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="card">
          <h2>🛒 Selección de productos</h2>
          <p>Los pasajeros pueden agregar estadías, vuelos y alquileres al carrito.</p>
        </div>
        <div className="card">
          <h2>💳 Pagos y cobro</h2>
          <p>Integración con métodos de pago seguros y confirmación de compra.</p>
        </div>
        <div className="card">
          <h2>📧 Notificaciones</h2>
          <p>Envío de correos automáticos al cliente y administración.</p>
        </div>
      </div>
    </div>
  );
}