import axios from 'axios';
import { BASE_URL } from './url';

const handleSubmit = async (data: any) => {
  const {  placa, conductor, sucursal, tipoVehiculo, odometroSalida,
    llantasParte1, llantasParte2, observacionGeneralLlantas,  fluidos, observacionGeneralFluido, parametrosVisuales, luces,
    insumos, documentacion, danosCarroceria
  } = data;

  const validateStep10 = () => {
    const isValid = danosCarroceria.every((danos:any) =>
      (danos.rayones || danos.golpes || danos.quebrado || danos.faltante)
    );

    if (!isValid) {
      alert("Debe seleccionar al menos una opción en cada vista.");
      return false;
    }
    return true;
  };

  if (validateStep10()) {
    const formData = new FormData();
    formData.append('placa', placa);
    formData.append('conductor', conductor);
    formData.append('sucursal', sucursal);
    formData.append('tipoVehiculo', tipoVehiculo);
    formData.append('odometroSalida', odometroSalida);
    formData.append('llantasParte1', JSON.stringify(llantasParte1));
    formData.append('llantasParte2', JSON.stringify(llantasParte2));
    formData.append('observacionGeneralLlantas', JSON.stringify(observacionGeneralLlantas));
    formData.append('fluidos', JSON.stringify(fluidos));
    formData.append('observacionGeneralFluido', JSON.stringify(observacionGeneralFluido));
    formData.append('parametrosVisuales', JSON.stringify(parametrosVisuales));
    formData.append('luces', JSON.stringify(luces));
    formData.append('insumos', JSON.stringify(insumos));
    formData.append('documentacion', JSON.stringify(documentacion));
    formData.append('danosCarroceria', JSON.stringify(danosCarroceria));

    try {
      const response = await axios.post(`${BASE_URL}/register`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.data.message) {
        const dataToStore: Record<string, string> = {};
        formData.forEach((value, key) => {
          dataToStore[key] = value.toString();
        });

        localStorage.setItem('userData', JSON.stringify(dataToStore));
        alert(response.data.message);
      }
    } catch (error) {
      console.error(error);
      alert('Error al registrar los datos');
    }
  }

};

export default handleSubmit;


