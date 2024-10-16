import React, { useState } from 'react';

function Registro({ tipo }: { tipo: "Entrada" | "Salida" }) {
  const [placa, setPlaca] = useState('');
  const [conductor, setConductor] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(`Registrando ${tipo} para: ${placa}, ${conductor}`);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-2xl font-bold mb-4">Registrar {tipo}</h1>
      <form onSubmit={handleSubmit} className="w-full max-w-md bg-white p-6 rounded shadow-md">
        <label className="block mb-2">
          Placa del Vehículo:
          <input 
            type="text" 
            value={placa} 
            onChange={(e) => setPlaca(e.target.value)} 
            className="mt-1 p-2 border rounded w-full" 
            required 
          />
        </label>
        <label className="block mb-4">
          Nombre del Conductor:
          <input 
            type="text" 
            value={conductor} 
            onChange={(e) => setConductor(e.target.value)} 
            className="mt-1 p-2 border rounded w-full" 
            required 
          />
        </label>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          Continuar
        </button>
      </form>
    </div>
  );
}

export default Registro;
