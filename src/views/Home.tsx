import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-2xl font-bold mb-4">Registro Vehicular</h1>
      <Link to="/registro-entrada" className="btn bg-blue-500 text-white px-4 py-2 rounded mb-2">
        Registrar Entrada
      </Link>
      <Link to="/registro-salida" className="btn bg-blue-500 text-white px-4 py-2 rounded">
        Registrar Salida
      </Link>
    </div>
  );
}

export default Home;
