import React, { useState } from 'react';

function Inspeccion() {
  const [observaciones, setObservaciones] = useState('');

  const handleObservaciones = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(`Observaciones: ${observaciones}`);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-2xl font-bold mb-4">Inspección de Vehículo</h1>
      <form onSubmit={handleObservaciones} className="w-full max-w-md bg-white p-6 rounded shadow-md">
        <label className="block mb-4">
          Observaciones:
          <textarea 
            value={observaciones} 
            onChange={(e) => setObservaciones(e.target.value)} 
            className="mt-1 p-2 border rounded w-full" 
            rows={4}
            required
          ></textarea>
        </label>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          Guardar Observaciones
        </button>
      </form>
    </div>
  );
}

export default Inspeccion;
