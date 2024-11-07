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

    return (
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
    );
};

export default StepSeis;
