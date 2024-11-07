// StepSiete.tsx
import React from 'react';

interface Luz {
    id: number;
    nombre: string;
    funcionaSi: boolean;
    funcionaNo: boolean;
    observacion: string;
}

interface StepSieteProps {
    luces: Luz[];
    setLuces: (luces: Luz[]) => void;
    handlePreviousStep: () => void;
    handleNextStep: () => void;
}

function StepSiete({ luces, setLuces, handlePreviousStep, handleNextStep }: StepSieteProps) {

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

    return (
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
    );
};

export default StepSiete;
