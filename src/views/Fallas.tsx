import React, { useState } from 'react';
import axios from 'axios';
import { Document, Packer, Paragraph, TextRun } from 'docx';
import { BASE_URL } from './url';
import { useNavigate } from 'react-router-dom';

function Fallas() {
    const [formData, setFormData] = useState({
        fecha: '',
        nombreConductor: '',
        numeroVehiculo: '',
        numeroPlaca: '',
        detalleFalla: '',
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e:any) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const navigate = useNavigate();

    const handleSendEmail = async () => {

        const doc = new Document({
            sections: [
                {
                    children: [
                        new Paragraph({
                            children: [
                                new TextRun({
                                    text: "Falla Vehicular",
                                    bold: true,
                                    size: 28,
                                }),
                            ],
                            alignment: "center",
                        }),
                        new Paragraph({ text: "\n" }),
                        new Paragraph({
                            children: [
                                new TextRun({ text: "Fecha: ", bold: true }),
                                new TextRun({ text: formData.fecha }),
                                new TextRun({ text: "          Nombre legible del Conductor: ", bold: true }),
                                new TextRun({ text: formData.nombreConductor }),
                            ],
                        }),
                        new Paragraph({
                            children: [
                                new TextRun({ text: "N° de Vehículo: ", bold: true }),
                                new TextRun({ text: formData.numeroVehiculo }),
                                new TextRun({ text: "          N° Placa: ", bold: true }),
                                new TextRun({ text: formData.numeroPlaca }),
                            ],
                        }),
                        new Paragraph({ text: "\n" }),
                        new Paragraph({ text: "Detalle de la Falla Vehicular detectada:" }),
                        new Paragraph({ text: formData.detalleFalla, spacing: { line: 240 } }),
                    ],
                },
            ],
        });

        const blob = await Packer.toBlob(doc);

        const file = new File([blob], "Falla_Vehicular.docx", {
            type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        });

        const formDataToSend = new FormData();
        formDataToSend.append("file", file);
        setIsSubmitting(true);

        try {
            await axios.post(`${BASE_URL}/reporte`, formDataToSend, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            alert("Documento enviado con éxito.");
            navigate("/");
        } catch (error) {
            console.error("Error al enviar el correo:", error);
            alert("Hubo un error al enviar el correo.");
        }finally{
            setIsSubmitting(false);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
            <h1 className="text-2xl font-bold mb-4 text-center">R04-PT-19 REVISIÓN DE VEHÍCULOS</h1>
            <form className="w-full max-w-3xl bg-white p-6 rounded shadow-md space-y-4" onSubmit={(e) => e.preventDefault()}>

                <div className="flex justify-between space-x-4">
                    <div className="w-1/2">
                        <label className="block text-gray-700">Fecha:</label>
                        <input
                            type="date"
                            name="fecha"
                            value={formData.fecha}
                            onChange={handleChange}
                            className="w-full mt-1 p-2 border border-gray-300 rounded"
                        />
                    </div>
                    <div className="w-1/2">
                        <label className="block text-gray-700">Nombre legible del Conductor:</label>
                        <input
                            type="text"
                            name="nombreConductor"
                            value={formData.nombreConductor}
                            onChange={handleChange}
                            className="w-full mt-1 p-2 border border-gray-300 rounded"
                            placeholder="Nombre del Conductor"
                        />
                    </div>
                </div>

                <div className="flex justify-between space-x-4">
                    <div className="w-1/2">
                        <label className="block text-gray-700">N° de Vehículo:</label>
                        <input
                            type="text"
                            name="numeroVehiculo"
                            value={formData.numeroVehiculo}
                            onChange={handleChange}
                            className="w-full mt-1 p-2 border border-gray-300 rounded"
                            placeholder="Número de Vehículo"
                        />
                    </div>
                    <div className="w-1/2">
                        <label className="block text-gray-700">N° Placa:</label>
                        <input
                            type="text"
                            name="numeroPlaca"
                            value={formData.numeroPlaca}
                            onChange={handleChange}
                            className="w-full mt-1 p-2 border border-gray-300 rounded"
                            placeholder="Número de Placa"
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-gray-700">Detalle de la Falla Vehicular detectada:</label>
                    <textarea
                        name="detalleFalla"
                        value={formData.detalleFalla}
                        onChange={handleChange}
                        className="w-full mt-1 p-2 border border-gray-300 rounded h-48"
                        placeholder="Describa la falla vehicular detectada aquí"
                    ></textarea>
                </div>

                <div className="flex justify-center">
                    <button
                        type="button"
                        onClick={handleSendEmail}
                        className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 transition-colors duration-300" disabled={isSubmitting}
                        >
                          {isSubmitting ? 'Enviando...' : 'Enviar'}
                    </button>
                </div>
            </form>
        </div>
    );
}

export default Fallas;
