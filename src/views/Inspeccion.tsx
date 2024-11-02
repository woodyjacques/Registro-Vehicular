import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { BASE_URL } from './url';

type Revision = {
  descripcion: string;
  si: boolean;
  no: boolean;
  observacion: string;
};

function Inspeccion() {
  const initialFormData = {
    revisiones: [
      { descripcion: "Revisión de golpes en unidades frente, atrás y laterales", si: false, no: false, observacion: '' },
      { descripcion: "No dejar la llave en el vehículo y cerrarlo", si: false, no: false, observacion: '' },
      { descripcion: "Dejar sin basura el camión, limpio por dentro y por fuera", si: false, no: false, observacion: '' },
      { descripcion: "Dejar apagado las luces, radio, intermitentes y rotativa", si: false, no: false, observacion: '' },
      { descripcion: "Maletín de primeros auxilios", si: false, no: false, observacion: '' },
      { descripcion: "Conos", si: false, no: false, observacion: '' },
      { descripcion: "Triángulos", si: false, no: false, observacion: '' },
      { descripcion: "Extintor", si: false, no: false, observacion: '' },
      { descripcion: "Llanta de repuesto", si: false, no: false, observacion: '' },
      { descripcion: "Gato", si: false, no: false, observacion: '' },
      { descripcion: "Carretilla, según aplique", si: false, no: false, observacion: '' },
      { descripcion: "Poner cuñas", si: false, no: false, observacion: '' }
    ]
  };

  const [formData, setFormData] = useState(initialFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (index: number, field: keyof Revision, value: boolean | string) => {
    const newRevisiones = [...formData.revisiones];

    if (field === 'si') {
      newRevisiones[index].si = value as boolean;
      newRevisiones[index].no = !value as boolean;
    } else if (field === 'no') {
      newRevisiones[index].no = value as boolean;
      newRevisiones[index].si = !value as boolean;
    } else if (field === 'observacion') {
      newRevisiones[index].observacion = value as string;
    }

    setFormData({ ...formData, revisiones: newRevisiones });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const allFilled = formData.revisiones.every(
      item => (item.si || item.no) && (!item.si || item.observacion.trim() !== '')
    );
    if (!allFilled) {
      alert("Por favor, completa todas las opciones donde corresponda.");
      return;
    }

    setIsSubmitting(true);

    const localDataString = localStorage.getItem('userData');
    const localData = localDataString ? JSON.parse(localDataString) : {};

    const fechaRegistro = getCurrentDate();
    const horaSalida = getCurrentTime();

    const uniqueIdentifier = `${localData.sucursal}/${localData.placa}/${localData.conductor}/${fechaRegistro}`;

    const formDataToSend = new FormData();
    formDataToSend.append('placa', localData.placa);
    formDataToSend.append('conductor', localData.conductor);
    formDataToSend.append('sucursal', localData.sucursal);
    formDataToSend.append('tipoVehiculo', localData.tipoVehiculo);
    formDataToSend.append('horaSalida', horaSalida);
    formDataToSend.append('odometroSalida', localData.odometroSalida);
    formDataToSend.append('fechaRegistro', fechaRegistro);
    formDataToSend.append('uniqueIdentifier', uniqueIdentifier);
    formDataToSend.append('llantasParte1', localData.llantasParte1);
    formDataToSend.append('llantasParte2', localData.llantasParte2);
    formDataToSend.append('fluidos', localData.fluidos);
    formDataToSend.append('parametrosVisuales', localData.parametrosVisuales);
    formDataToSend.append('luces', localData.luces);
    formDataToSend.append('insumos', localData.insumos);
    formDataToSend.append('documentacion', localData.documentacion);
    formDataToSend.append('danosCarroceria', localData.danosCarroceria);
    formDataToSend.append('revisiones', JSON.stringify(formData.revisiones));

    try {
      const response = await axios.post(`${BASE_URL}/register`, formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      if (response.data.message) {
        const dataToStore: Record<string, string> = {};
        formDataToSend.forEach((value, key) => {
          dataToStore[key] = value.toString();
        });
        alert(response.data.message);
        localStorage.removeItem('userData');
        navigate("/");
      }
    } catch (error) {
      console.error(error);
      alert('Error al registrar los datos');
    } finally {
      setIsSubmitting(false);
    }
  };

  const getCurrentDate = () => new Date().toISOString().split('T')[0];
  const getCurrentTime = () => new Date().toLocaleTimeString();


  const handleCancel = () => {
    setFormData(initialFormData);
    navigate("/home");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h1 className="text-2xl font-bold mb-4 text-center">R04-PT-19 REVICIÓN DE VEHÍCULOS</h1>
      <form onSubmit={handleSubmit} className="w-full max-w-3xl bg-white p-6 rounded shadow-md">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {formData.revisiones.map((item, index) => (
            <div key={index} className="p-4 bg-gray-50 border rounded">
              <label className="block text-gray-700 font-semibold mb-2">{item.descripcion}</label>
              <div className="flex items-center space-x-4">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name={`respuesta-${index}`}
                    checked={item.si}
                    onChange={() => handleInputChange(index, 'si', true)}
                  />
                  <span className="ml-2">Sí</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name={`respuesta-${index}`}
                    checked={item.no}
                    onChange={() => handleInputChange(index, 'no', true)}
                  />
                  <span className="ml-2">No</span>
                </label>
              </div>
              {item.si && (
                <div className="mt-2">
                  <label className="block text-gray-700">Observación:</label>
                  <input
                    type="text"
                    value={item.observacion}
                    onChange={(e) => handleInputChange(index, 'observacion', e.target.value)}
                    className="w-full p-2 border rounded mt-1"
                  />
                </div>
              )}
            </div>
          ))}
        </div>
        <div className="mt-4 flex justify-between">
          <button
            type="button"
            onClick={handleCancel}
            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition-colors duration-300"
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors duration-300"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Guardando...' : 'Guardar'}
          </button>
        </div>
      </form>
    </div>
  );
}

export default Inspeccion;
