import axios from 'axios';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../validation/url';
interface Registro {
    Conductor: string;
    Placa: string;
    Hora: string;
    Fecha: string;
    Sucursal: string;
    Alerta?: string;
}
function Salidas() {
    const [selectedPlaca, setSelectedPlaca] = useState('');
    const [fechaSalida, setFechaSalida] = useState('');
    const [horaSalida, setHoraSalida] = useState('');
    const [selectedSucursal, setSelectedSucursal] = useState('');
    const [datos, setDatos] = useState<Registro[]>([]);
    const [alerta, setAlerta] = useState('');
    const setLimpiar = () => {
        setSelectedPlaca('');
        setFechaSalida('');
        setHoraSalida('');
        setSelectedSucursal('');
        setAlerta('');
    };
    useEffect(() => {
        const obtenerDatos = async () => {
            try {
                const response = await axios.get(`${BASE_URL}/salidas/get-salidas`);
                setDatos(response.data);
            } catch (error) {
                console.error('Error al obtener los datos:', error);
            }
        };
        obtenerDatos();
    }, []);
    useEffect(() => {
        if (selectedPlaca && fechaSalida && horaSalida && selectedSucursal) {
            verificarSalida();
        }
    }, [selectedPlaca, fechaSalida, horaSalida, selectedSucursal]);
    const verificarSalida = async () => {
        const fechaSalidaFormateada = new Date(fechaSalida).toISOString().split('T')[0];
        const registroPendiente = datos.find(fila =>
            fila.Placa === selectedPlaca &&
            fila.Fecha === fechaSalidaFormateada &&
            fila.Hora === horaSalida &&
            fila.Sucursal === selectedSucursal
        );
        if (!registroPendiente) {
            const mensajeAlerta = `El vehículo con placa ${selectedPlaca} no tiene un registro de salida para la fecha, hora y sucursal seleccionadas.`;
            setAlerta(mensajeAlerta);
            const registroVehiculo = datos.find(fila => fila.Placa === selectedPlaca);
            const data = {
                conductor: registroVehiculo?.Conductor || 'Conductor no registrado',
                placa: selectedPlaca,
                horaSalida: horaSalida,
                fechaSalida: fechaSalida,
                sucursal: selectedSucursal,
                alerta: mensajeAlerta,
            };
            try {
                await axios.post(`${BASE_URL}/salidas/registrar-alerta`, data);
                alert('Alerta registrada correctamente en el sistema');
                setLimpiar();
            } catch (error) {
                console.error('Error al registrar la alerta:', error);
                alert('Error al registrar la alerta');
            }
        } else {
            setAlerta('');
        }
    };
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <h1 className="text-2xl font-bold mb-4">R04-PT-19 REVISIÓN DE VEHÍCULOS</h1>
            <form className="w-full max-w-md bg-white p-6 rounded shadow-md">
                {alerta && <div className="bg-red-200 text-red-800 p-2 rounded mb-4">{alerta}</div>}
                <label className="block mb-4">
                    Selecciona la placa
                    <select
                        className="mt-1 p-2 border rounded w-full"
                        value={selectedPlaca}
                        onChange={(e) => setSelectedPlaca(e.target.value)}
                        required
                    >
                        <option value="" disabled>Selecciona una placa</option>
                        {datos.map((fila, index) => (
                            <option key={index} value={fila.Placa}>{fila.Placa}</option>
                        ))}
                    </select>
                </label>
                <label className="block mb-4">
                    Fecha de salida
                    <input
                        type="date"
                        className="mt-1 p-2 border rounded w-full"
                        value={fechaSalida}
                        onChange={(e) => setFechaSalida(e.target.value)}
                        required
                    />
                </label>
                <label className="block mb-4">
                    Hora de salida
                    <input
                        type="time"
                        className="mt-1 p-2 border rounded w-full"
                        value={horaSalida}
                        onChange={(e) => setHoraSalida(e.target.value)}
                        required
                    />
                </label>
                <label className="block mb-4">
                    Selecciona la sucursal
                    <select
                        className="mt-1 p-2 border rounded w-full"
                        value={selectedSucursal}
                        onChange={(e) => setSelectedSucursal(e.target.value)}
                        required
                    >
                        <option value="" disabled>Selecciona una sucursal</option>
                        {Array.from(new Set(datos.map(fila => fila.Sucursal))).map((sucursal, index) => (
                            <option key={index} value={sucursal}>{sucursal}</option>
                        ))}
                    </select>
                </label>
                <div className="flex">
                    <button
                        type="button"
                        className="bg-red-500 text-white px-4 py-2 rounded w-full"
                        onClick={setLimpiar}
                    >
                        Cancelar
                    </button>
                </div>
            </form>
        </div>
    );
}
export default Salidas;