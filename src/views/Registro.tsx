import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Registro() {
  const [placa, setPlaca] = useState('');
  const [conductor, setConductor] = useState('');
  const [sucursal, setSucursal] = useState('');
  const [documento, setDocumento] = useState<File | null>(null);

  const [isSubmitting, setIsSubmitting] = useState(false);

  const navigate = useNavigate();

  const resetForm = () => {
    setPlaca('');
    setConductor('');
    setSucursal('');
    setDocumento(null);
  };

  const getCurrentDate = (): string => {
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const fechaRegistro = getCurrentDate();

    const uniqueIdentifier = `${sucursal}/${placa}/${conductor}/${fechaRegistro}`;

    const formData = new FormData();
    formData.append('placa', placa);
    formData.append('conductor', conductor);
    formData.append('sucursal', sucursal);
    formData.append('fechaRegistro', fechaRegistro);
    formData.append('uniqueIdentifier', uniqueIdentifier);

    if (documento) {
      formData.append('documento', documento);
    }

    try {
      const response = await axios.post('http://localhost:4000/register', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      alert(response.data.message);
      navigate('/inspeccion');
    } catch (error) {
      console.error(error);
      alert('Error al registrar los datos');
      resetForm();
    } finally {
      setIsSubmitting(false);
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
            {[
              "(SU01) Casa Matriz Mañanitas",
              "(SU02) Chiriquí",
              "(SU03) Chorrera",
              "(SU04) Chorrera Planta",
              "(SU05) Colón",
              "(SU06) Juan Díaz",
              "(SU07) Aguadulce",
              "(SU08) Los Santos"
            ].map((nombre, index) => (
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

        <div className="flex justify-between">
          <a href="/">
            <button type="button" className="bg-red-500 text-white px-4 py-2 rounded">
              Cancelar
            </button>
          </a>
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded" disabled={isSubmitting}>
            {isSubmitting ? 'Guardando...' : 'Guardar'}
          </button>
        </div>
      </form>
    </div>
  );
}

export default Registro;
