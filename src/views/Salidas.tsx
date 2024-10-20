import axios from 'axios';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from './url';

function Salidas() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [selectedPlaca, setSelectedPlaca] = useState('');
    const [fechaSalida, setFechaSalida] = useState('');
    const [datos, setDatos] = useState([]); 

    const navigate = useNavigate();

   
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

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        setIsSubmitting(true);

        const data = {
            placa: selectedPlaca,
            fechaSalida: fechaSalida,
        };

        try {
            await axios.post(`${BASE_URL}/salidas`, data);
            alert('Datos enviados correctamente');

            navigate('/inspeccion');
        } catch (error) {
            console.error('Error al enviar los datos:', error);
            alert('Error al enviar los datos');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
                <h1 className="text-2xl font-bold mb-4">Salidas de vehículo</h1>
                <form className="w-full max-w-md bg-white p-6 rounded shadow-md" onSubmit={handleSubmit}>
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
                                <option key={index} value={fila[1]}>{fila[1]}</option> 
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
        </div>
    );
}

export default Salidas;
