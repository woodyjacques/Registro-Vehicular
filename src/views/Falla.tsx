import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { handleSubmitFallas } from "../validation/Fallas";

function Falla() {

    const [fecha, setFecha] = useState("");
    const [conductor, setConductor] = useState("");
    const [vehiculo, setVehiculo] = useState("");
    const [placa, setPlaca] = useState("");
    const [detalles, setDetalles] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const navigate = useNavigate();

    const handleSubmitFalla = async (event: FormEvent) => {
        event.preventDefault();
        setIsSubmitting(true);

        const Successful = await handleSubmitFallas(event, fecha, conductor, vehiculo, placa, detalles);

        if (Successful) {
            setTimeout(() => {
                navigate("/");
            }, 3000);
        }

        setIsSubmitting(false);
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
            <h1 className="text-2xl font-bold mb-4 text-center">R04-PT-19 REVISIÓN DE VEHÍCULOS</h1>
            <form
                onSubmit={handleSubmitFalla}
                className="w-full max-w-3xl bg-white p-6 rounded shadow-md space-y-4"
            >
                <div className="flex flex-col md:flex-row justify-between md:space-x-4 space-y-4 md:space-y-0">
                    <div className="w-full md:w-1/2">
                        <label className="block text-gray-700">Fecha:</label>
                        <input
                            value={fecha}
                            onChange={(e) => setFecha(e.target.value)}
                            type="date"
                            name="fecha"
                            className="w-full mt-1 p-2 border border-gray-300 rounded"
                        />
                    </div>
                    <div className="w-full md:w-1/2">
                        <label className="block text-gray-700">Nombre legible del Conductor:</label>
                        <input
                            value={conductor}
                            onChange={(e) => setConductor(e.target.value)}
                            type="text"
                            className="w-full mt-1 p-2 border border-gray-300 rounded"
                            placeholder="Nombre del Conductor"
                        />
                    </div>
                </div>

                <div className="flex flex-col md:flex-row justify-between md:space-x-4 space-y-4 md:space-y-0">
                    <div className="w-full md:w-1/2">
                        <label className="block text-gray-700">N° de Vehículo:</label>
                        <input
                            value={vehiculo}
                            onChange={(e) => setVehiculo(e.target.value)}
                            type="text"
                            className="w-full mt-1 p-2 border border-gray-300 rounded"
                            placeholder="Número de Vehículo"
                        />
                    </div>
                    <div className="w-full md:w-1/2">
                        <label className="block text-gray-700">N° Placa:</label>
                        <input
                            value={placa}
                            onChange={(e) => setPlaca(e.target.value)}
                            type="text"
                            className="w-full mt-1 p-2 border border-gray-300 rounded"
                            placeholder="Número de Placa"
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-gray-700">Detalle de la Falla Vehicular detectada:</label>
                    <textarea
                        value={detalles}
                        onChange={(e) => setDetalles(e.target.value)}
                        className="w-full mt-1 p-2 border border-gray-300 rounded h-48"
                        placeholder="Describa la falla vehicular detectada aquí"
                    ></textarea>
                </div>

                <div className="flex justify-center">
                    <button
                        type="submit"
                        className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 transition-colors duration-300"
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? "Enviando..." : "Enviar"}
                    </button>
                </div>
            </form>

        </div>
    );
}

export default Falla;
