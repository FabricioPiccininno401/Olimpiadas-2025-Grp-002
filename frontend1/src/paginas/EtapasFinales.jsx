export default function EtapasFinales() {
  return (
    <div className="p-8 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold text-blue-700 mb-6 text-center">Etapas Finales del Proyecto</h1>
      <div className="space-y-6">
        <div className="border rounded-lg p-6 shadow bg-white">
          <h2>Pruebas y ajustes</h2>
          <p>Testing en conjunto con la empresa para validar funcionalidades clave.</p>
        </div>

        <div className="border rounded-lg p-6 shadow bg-white">
          <h2>Documentación</h2>
          <p>Creación de manuales de uso, cursos de capacitación y tutoriales.</p>
        </div>

        <div className="border rounded-lg p-6 shadow bg-white">
          <h2>Despliegue final</h2>
          <p>Implementación en servidores de producción y entrega al cliente.</p>
        </div>
      </div>
    </div>
  );
}