import { useEffect, useState } from 'react';
import axios from 'axios';
import { BASE_URL } from '../views/url';

function Inspeccion() {
  const [observacionesList, setObservacionesList] = useState<{ observacion: string; documento: File | null }[]>([
    { observacion: '', documento: null }
  ]);

  const [datos, setDatos] = useState([]);
  const [filaSeleccionada, setFilaSeleccionada] = useState<any | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const obtenerDatos = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/get-data`);
        setDatos(response.data);
      } catch (error) {
        console.error('Error al obtener los datos:', error);
      }
    };

    obtenerDatos();
  }, []);

  const handleButtonClick = (fila: any) => {
    if (fila[6] === 'Inspeccionar' || fila[6] == 'Seguimiento') {
      setFilaSeleccionada(fila);
    }
  };

  const handleObservacionChange = (index: number, e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    const { value } = e.target;

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
    if (observacionesList.length >= 2) {
      alert('Solo puedes agregar un máximo de dos observaciones.');
      return;
    }
    setObservacionesList([...observacionesList, { observacion: '', documento: null }]);
  };

  const eliminarObservacion = (index: number) => {
    const newObservacionesList = observacionesList.filter((_, i) => i !== index);
    setObservacionesList(newObservacionesList);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (!filaSeleccionada) return;

    const formData = new FormData();

    formData.append('sucursal', filaSeleccionada[0]);
    formData.append('placa', filaSeleccionada[1]);
    formData.append('conductor', filaSeleccionada[2]);
    formData.append('fechaRegistro', filaSeleccionada[3]);
    formData.append('identificador', filaSeleccionada[4]);
    if (filaSeleccionada[5]) {
      formData.append('licencias', filaSeleccionada[5]);
    }
    observacionesList.forEach((observacionItem, index) => {
      formData.append(`observaciones[${index}]`, observacionItem.observacion);
      if (observacionItem.documento) {
        formData.append('documentos', observacionItem.documento);
      }
    });

    try {
      const response = await axios.post(`${BASE_URL}/inspeccion`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      alert(response.data.message);
      window.location.reload();
    } catch (error) {
      console.error('Error al enviar los datos:', error);
      alert('Hubo un error al enviar los datos.');
    } finally {
      setIsSubmitting(false);
    }

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
              <th className="py-2 px-4 border-b text-left">Registro</th>
              <th className="py-2 px-4 border-b text-left">Identificador</th>
              <th className="py-2 px-4 border-b text-left">Licencias</th>
              <th className="py-2 px-4 border-b text-left">Estado</th>
              <th className="py-2 px-4 border-b text-left">Reportes</th>
              <th className="py-2 px-4 border-b text-left">Salida</th>
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
                  {fila[5] ? (
                    <a href={fila[5]} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">Ver archivo</a>
                  ) : 'No disponible'}
                </td>
                <td className="py-2 px-4 border-b">
                  <button
                    className={`${fila[6] === 'Completado' ? 'bg-green-500 hover:bg-green-700' 
                      : fila[6] === 'Seguimiento' ? 'bg-yellow-500 hover:bg-yellow-700' 
                        : 'bg-blue-500 hover:bg-blue-700' 
                      } text-white font-bold py-2 px-4 rounded`}
                    onClick={() => handleButtonClick(fila)}
                  >
                    {fila[6]}
                  </button>
                </td>
                <td className="py-2 px-4 border-b">
                  {typeof fila[7] === 'string' && /^https?:\/\/[^\s]+$/.test(fila[7]) ? (
                    <a href={fila[7]} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">
                      Ver enlace
                    </a>
                  ) : (
                    'No disponible'
                  )}
                </td>
                <td className="py-2 px-4 border-b">{fila[8]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <a href="/">
        <button type="button" className="bg-blue-500 text-white px-4 py-2 rounded w-full">
          Inicio
        </button>
      </a>
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
              <div className="sticky bottom-0 bg-white pt-4">
                <div className="flex justify-between space-x-4">
                  <button
                    type="button"
                    className="bg-blue-500 text-white px-4 py-2 rounded"
                    onClick={agregarObservacion}
                  >
                    Agregar
                  </button>
                  <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded" disabled={isSubmitting} >{isSubmitting ? 'Guardando...' : 'Guardar'}</button>
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
