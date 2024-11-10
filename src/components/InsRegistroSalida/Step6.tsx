import React, { useState } from 'react';

interface ParametroVisual {
    id: number;
    nombre: string;
    si: boolean;
    no: boolean;
    observacion: string;
}

interface StepSeisProps {
    parametrosVisuales: ParametroVisual[];
    setParametrosVisuales: (parametros: ParametroVisual[]) => void;
    handlePreviousStep: () => void;
    handleNextStep: () => void;
}

function StepSeis({ parametrosVisuales, setParametrosVisuales, handlePreviousStep, handleNextStep }: StepSeisProps) {
    const [observacionGeneral, setObservacionGeneral] = useState('');

    const validateStep6 = () => {
        const hasNoOption = parametrosVisuales.some((parametro) => parametro.no);
        const allOptionsSelected = parametrosVisuales.every((parametro) => parametro.si || parametro.no);

        if (!allOptionsSelected) {
            alert('Debe seleccionar al menos una opción ("SI" o "NO") para cada parámetro.');
            return false;
        }

        if (hasNoOption && !observacionGeneral.trim()) {
            alert('Debe agregar una observación general si alguno de los parámetros está marcado como "NO".');
            return false;
        }

        return true;
    };

    return (
        <div>
            <h2 className="text-xl font-bold mb-4">Parámetros Visuales del Motor</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {parametrosVisuales.map((parametro, index) => (
                    <div key={parametro.id} className="mb-4">
                        <h3 className="font-bold">{parametro.nombre}</h3>
                        <label className="inline-flex items-center mr-4">
                            <input
                                type="checkbox"
                                checked={parametro.si}
                                onChange={(e) => {
                                    const updatedParametros = [...parametrosVisuales];
                                    updatedParametros[index] = { ...parametro, si: e.target.checked, no: !e.target.checked };
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
                                    updatedParametros[index] = { ...parametro, no: e.target.checked, si: !e.target.checked };
                                    setParametrosVisuales(updatedParametros);
                                }}
                            />
                            Funciona Correctamente (NO)
                        </label>
                    </div>
                ))}
            </div>

            {/* Mostrar Observación General si algún parámetro tiene "NO" seleccionado */}
            {parametrosVisuales.some((parametro) => parametro.no) && (
                <div className="mt-4">
                    <label className="block font-bold">Observación General:</label>
                    <textarea
                        value={observacionGeneral}
                        onChange={(e) => setObservacionGeneral(e.target.value)}
                        className={`mt-1 p-2 border rounded w-full ${!observacionGeneral.trim() ? 'border-red-500' : ''}`}
                        placeholder="Debe ingresar una observación si algún parámetro está en 'NO'"
                    />
                    {!observacionGeneral.trim() && (
                        <p className="text-red-500 mt-1">Es necesario ingresar una observación si marca "NO" en algún parámetro.</p>
                    )}
                </div>
            )}

            <div className="flex justify-between mt-4">
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
    );
}

export default StepSeis;
