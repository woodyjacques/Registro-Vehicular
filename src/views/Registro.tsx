import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from './url';
import Indicador from "../assets/Indicador.png"
import frontal from "../assets/Frontal.png";
import trasera from "../assets/Trasera.png";

function Registro() {

  const [placa, setPlaca] = useState('');
  const [conductor, setConductor] = useState('');
  const [sucursal, setSucursal] = useState('');
  const [tipoVehiculo, setTipoVehiculo] = useState('');
  const [fecha, setFecha] = useState('');
  const [horaSalida, setHoraSalida] = useState('');
  const [horaEntrada, setHoraEntrada] = useState('');
  const [odometroSalida, setOdometroSalida] = useState('');
  const [odometroLlegada, setOdometroLlegada] = useState('');
  const [llantasParte1, setLlantasParte1] = useState(
    Array(5).fill({ id: 0, fp: false, pe: false, pa: false, desgaste: false, observacion: '' }).map((_, index) => ({
      id: index + 1,
      fp: false,
      pe: false,
      pa: false,
      desgaste: false,
      observacion: '',
    }))
  );

  const [llantasParte2, setLlantasParte2] = useState(
    Array(5).fill({ id: 0, fp: false, pe: false, pa: false, desgaste: false, observacion: '' }).map((_, index) => ({
      id: index + 6,
      fp: false,
      pe: false,
      pa: false,
      desgaste: false,
      observacion: '',
    }))
  );

  const [fluidos, setFluidos] = useState(
    [
      { id: 1, nombre: 'Niveles de aceite de motor', requiere: false, lleno: false, observacion: '' },
      { id: 2, nombre: 'Niveles de líquido de freno', requiere: false, lleno: false, observacion: '' },
      { id: 3, nombre: 'Niveles de líquido de power steering', requiere: false, lleno: false, observacion: '' },
      { id: 4, nombre: 'Niveles de líquido de radiador (Coolant)', requiere: false, lleno: false, observacion: '' },
    ]
  );

  const [parametrosVisuales, setParametrosVisuales] = useState(
    [
      { id: 1, nombre: 'Inspección de radiador y aspa', si: false, no: false, observacion: '' },
      { id: 2, nombre: 'Inspección de mangueras y conexiones', si: false, no: false, observacion: '' },
      { id: 3, nombre: 'Inspección de correas externas del motor', si: false, no: false, observacion: '' },
      { id: 4, nombre: 'Comprobación de fugas (Superficies de Acoplamiento)', si: false, no: false, observacion: '' },
    ]
  );

  const [luces, setLuces] = useState(
    [
      { id: 1, nombre: 'Medias', funcionaSi: false, funcionaNo: false, observacion: '' },
      { id: 2, nombre: 'Retroceso', funcionaSi: false, funcionaNo: false, observacion: '' },
      { id: 3, nombre: 'Derecho', funcionaSi: false, funcionaNo: false, observacion: '' },
      { id: 4, nombre: 'Izquierdo', funcionaSi: false, funcionaNo: false, observacion: '' },
      { id: 5, nombre: 'Intermitentes', funcionaSi: false, funcionaNo: false, observacion: '' },
      { id: 6, nombre: 'Stops', funcionaSi: false, funcionaNo: false, observacion: '' },
      { id: 7, nombre: 'Cabina', funcionaSi: false, funcionaNo: false, observacion: '' },
      { id: 8, nombre: 'Escolta', funcionaSi: false, funcionaNo: false, observacion: '' },
    ]
  );

  const [insumos, setInsumos] = useState(
    [
      { id: 1, nombre: 'Primeros auxilios', disponibleSi: false, disponibleNo: false },
      { id: 2, nombre: 'Conos', disponibleSi: false, disponibleNo: false },
      { id: 3, nombre: 'Triángulos', disponibleSi: false, disponibleNo: false },
      { id: 4, nombre: 'Cuñas', disponibleSi: false, disponibleNo: false },
      { id: 5, nombre: 'Extintor', disponibleSi: false, disponibleNo: false },
      { id: 6, nombre: 'Llanta de repuesto', disponibleSi: false, disponibleNo: false },
      { id: 7, nombre: 'Gato', disponibleSi: false, disponibleNo: false },
      { id: 8, nombre: 'Carretilla, según equipo', disponibleSi: false, disponibleNo: false },
    ]
  );

  const [documentacion, setDocumentacion] = useState(
    [
      { id: 1, nombre: 'Permiso bimensual de CBP', disponibleSi: false, disponibleNo: false },
      { id: 2, nombre: 'Permiso anual de CBP', disponibleSi: false, disponibleNo: false },
      { id: 3, nombre: 'Póliza de seguro', disponibleSi: false, disponibleNo: false },
      { id: 4, nombre: 'Tarjeta de pesos y dimensiones', disponibleSi: false, disponibleNo: false },
      { id: 5, nombre: 'Licencia de conducir tipo Comercial o H', disponibleSi: false, disponibleNo: false },
      { id: 6, nombre: 'Hoja de Seguridad de los Productos', disponibleSi: false, disponibleNo: false },
      { id: 7, nombre: 'Plan de Emergencia', disponibleSi: false, disponibleNo: false },
      { id: 8, nombre: 'Registro único vehicular', disponibleSi: false, disponibleNo: false },
    ]
  );

  const [danosCarroceria, setDanosCarroceria] = useState([
    { id: 1, vista: 'Frontal', rayones: false, golpes: false, quebrado: false, faltante: false },
    { id: 2, vista: 'Posterior', rayones: false, golpes: false, quebrado: false, faltante: false },
    { id: 3, vista: 'Lateral Izquierda', rayones: false, golpes: false, quebrado: false, faltante: false },
    { id: 4, vista: 'Lateral Derecha', rayones: false, golpes: false, quebrado: false, faltante: false },
    { id: 5, vista: 'Otra Observación', rayones: false, golpes: false, quebrado: false, faltante: false },
    { id: 6, vista: 'Superior', rayones: false, golpes: false, quebrado: false, faltante: false },
  ]);

  const [step, setStep] = useState(1);

  const [isSubmitting, setIsSubmitting] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const datos = localStorage.getItem('userData');
    if (datos) {
      navigate("/home");
    }
  }, []);

  const resetForm = () => {
    setPlaca('');
    setConductor('');
    setSucursal('');
    setTipoVehiculo('');
    setFecha('');
    setHoraSalida('');
    setHoraEntrada('');
    setOdometroSalida('');
    setOdometroLlegada('');
    setLlantasParte1(
      Array(5).fill({ id: 0, fp: false, pe: false, pa: false, desgaste: false, observacion: '' }).map((_, index) => ({
        id: index + 1,
        fp: false,
        pe: false,
        pa: false,
        desgaste: false,
        observacion: '',
      }))
    );
    setLlantasParte2(
      Array(5).fill({ id: 0, fp: false, pe: false, pa: false, desgaste: false, observacion: '' }).map((_, index) => ({
        id: index + 6,
        fp: false,
        pe: false,
        pa: false,
        desgaste: false,
        observacion: '',
      }))
    );
    setFluidos(
      [
        { id: 1, nombre: 'Niveles de aceite de motor', requiere: false, lleno: false, observacion: '' },
        { id: 2, nombre: 'Niveles de líquido de freno', requiere: false, lleno: false, observacion: '' },
        { id: 3, nombre: 'Niveles de líquido de power steering', requiere: false, lleno: false, observacion: '' },
        { id: 4, nombre: 'Niveles de líquido de radiador (Coolant)', requiere: false, lleno: false, observacion: '' },
      ]
    );
    setParametrosVisuales(
      [
        { id: 1, nombre: 'Inspección de radiador y aspa', si: false, no: false, observacion: '' },
        { id: 2, nombre: 'Inspección de mangueras y conexiones', si: false, no: false, observacion: '' },
        { id: 3, nombre: 'Inspección de correas externas del motor', si: false, no: false, observacion: '' },
        { id: 4, nombre: 'Comprobación de fugas (Superficies de Acoplamiento)', si: false, no: false, observacion: '' },
      ]
    );
    setLuces(
      [
        { id: 1, nombre: 'Medias', funcionaSi: false, funcionaNo: false, observacion: '' },
        { id: 2, nombre: 'Retroceso', funcionaSi: false, funcionaNo: false, observacion: '' },
        { id: 3, nombre: 'Derecho', funcionaSi: false, funcionaNo: false, observacion: '' },
        { id: 4, nombre: 'Izquierdo', funcionaSi: false, funcionaNo: false, observacion: '' },
        { id: 5, nombre: 'Intermitentes', funcionaSi: false, funcionaNo: false, observacion: '' },
        { id: 6, nombre: 'Stops', funcionaSi: false, funcionaNo: false, observacion: '' },
        { id: 7, nombre: 'Cabina', funcionaSi: false, funcionaNo: false, observacion: '' },
        { id: 8, nombre: 'Escolta', funcionaSi: false, funcionaNo: false, observacion: '' },
      ]
    );
    setInsumos(
      [
        { id: 1, nombre: 'Primeros auxilios', disponibleSi: false, disponibleNo: false },
        { id: 2, nombre: 'Conos', disponibleSi: false, disponibleNo: false },
        { id: 3, nombre: 'Triángulos', disponibleSi: false, disponibleNo: false },
        { id: 4, nombre: 'Cuñas', disponibleSi: false, disponibleNo: false },
        { id: 5, nombre: 'Extintor', disponibleSi: false, disponibleNo: false },
        { id: 6, nombre: 'Llanta de repuesto', disponibleSi: false, disponibleNo: false },
        { id: 7, nombre: 'Gato', disponibleSi: false, disponibleNo: false },
        { id: 8, nombre: 'Carretilla, según equipo', disponibleSi: false, disponibleNo: false },
      ]
    );
    setDocumentacion(
      [
        { id: 1, nombre: 'Permiso bimensual de CBP', disponibleSi: false, disponibleNo: false },
        { id: 2, nombre: 'Permiso anual de CBP', disponibleSi: false, disponibleNo: false },
        { id: 3, nombre: 'Póliza de seguro', disponibleSi: false, disponibleNo: false },
        { id: 4, nombre: 'Tarjeta de pesos y dimensiones', disponibleSi: false, disponibleNo: false },
        { id: 5, nombre: 'Licencia de conducir tipo Comercial o H', disponibleSi: false, disponibleNo: false },
        { id: 6, nombre: 'Hoja de Seguridad de los Productos', disponibleSi: false, disponibleNo: false },
        { id: 7, nombre: 'Plan de Emergencia', disponibleSi: false, disponibleNo: false },
        { id: 8, nombre: 'Registro único vehicular', disponibleSi: false, disponibleNo: false },
      ]
    );
    setDanosCarroceria([
      { id: 1, vista: 'Frontal', rayones: false, golpes: false, quebrado: false, faltante: false },
      { id: 2, vista: 'Posterior', rayones: false, golpes: false, quebrado: false, faltante: false },
      { id: 3, vista: 'Lateral Izquierda', rayones: false, golpes: false, quebrado: false, faltante: false },
      { id: 4, vista: 'Lateral Derecha', rayones: false, golpes: false, quebrado: false, faltante: false },
      { id: 5, vista: 'Otra Observación', rayones: false, golpes: false, quebrado: false, faltante: false },
      { id: 6, vista: 'Superior', rayones: false, golpes: false, quebrado: false, faltante: false },
    ]);

    setStep(1);
  };

  const getCurrentDate = (): string => {
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const getCurrentTime = (): string => {
    const date = new Date();
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${hours}:${minutes}`;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (validateStep10()) {
      setIsSubmitting(true);

      const fechaRegistro = getCurrentDate();
      const horaSalida = getCurrentTime();

      const uniqueIdentifier = `${sucursal}/${placa}/${conductor}/${fechaRegistro}`;

      const formData = new FormData();
      formData.append('placa', placa);
      formData.append('conductor', conductor);
      formData.append('sucursal', sucursal);
      formData.append('tipoVehiculo', tipoVehiculo);
      formData.append('horaSalida', horaSalida);
      formData.append('odometroSalida', odometroSalida);
      formData.append('fechaRegistro', fechaRegistro);
      formData.append('uniqueIdentifier', uniqueIdentifier);
      formData.append('llantasParte1', JSON.stringify(llantasParte1));
      formData.append('llantasParte2', JSON.stringify(llantasParte2));
      formData.append('fluidos', JSON.stringify(fluidos));
      formData.append('parametrosVisuales', JSON.stringify(parametrosVisuales));
      formData.append('luces', JSON.stringify(luces));
      formData.append('insumos', JSON.stringify(insumos));
      formData.append('documentacion', JSON.stringify(documentacion));
      formData.append('danosCarroceria', JSON.stringify(danosCarroceria));

      try {
        const response = await axios.post(`${BASE_URL}/register`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });

        if (response.data.message) {

          const dataToStore: Record<string, string> = {};
          formData.forEach((value, key) => {
            dataToStore[key] = value.toString();
          });

          localStorage.setItem('userData', JSON.stringify(dataToStore));
          alert(response.data.message);
          navigate('/home');
        }
      } catch (error) {
        console.error(error);
        alert('Error al registrar los datos');
        resetForm();
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const handleNextStep = () => {
    setStep(step + 1);
  };

  const handlePreviousStep = () => {
    setStep(step - 1);
  };

  const totalSteps = 10;

  const validateStep1 = () => {
    if (!sucursal) {
      alert('Debe seleccionar una sucursal.');
      return false;
    }
    return true;
  };

  const validateStep2 = () => {
    if (!placa || !conductor || !tipoVehiculo || !odometroSalida) {
      alert('Todos los campos de este paso son obligatorios.');
      return false;
    }
    return true;
  };

  const validateStep3 = () => {
    const isInvalid = llantasParte1.some((llanta) => {
      const noOptionSelected = !llanta.fp && !llanta.pe && !llanta.pa && !llanta.desgaste;
      const observationRequired = (llanta.fp || llanta.pe) && !llanta.observacion.trim();

      return noOptionSelected || observationRequired;
    });

    if (isInvalid) {
      alert('Debe seleccionar al menos una opción (FP, PE, PA o desgaste) para cada llanta y agregar una observación si selecciona FP o PE.');
      return false;
    }

    return true;
  };

  const validateStep4 = () => {
    const isInvalid = llantasParte2.some((llanta) => {
      const noOptionSelected = !llanta.fp && !llanta.pe && !llanta.pa && !llanta.desgaste;
      const observationRequired = (llanta.fp || llanta.pe) && !llanta.observacion.trim();

      return noOptionSelected || observationRequired;
    });

    if (isInvalid) {
      alert('Debe seleccionar al menos una opción (FP, PE, PA o desgaste) para cada llanta y agregar una observación si selecciona FP o PE.');
      return false;
    }

    return true;
  };

  const validateStep5 = () => {
    const isInvalid = fluidos.some((fluido) => {
      const noOptionSelected = !fluido.requiere && !fluido.lleno;
      const observationRequired = fluido.requiere && !fluido.observacion.trim();

      return noOptionSelected || observationRequired;
    });

    if (isInvalid) {
      alert('Debe seleccionar al menos una opción ("Requiere" o "Lleno") para cada fluido y agregar una observación si marca "Requiere".');
      return false;
    }

    return true;
  };

  const validateStep6 = () => {
    const isInvalid = parametrosVisuales.some((parametro) => {
      const noOptionSelected = !parametro.si && !parametro.no;

      const observationRequired = parametro.no && !parametro.observacion.trim();

      return noOptionSelected || observationRequired;
    });

    if (isInvalid) {
      alert('Debe seleccionar al menos una opción ("SI" o "NO") para cada parámetro y agregar una observación si marca "NO".');
      return false;
    }

    return true;
  };

  const validateStep7 = () => {
    const isInvalid = luces.some((luz) => {
      const noOptionSelected = !luz.funcionaSi && !luz.funcionaNo;
      const observationRequired = luz.funcionaNo && !luz.observacion.trim();

      return noOptionSelected || observationRequired;
    });

    if (isInvalid) {
      alert('Debe seleccionar al menos una opción ("Funciona (SI)" o "Funciona (NO)") para cada luz y agregar una observación si marca "Funciona (NO)".');
      return false;
    }

    return true;
  };

  const validateStep8 = () => {
    const isInvalid = insumos.some((insumo) => {
      return !insumo.disponibleSi && !insumo.disponibleNo;
    });

    if (isInvalid) {
      alert('Debe seleccionar al menos una opción ("Disponible (SI)" o "Disponible (NO)") para cada insumo.');
      return false;
    }

    return true;
  };

  const validateStep9 = () => {
    const isInvalid = documentacion.some((doc) => {
      return !doc.disponibleSi && !doc.disponibleNo;
    });

    if (isInvalid) {
      alert('Debe seleccionar al menos una opción ("Disponible (SI)" o "Disponible (NO)") para cada documento.');
      return false;
    }

    return true;
  };

  const validateStep10 = () => {
    const isValid = danosCarroceria.every((danos) =>
      (danos.rayones || danos.golpes || danos.quebrado || danos.faltante)
    );

    if (!isValid) {
      alert("Debe seleccionar al menos una opción en cada vista.");
      return false;
    }
    return true;
  };

  const [datos, setDatos] = useState([]);

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

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h1 className="text-2xl font-bold mb-4 text-center">R04-PT-19 REVICION DE VEHICULOS </h1>

      <div className="w-full max-w-3xl bg-gray-300 rounded-full h-4 mb-4">
        <div
          className="bg-blue-500 h-4 rounded-full"
          style={{ width: `${(step / totalSteps) * 100}%` }}
        ></div>
      </div>

      <p className="text-center text-lg font-semibold mb-4">
        Paso {step} de {totalSteps}
      </p>

      <form onSubmit={handleSubmit} className="w-full max-w-3xl bg-white p-6 rounded shadow-md">

        {step === 1 && (
          <div>
            <div className="mb-4">
              <label className="block mb-2 font-bold">A qué sucursal pertenece:</label>
              <div className="flex flex-col space-y-2">
                {[
                  "Casa Matriz Mañanitas",
                  "Chiriquí",
                  "Chorrera",
                  "Chorrera Planta",
                  "Colón",
                  "Juan Díaz",
                  "Aguadulce",
                  "Los Santos"
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
            <div className="flex justify-between">
              <button
                type="button"
                className="bg-blue-500 text-white px-4 py-2 rounded"
                onClick={() => {
                  if (validateStep1()) {
                    handleNextStep();
                  }
                }}
              >
                Siguiente
              </button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <label className="block mb-4">
              Placa del Vehículo:
              <select
                value={placa}
                onChange={(e) => setPlaca(e.target.value)}
                className="mt-1 p-2 border rounded w-full"
                required
              >
                <option value="">Seleccione una placa</option>
                {datos.map((placa, index) => (
                  <option key={index} value={placa}>
                    {placa}
                  </option>
                ))}
              </select>
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
              Tipo de Vehículo:
              <select
                value={tipoVehiculo}
                onChange={(e) => setTipoVehiculo(e.target.value)}
                className="mt-1 p-2 border rounded w-full"
                required
              >
                <option value="">Seleccione un tipo</option>
                <option value="sedan">Sedán</option>
                <option value="pickup">Pickup</option>
                <option value="panel">Panel</option>
                <option value="camion">Camión</option>
              </select>
            </label>

            <label className="block mb-4">
              Odómetro de Salida:
              <input
                type="text"
                value={odometroSalida}
                onChange={(e) => setOdometroSalida(e.target.value)}
                className="mt-1 p-2 border rounded w-full"
                required
              />
            </label>

            <div className="col-span-1 md:col-span-2 flex justify-between">
              <button type="button" className="bg-gray-500 text-white px-4 py-2 rounded" onClick={handlePreviousStep}>
                Atrás
              </button>
              <button type="button" className="bg-blue-500 text-white px-4 py-2 rounded" onClick={() => {
                if (validateStep2()) {
                  handleNextStep();
                }
              }}>
                Siguiente
              </button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div>
            <h2 className="text-xl font-bold mb-4">Revisión de Llantas (Parte 1)</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {llantasParte1.map((llanta, index) => (
                <div key={llanta.id} className="mb-4">
                  <h3 className="font-bold">Llanta #{llanta.id}</h3>
                  <label className="inline-flex items-center mr-4">
                    <input
                      type="checkbox"
                      checked={llanta.fp}
                      onChange={(e) => {
                        const updatedLlantas = [...llantasParte1];
                        updatedLlantas[index] = { ...updatedLlantas[index], fp: e.target.checked };
                        setLlantasParte1(updatedLlantas);
                      }}
                    />
                    Falta de Presión (FP)
                  </label>
                  <label className="inline-flex items-center mr-4">
                    <input
                      type="checkbox"
                      checked={llanta.pe}
                      onChange={(e) => {
                        const updatedLlantas = [...llantasParte1];
                        updatedLlantas[index] = { ...updatedLlantas[index], pe: e.target.checked };
                        setLlantasParte1(updatedLlantas);
                      }}
                    />
                    Presión Excesiva (PE)
                  </label>
                  <label className="inline-flex items-center mr-4">
                    <input
                      type="checkbox"
                      checked={llanta.pa}
                      onChange={(e) => {
                        const updatedLlantas = [...llantasParte1];
                        updatedLlantas[index] = { ...updatedLlantas[index], pa: e.target.checked };
                        setLlantasParte1(updatedLlantas);
                      }}
                    />
                    Presión Adecuada (PA)
                  </label>
                  <label className="inline-flex items-center">
                    <input
                      type="checkbox"
                      checked={llanta.desgaste}
                      onChange={(e) => {
                        const updatedLlantas = [...llantasParte1];
                        updatedLlantas[index] = { ...updatedLlantas[index], desgaste: e.target.checked };
                        setLlantasParte1(updatedLlantas);
                      }}
                    />
                    Indicador de Desgaste
                  </label>

                  {(llanta.fp || llanta.pe) && (
                    <div className="mt-2">
                      <label className="block font-bold">Observación:</label>
                      <textarea
                        value={llanta.observacion}
                        onChange={(e) => {
                          const updatedLlantas = [...llantasParte1];
                          updatedLlantas[index] = { ...updatedLlantas[index], observacion: e.target.value };
                          setLlantasParte1(updatedLlantas);
                        }}
                        className={`mt-1 p-2 border rounded w-full ${!llanta.observacion.trim() ? 'border-red-500' : ''}`}
                        placeholder={!llanta.observacion ? 'Debe ingresar una observación si selecciona FP o PE' : ''}
                      />
                      {!llanta.observacion.trim() && (
                        <p className="text-red-500 mt-1">Es necesario ingresar una observación si marca FP o PE.</p>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
            <div className="flex justify-between">
              <button
                type="button"
                className="bg-gray-500 text-white px-4 py-2 rounded"
                onClick={handlePreviousStep}
              >
                Atrás
              </button>
              <button
                type="button"
                className="bg-blue-500 text-white px-4 py-2 rounded"
                onClick={() => {
                  if (validateStep3()) {
                    handleNextStep();
                  }
                }}
              >
                Siguiente
              </button>
            </div>
          </div>
        )}

        {step === 4 && (
          <div>
            <h2 className="text-xl font-bold mb-4">Revisión de Llantas (Parte 2)</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {llantasParte2.map((llanta, index) => (
                <div key={llanta.id} className="mb-4">
                  <h3 className="font-bold">Llanta #{llanta.id}</h3>
                  <label className="inline-flex items-center mr-4">
                    <input
                      type="checkbox"
                      checked={llanta.fp}
                      onChange={(e) => {
                        const updatedLlantas = [...llantasParte2];
                        updatedLlantas[index] = { ...updatedLlantas[index], fp: e.target.checked };
                        setLlantasParte2(updatedLlantas);
                      }}
                    />
                    Falta de Presión (FP)
                  </label>
                  <label className="inline-flex items-center mr-4">
                    <input
                      type="checkbox"
                      checked={llanta.pe}
                      onChange={(e) => {
                        const updatedLlantas = [...llantasParte2];
                        updatedLlantas[index] = { ...updatedLlantas[index], pe: e.target.checked };
                        setLlantasParte2(updatedLlantas);
                      }}
                    />
                    Presión Excesiva (PE)
                  </label>
                  <label className="inline-flex items-center mr-4">
                    <input
                      type="checkbox"
                      checked={llanta.pa}
                      onChange={(e) => {
                        const updatedLlantas = [...llantasParte2];
                        updatedLlantas[index] = { ...updatedLlantas[index], pa: e.target.checked };
                        setLlantasParte2(updatedLlantas);
                      }}
                    />
                    Presión Adecuada (PA)
                  </label>
                  <label className="inline-flex items-center">
                    <input
                      type="checkbox"
                      checked={llanta.desgaste}
                      onChange={(e) => {
                        const updatedLlantas = [...llantasParte2];
                        updatedLlantas[index] = { ...updatedLlantas[index], desgaste: e.target.checked };
                        setLlantasParte2(updatedLlantas);
                      }}
                    />
                    Indicador de Desgaste
                  </label>

                  {(llanta.fp || llanta.pe) && (
                    <div className="mt-2">
                      <label className="block font-bold">Observación:</label>
                      <textarea
                        value={llanta.observacion}
                        onChange={(e) => {
                          const updatedLlantas = [...llantasParte2];
                          updatedLlantas[index] = { ...updatedLlantas[index], observacion: e.target.value };
                          setLlantasParte2(updatedLlantas);
                        }}
                        className={`mt-1 p-2 border rounded w-full ${!llanta.observacion.trim() ? 'border-red-500' : ''}`}
                        placeholder={!llanta.observacion ? 'Debe ingresar una observación si selecciona FP o PE' : ''}
                      />
                      {!llanta.observacion.trim() && (
                        <p className="text-red-500 mt-1">Es necesario ingresar una observación si marca FP o PE.</p>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
            <div className="flex justify-between">
              <button
                type="button"
                className="bg-gray-500 text-white px-4 py-2 rounded"
                onClick={handlePreviousStep}
              >
                Atrás
              </button>
              <button
                type="button"
                className="bg-blue-500 text-white px-4 py-2 rounded"
                onClick={() => {
                  if (validateStep4()) {
                    handleNextStep();
                  }
                }}
              >
                Siguiente
              </button>
            </div>
          </div>
        )}

        {step === 5 && (
          <div>
            <h2 className="text-xl font-bold mb-4">Revisión de Fluidos del Motor</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {fluidos.map((fluido) => (
                <div key={fluido.id} className="mb-4">
                  <h3 className="font-bold">{fluido.nombre}</h3>
                  <label className="inline-flex items-center mr-4">
                    <input
                      type="checkbox"
                      checked={fluido.requiere}
                      onChange={(e) => {
                        const updatedFluidos = [...fluidos];
                        updatedFluidos[fluido.id - 1] = { ...updatedFluidos[fluido.id - 1], requiere: e.target.checked };
                        setFluidos(updatedFluidos);
                      }}
                    />
                    Requiere
                  </label>
                  <label className="inline-flex items-center">
                    <input
                      type="checkbox"
                      checked={fluido.lleno}
                      onChange={(e) => {
                        const updatedFluidos = [...fluidos];
                        updatedFluidos[fluido.id - 1] = { ...updatedFluidos[fluido.id - 1], lleno: e.target.checked };
                        setFluidos(updatedFluidos);
                      }}
                    />
                    Lleno
                  </label>

                  {fluido.requiere && (
                    <div className="mt-2">
                      <label className="block font-bold">Observación:</label>
                      <textarea
                        value={fluido.observacion}
                        onChange={(e) => {
                          const updatedFluidos = [...fluidos];
                          updatedFluidos[fluido.id - 1] = { ...updatedFluidos[fluido.id - 1], observacion: e.target.value };
                          setFluidos(updatedFluidos);
                        }}
                        className={`mt-1 p-2 border rounded w-full ${!fluido.observacion.trim() ? 'border-red-500' : ''}`}
                        placeholder={!fluido.observacion ? 'Debe ingresar una observación si selecciona Requiere' : ''}
                      />
                      {!fluido.observacion.trim() && (
                        <p className="text-red-500 mt-1">Es necesario ingresar una observación si marca "Requiere".</p>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
            <div className="flex justify-between">
              <button
                type="button"
                className="bg-gray-500 text-white px-4 py-2 rounded"
                onClick={handlePreviousStep}
              >
                Atrás
              </button>
              <button
                type="button"
                className="bg-blue-500 text-white px-4 py-2 rounded"
                onClick={() => {
                  if (validateStep5()) {
                    handleNextStep();
                  }
                }}
              >
                Siguiente
              </button>
            </div>
          </div>
        )}

        {step === 6 && (
          <div>
            <h2 className="text-xl font-bold mb-4">Parámetros Visuales del Motor</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {parametrosVisuales.map((parametro) => (
                <div key={parametro.id} className="mb-4">
                  <h3 className="font-bold">{parametro.nombre}</h3>
                  <label className="inline-flex items-center mr-4">
                    <input
                      type="checkbox"
                      checked={parametro.si}
                      onChange={(e) => {
                        const updatedParametros = [...parametrosVisuales];
                        updatedParametros[parametro.id - 1] = { ...updatedParametros[parametro.id - 1], si: e.target.checked, no: !e.target.checked };
                        setParametrosVisuales(updatedParametros);
                      }}
                    />
                    Funciona Correctamente (SI)
                  </label>
                  <label className="inline-flex items-center">
                    <input
                      type="checkbox"
                      checked={parametro.no}
                      onChange={(e) => {
                        const updatedParametros = [...parametrosVisuales];
                        updatedParametros[parametro.id - 1] = { ...updatedParametros[parametro.id - 1], no: e.target.checked, si: !e.target.checked };
                        setParametrosVisuales(updatedParametros);
                      }}
                    />
                    Funciona Correctamente (NO)
                  </label>

                  {parametro.no && (
                    <div className="mt-2">
                      <label className="block font-bold">Observación:</label>
                      <textarea
                        value={parametro.observacion}
                        onChange={(e) => {
                          const updatedParametros = [...parametrosVisuales];
                          updatedParametros[parametro.id - 1] = { ...updatedParametros[parametro.id - 1], observacion: e.target.value };
                          setParametrosVisuales(updatedParametros);
                        }}
                        className={`mt-1 p-2 border rounded w-full ${!parametro.observacion.trim() ? 'border-red-500' : ''}`}
                        placeholder={!parametro.observacion ? 'Debe ingresar una observación si selecciona NO' : ''}
                      />
                      {!parametro.observacion.trim() && (
                        <p className="text-red-500 mt-1">Es necesario ingresar una observación si marca "NO".</p>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
            <div className="flex justify-between">
              <button
                type="button"
                className="bg-gray-500 text-white px-4 py-2 rounded"
                onClick={handlePreviousStep}
              >
                Atrás
              </button>
              <button
                type="button"
                className="bg-blue-500 text-white px-4 py-2 rounded"
                onClick={() => {
                  if (validateStep6()) {
                    handleNextStep();
                  }
                }}
              >
                Siguiente
              </button>
            </div>
          </div>
        )}

        {step === 7 && (
          <div>
            <h2 className="text-xl font-bold mb-4">Revisión de Luces</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {luces.map((luz) => (
                <div key={luz.id} className="mb-4">
                  <h3 className="font-bold">{luz.nombre}</h3>
                  <label className="inline-flex items-center mr-4">
                    <input
                      type="checkbox"
                      checked={luz.funcionaSi}
                      onChange={(e) => {
                        const updatedLuces = [...luces];
                        updatedLuces[luz.id - 1] = { ...updatedLuces[luz.id - 1], funcionaSi: e.target.checked, funcionaNo: !e.target.checked };
                        setLuces(updatedLuces);
                      }}
                    />
                    Funciona (SI)
                  </label>
                  <label className="inline-flex items-center">
                    <input
                      type="checkbox"
                      checked={luz.funcionaNo}
                      onChange={(e) => {
                        const updatedLuces = [...luces];
                        updatedLuces[luz.id - 1] = { ...updatedLuces[luz.id - 1], funcionaNo: e.target.checked, funcionaSi: !e.target.checked };
                        setLuces(updatedLuces);
                      }}
                    />
                    Funciona (NO)
                  </label>

                  {luz.funcionaNo && (
                    <div className="mt-2">
                      <label className="block font-bold">Observación:</label>
                      <textarea
                        value={luz.observacion}
                        onChange={(e) => {
                          const updatedLuces = [...luces];
                          updatedLuces[luz.id - 1] = { ...updatedLuces[luz.id - 1], observacion: e.target.value };
                          setLuces(updatedLuces);
                        }}
                        className={`mt-1 p-2 border rounded w-full ${!luz.observacion.trim() ? 'border-red-500' : ''}`}
                        placeholder={!luz.observacion ? 'Debe ingresar una observación si selecciona NO' : ''}
                      />
                      {!luz.observacion.trim() && (
                        <p className="text-red-500 mt-1">Es necesario ingresar una observación si marca "Funciona (NO)".</p>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
            <div className="flex justify-between">
              <button
                type="button"
                className="bg-gray-500 text-white px-4 py-2 rounded"
                onClick={handlePreviousStep}
              >
                Atrás
              </button>
              <button
                type="button"
                className="bg-blue-500 text-white px-4 py-2 rounded"
                onClick={() => {
                  if (validateStep7()) {
                    handleNextStep();
                  }
                }}
              >
                Siguiente
              </button>
            </div>
          </div>
        )}

        {step === 8 && (
          <div>
            <h2 className="text-xl font-bold mb-4">Revisión de Insumos</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {insumos.map((insumo) => (
                <div key={insumo.id} className="mb-4">
                  <h3 className="font-bold">{insumo.nombre}</h3>
                  <label className="inline-flex items-center mr-4">
                    <input
                      type="checkbox"
                      checked={insumo.disponibleSi}
                      onChange={(e) => {
                        const updatedInsumos = [...insumos];
                        updatedInsumos[insumo.id - 1] = { ...updatedInsumos[insumo.id - 1], disponibleSi: e.target.checked, disponibleNo: !e.target.checked };
                        setInsumos(updatedInsumos);
                      }}
                    />
                    Disponible (SI)
                  </label>
                  <label className="inline-flex items-center">
                    <input
                      type="checkbox"
                      checked={insumo.disponibleNo}
                      onChange={(e) => {
                        const updatedInsumos = [...insumos];
                        updatedInsumos[insumo.id - 1] = { ...updatedInsumos[insumo.id - 1], disponibleNo: e.target.checked, disponibleSi: !e.target.checked };
                        setInsumos(updatedInsumos);
                      }}
                    />
                    Disponible (NO)
                  </label>
                </div>
              ))}
            </div>
            <div className="flex justify-between">
              <button
                type="button"
                className="bg-gray-500 text-white px-4 py-2 rounded"
                onClick={handlePreviousStep}
              >
                Atrás
              </button>
              <button
                type="button"
                className="bg-blue-500 text-white px-4 py-2 rounded"
                onClick={() => {
                  if (validateStep8()) {
                    handleNextStep();
                  }
                }}
              >
                Siguiente
              </button>
            </div>
          </div>
        )}

        {step === 9 && (
          <div>
            <h2 className="text-xl font-bold mb-4">Revisión de Documentación</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {documentacion.map((doc) => (
                <div key={doc.id} className="mb-4">
                  <h3 className="font-bold">{doc.nombre}</h3>
                  <label className="inline-flex items-center mr-4">
                    <input
                      type="checkbox"
                      checked={doc.disponibleSi}
                      onChange={(e) => {
                        const updatedDocumentacion = [...documentacion];
                        updatedDocumentacion[doc.id - 1] = { ...updatedDocumentacion[doc.id - 1], disponibleSi: e.target.checked, disponibleNo: !e.target.checked };
                        setDocumentacion(updatedDocumentacion);
                      }}
                    />
                    Disponible (SI)
                  </label>
                  <label className="inline-flex items-center">
                    <input
                      type="checkbox"
                      checked={doc.disponibleNo}
                      onChange={(e) => {
                        const updatedDocumentacion = [...documentacion];
                        updatedDocumentacion[doc.id - 1] = { ...updatedDocumentacion[doc.id - 1], disponibleNo: e.target.checked, disponibleSi: !e.target.checked };
                        setDocumentacion(updatedDocumentacion);
                      }}
                    />
                    Disponible (NO)
                  </label>
                </div>
              ))}
            </div>
            <div className="flex justify-between">
              <button
                type="button"
                className="bg-gray-500 text-white px-4 py-2 rounded"
                onClick={handlePreviousStep}
              >
                Atrás
              </button>
              <button
                type="button"
                className="bg-blue-500 text-white px-4 py-2 rounded"
                onClick={() => {
                  if (validateStep9()) {
                    handleNextStep();
                  }
                }}
              >
                Siguiente
              </button>
            </div>
          </div>
        )}

        {step === 10 && (
          <div>
            <h2 className="text-xl font-bold mb-4">Parámetros de Daños en Carrocería</h2>
            <div className="flex justify-between space-x-4">
              <img src={frontal} alt="Vista Frontal" className="w-1/3" />
              <img src={trasera} alt="Vista Posterior" className="w-1/3" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {danosCarroceria.map((danos, index) => (
                <div key={index} className="mb-4">
                  <h3 className="font-bold">Vista {danos.vista}</h3>
                  <label className="inline-flex items-center mr-4">
                    <input
                      type="checkbox"
                      checked={danos.rayones}
                      onChange={(e) => {
                        const updatedDanos = [...danosCarroceria];
                        updatedDanos[index] = { ...updatedDanos[index], rayones: e.target.checked };
                        setDanosCarroceria(updatedDanos);
                      }}
                    />
                    Rayones (X)
                  </label>
                  <label className="inline-flex items-center mr-4">
                    <input
                      type="checkbox"
                      checked={danos.golpes}
                      onChange={(e) => {
                        const updatedDanos = [...danosCarroceria];
                        updatedDanos[index] = { ...updatedDanos[index], golpes: e.target.checked };
                        setDanosCarroceria(updatedDanos);
                      }}
                    />
                    Golpe (/)
                  </label>
                  <label className="inline-flex items-center mr-4">
                    <input
                      type="checkbox"
                      checked={danos.quebrado}
                      onChange={(e) => {
                        const updatedDanos = [...danosCarroceria];
                        updatedDanos[index] = { ...updatedDanos[index], quebrado: e.target.checked };
                        setDanosCarroceria(updatedDanos);
                      }}
                    />
                    Quebrado (O)
                  </label>
                  <label className="inline-flex items-center">
                    <input
                      type="checkbox"
                      checked={danos.faltante}
                      onChange={(e) => {
                        const updatedDanos = [...danosCarroceria];
                        updatedDanos[index] = { ...updatedDanos[index], faltante: e.target.checked };
                        setDanosCarroceria(updatedDanos);
                      }}
                    />
                    Faltante (*)
                  </label>
                </div>
              ))}
            </div>

            <div className="flex justify-between">
              <button
                type="button"
                className="bg-gray-500 text-white px-4 py-2 rounded"
                onClick={handlePreviousStep}
              >
                Atrás
              </button>
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Guardando...' : 'Guardar'}
              </button>
            </div>
          </div>
        )}

      </form>

    </div>
  );
}

export default Registro;
