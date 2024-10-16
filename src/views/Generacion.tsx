import React from 'react';

function Generacion() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-2xl font-bold mb-4">Generación de Reporte</h1>
      <p className="mb-4">El reporte ha sido generado con éxito y guardado en Google Drive.</p>
      <button className="bg-green-500 text-white px-4 py-2 rounded mb-2">Ver PDF</button>
      <button className="bg-gray-500 text-white px-4 py-2 rounded">Compartir Enlace</button>
    </div>
  );
}

export default Generacion;
