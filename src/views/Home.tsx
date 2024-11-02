import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="flex items-center justify-center min-h-screen min-w-screen bg-gray-100 p-4">
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-8">R04-PT-19 REVICION DE VEHICULOS</h1>

        <div className="p-6 bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
            <h2 className="text-xl font-semibold text-blue-600 mb-2">Registrar inspección de entrada</h2>
            <p className="text-gray-700 mb-4">Inicia el proceso de registro de inspección de entrada.</p>
            <Link to="/inspeccion" className="inline-block bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors duration-300">
              Ir a Registro de Entrada
            </Link>
          </div>
      </div>
    </div>
  );
}

export default Home;
