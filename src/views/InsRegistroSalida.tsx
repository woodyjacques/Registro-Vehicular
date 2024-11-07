import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from './url';
import Indicador from "../assets/Indicador.png"
import frontal from "../assets/Frontal.png";
import trasera from "../assets/Trasera.png";
import StepUno from '../components/InsRegistroSalida/Step1';
import StepDos from '../components/InsRegistroSalida/Step2';
import StepTres from '../components/InsRegistroSalida/Step3';
import StepCuatro from '../components/InsRegistroSalida/Step4';
import StepCinco from '../components/InsRegistroSalida/Step5';
import StepSeis from '../components/InsRegistroSalida/Step6';
import StepSiete from '../components/InsRegistroSalida/Step7';
import StepOcho from '../components/InsRegistroSalida/Step8';
import StepNueve from '../components/InsRegistroSalida/Step9';
import StepDiez from '../components/InsRegistroSalida/Step10';

function RegistroInspeccionSalida() {

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

  const [observacionGeneralParte1, setObservacionGeneralParte1] = useState("");

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

  const [observacionGeneralParte2, setObservacionGeneralParte2] = useState("");

  const [fluidos, setFluidos] = useState(
    [
      { id: 1, nombre: 'Niveles de aceite de motor', requiere: false, lleno: false, observacion: '' },
      { id: 2, nombre: 'Niveles de líquido de freno', requiere: false, lleno: false, observacion: '' },
      { id: 3, nombre: 'Niveles de líquido de power steering', requiere: false, lleno: false, observacion: '' },
      { id: 4, nombre: 'Niveles de líquido de radiador (Coolant)', requiere: false, lleno: false, observacion: '' },
    ]
  );

  const [observacionGeneralFluido, setObservacionGeneralFluido] = useState("");

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
    { id: 4, vista: 'Lateral Derecha', rayones: false, golpes: false, quebrado: false, faltante: false }
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

      console.log(formData, "Datos llegando");
      // try {
      //   const response = await axios.post(`${BASE_URL}/register`, formData, {
      //     headers: {
      //       'Content-Type': 'multipart/form-data'
      //     }
      //   });

      //   if (response.data.message) {

      //     const dataToStore: Record<string, string> = {};
      //     formData.forEach((value, key) => {
      //       dataToStore[key] = value.toString();
      //     });

      //     localStorage.setItem('userData', JSON.stringify(dataToStore));
      //     alert(response.data.message);
      //     navigate('/home');
      //   }
      // } catch (error) {
      //   console.error(error);
      //   alert('Error al registrar los datos');
      //   resetForm();
      // } finally {
      //   setIsSubmitting(false);
      // }
    }
  };

  const handleNextStep = () => {
    setStep(step + 1);
  };

  const handlePreviousStep = () => {
    setStep(step - 1);
  };

  const totalSteps = 10;

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

      <div className="w-full max-w-3xl bg-white p-6 rounded shadow-md">

        {step === 1 && (
          <StepUno
            sucursal={sucursal}
            setSucursal={setSucursal}
            onNext={handleNextStep}
          />
        )}

        {step === 2 && (
          <StepDos
            placa={placa} setPlaca={setPlaca}
            conductor={conductor} setConductor={setConductor}
            tipoVehiculo={tipoVehiculo} setTipoVehiculo={setTipoVehiculo}
            odometroSalida={odometroSalida} setOdometroSalida={setOdometroSalida}
            onPrevious={handlePreviousStep} onNext={handleNextStep} datos={datos}
          />
        )}

        {step === 3 && (
          <StepTres
            llantasParte1={llantasParte1}
            setLlantasParte1={setLlantasParte1}
            observacionGeneral={observacionGeneralParte1}
            setObservacionGeneral={setObservacionGeneralParte1}
            handlePreviousStep={handlePreviousStep}
            handleNextStep={handleNextStep}
          />
        )}

        {step === 4 && (
          <StepCuatro
            llantasParte2={llantasParte2}
            setLlantasParte2={setLlantasParte2}
            observacionGeneral={observacionGeneralParte2}
            setObservacionGeneral={setObservacionGeneralParte2}
            handlePreviousStep={handlePreviousStep}
            handleNextStep={handleNextStep}
          />
        )}

        {step === 5 && (
          <StepCinco
            fluidos={fluidos}
            setFluidos={setFluidos}
            observacionGeneral={observacionGeneralFluido}
            setObservacionGeneral={setObservacionGeneralFluido}
            handlePreviousStep={handlePreviousStep}
            handleNextStep={handleNextStep}
          />
        )}

        {step === 6 && (
          <StepSeis
            parametrosVisuales={parametrosVisuales}
            setParametrosVisuales={setParametrosVisuales}
            handleNextStep={handleNextStep}
            handlePreviousStep={handlePreviousStep}
          />
        )}

        {step === 7 && (
          <StepSiete
            luces={luces}
            setLuces={setLuces}
            handleNextStep={handleNextStep}
            handlePreviousStep={handlePreviousStep}
          />
        )}

        {step === 8 && (
          <StepOcho
            insumos={insumos}
            setInsumos={setInsumos}
            handleNextStep={handleNextStep}
            handlePreviousStep={handlePreviousStep}
          />
        )}

        {step === 9 && (
          <StepNueve
            documentacion={documentacion}
            setDocumentacion={setDocumentacion}
            handleNextStep={handleNextStep}
            handlePreviousStep={handlePreviousStep}
          />
        )}

        {step === 10 && (
          <StepDiez
            danosCarroceria={danosCarroceria}
            setDanosCarroceria={setDanosCarroceria}
            handlePreviousStep={handlePreviousStep}
            handleSubmit={handleSubmit}
            isSubmitting={isSubmitting}
          />
        )}
      </div>

    </div>
  );
}

export default RegistroInspeccionSalida;
