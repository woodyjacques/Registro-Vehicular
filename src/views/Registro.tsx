import React, { useState } from 'react';
import axios from 'axios';

function Registro() {

  const [placa, setPlaca] = useState('');
  const [conductor, setConductor] = useState('');
  const [sucursal, setSucursal] = useState('');
  const [documento, setDocumento] = useState<File | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('placa', placa);
    formData.append('conductor', conductor);
    formData.append('sucursal', sucursal);
    if (documento) {
      formData.append('documento', documento);
    }

    try {
      const response = await axios.post('http://localhost:5000/register', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      alert(response.data);
    } catch (error) {
      console.error(error);
      alert('Error al registrar los datos');
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setDocumento(e.target.files[0]);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-2xl font-bold mb-4">Registrar Vehículo</h1>
      <form onSubmit={handleSubmit} className="w-full max-w-md bg-white p-6 rounded shadow-md">

        <div className="mb-4">
          <label className="block mb-2 font-bold">A qué sucursal pertenece:</label>
          <div className="flex flex-col space-y-2">
            {["Casa Matriz Mañanitas", "Chiriquí", "Chorrera", "Chorrera Planta", "Colón", "Juan Díaz", "Aguadulce", "Los Santos"].map((nombre, index) => (
              <label key={index} className="inline-flex items-center">
                <input
                  type="radio"
                  name="sucursal"
                  value={nombre}
                  onChange={(e) => setSucursal(e.target.value)}
                  className="mr-2"
                  required
                />
                (SU0{index + 1}) {nombre}
              </label>
            ))}
          </div>
        </div>

        <label className="block mb-4">
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

        <label className="block mb-4">
          Documentos del Conductor (Carnet, Cédula, Licencia):
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
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
