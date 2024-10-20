import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h1 className="text-2xl font-bold mb-8">Registro Vehicular</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full max-w-4xl">
        <div className="p-6 bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
          <h2 className="text-xl font-semibold text-blue-600 mb-2">Registrar Entrada</h2>
          <p className="text-gray-700 mb-4">Inicia el proceso de entrada de un vehículo y registra los datos necesarios.</p>
          <Link to="/registro-entrada" className="inline-block bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors duration-300">
            Ir a Registro de Entrada
          </Link>
        </div>

        <div className="p-6 bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
          <h2 className="text-xl font-semibold text-blue-600 mb-2">Inspección</h2>
          <p className="text-gray-700 mb-4">Captura observaciones y detalles sobre el estado de los vehículos.</p>
          <Link to="/inspeccion" className="inline-block bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors duration-300">
            Ir a Inspección
          </Link>
        </div>

        <div className="p-6 bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
          <h2 className="text-xl font-semibold text-blue-600 mb-2">Registrar Salida</h2>
          <p className="text-gray-700 mb-4">Completa el proceso de salida y actualiza el registro del vehículo.</p>
          <Link to="/salidas" className="inline-block bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors duration-300">
            Ir a Registro de Salida
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Home;


                           