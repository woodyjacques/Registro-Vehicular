import { useEffect, useState } from 'react';
import axios from 'axios';

function Inspeccion() {
  const [observacionesList, setObservacionesList] = useState<{ observacion: string; documento: File | null }[]>([
    { observacion: '', documento: null }
  ]);

  const [datos, setDatos] = useState([]);
  const [filaSeleccionada, setFilaSeleccionada] = useState<any | null>(null);

  useEffect(() => {
    const obtenerDatos = async () => {
      try {
        const response = await axios.get('https://registro-vehicular-bac.vercel.app/get-data');
        setDatos(response.data);
      } catch (error) {
        console.error('Error al obtener los datos:', error);
      }
    };

    obtenerDatos();
  }, []);

  const handleButtonClick = (fila: any) => {
    if (fila[6] === 'Inspeccionar') {
      setFilaSeleccionada(fila);
    }
  };

  const handleObservacionChange = (index: number, e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    const { name, value } = e.target;

    if (e.target instanceof HTMLInputElement && e.target.type === 'file' && e.target.files) {
      const newObservacionesList = [...observacionesList];
      newObservacionesList[index].documento = e.target.files[0];
      setObservacionesList(newObservacionesList);
    } else {
      const newObservacionesList = [...observacionesList];
      newObservacionesList[index].observacion = value;
      setObservacionesList(newObservacionesList);
    }
  };

  const agregarObservacion = () => {
    setObservacionesList([...observacionesList, { observacion: '', documento: null }]);
  };

  const eliminarObservacion = (index: number) => {
    const newObservacionesList = observacionesList.filter((_, i) => i !== index);
    setObservacionesList(newObservacionesList);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Datos de la fila seleccionada:', filaSeleccionada);
    console.log('Lista de observaciones y documentos:', observacionesList);

    setFilaSeleccionada(null);
    setObservacionesList([{ observacion: '', documento: null }]);
  };

  const cerrarModal = () => {
    setFilaSeleccionada(null);
    setObservacionesList([{ observacion: '', documento: null }]);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h1 className="text-2xl font-bold mb-4">Inspección de Vehículo</h1>

      <div className="overflow-x-auto w-full">
        <table className="min-w-full bg-white shadow-md rounded mb-4">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b text-left">Sucursal</th>
              <th className="py-2 px-4 border-b text-left">Placa</th>
              <th className="py-2 px-4 border-b text-left">Conductor</th>
              <th className="py-2 px-4 border-b text-left">Fecha de Registro</th>
              <th className="py-2 px-4 border-b text-left">Identificador</th>
              <th className="py-2 px-4 border-b text-left">Licencias</th>
              <th className="py-2 px-4 border-b text-left">Estado</th>
              <th className="py-2 px-4 border-b text-left">Reportes</th>
              <th className="py-2 px-4 border-b text-left">Salida</th>
              <th className="py-2 px-4 border-b text-left">Fecha Salida</th>
            </tr>
          </thead>
          <tbody>
            {datos.map((fila, index) => (
              <tr key={index}>
                <td className="py-2 px-4 border-b">{fila[0]}</td>
                <td className="py-2 px-4 border-b">{fila[1]}</td>
                <td className="py-2 px-4 border-b">{fila[2]}</td>
                <td className="py-2 px-4 border-b">{fila[3]}</td>
                <td className="py-2 px-4 border-b">{fila[4]}</td>
                <td className="py-2 px-4 border-b">
                  <a href={fila[5]} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">Ver archivo</a>
                </td>
                <td className="py-2 px-4 border-b">
                  <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    onClick={() => handleButtonClick(fila)}
                  >
                    {fila[6]}
                  </button>
                </td>
                <td className="py-2 px-4 border-b">{fila[7]}</td>
                <td className="py-2 px-4 border-b">{fila[8]}</td>
                <td className="py-2 px-4 border-b">{fila[9]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {filaSeleccionada && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded shadow-md w-full max-w-md relative h-3/4 flex flex-col">
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
              onClick={cerrarModal}
            >
              &times;
            </button>
            <h2 className="text-xl font-bold mb-4">Observaciones para {filaSeleccionada[2]} ({filaSeleccionada[1]})</h2>
            <form onSubmit={handleSubmit} className="flex flex-col h-full">
              {/* Contenedor scrollable para observaciones */}
              <div className="flex-grow overflow-y-auto mb-4">
                {observacionesList.map((item, index) => (
                  <div key={index} className="mb-4">
                    <label className="block font-bold mb-2">Observación {index + 1}:</label>
                    <textarea
                      name="observacion"
                      value={item.observacion}
                      onChange={(e) => handleObservacionChange(index, e)}
                      className="w-full p-2 border rounded"
                      required
                    ></textarea>
                    <label className="block font-bold mb-2 mt-4">Subir documento {index + 1} (opcional):</label>
                    <input
                      type="file"
                      name="documento"
                      onChange={(e) => handleObservacionChange(index, e)}
                      className="w-full p-2 border rounded"
                      accept="application/pdf,image/*"
                    />
                    {observacionesList.length > 1 && (
                      <button
                        type="button"
                        className="mt-2 text-red-500 hover:text-red-700"
                        onClick={() => eliminarObservacion(index)}
                      >
                        Eliminar Observación {index + 1}
                      </button>
                    )}
                  </div>
                ))}
              </div>
              <div className="flex-shrink-0">
                <div className="flex justify-between space-x-4">
                  <button
                    type="button"
                    className="bg-blue-500 text-white px-4 py-2 rounded"
                    onClick={agregarObservacion}
                  >
                    Agregar
                  </button>
                  <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">Guardar</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Inspeccion;
