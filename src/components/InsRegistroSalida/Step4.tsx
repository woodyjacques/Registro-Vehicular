import React from 'react';

interface Llantas {
    id: number;
    fp: boolean;
    pe: boolean;
    pa: boolean;
    desgaste: boolean;
}

interface StepCuatroProps {
    llantasParte2: Llantas[];
    setLlantasParte2: (llantas: Llantas[]) => void;
    observacionGeneralLlantas: string;
    setObservacionGeneralLlantas: (observacion: string) => void;
    handlePreviousStep: () => void;
    handleNextStep: () => void;
}

function StepCuatro({ llantasParte2, setLlantasParte2, observacionGeneralLlantas, setObservacionGeneralLlantas, handlePreviousStep, handleNextStep }: StepCuatroProps) {

    const handleOptionChange = (index: number, option: 'fp' | 'pe' | 'pa' | 'desgaste') => {
        const updatedLlantas = llantasParte2.map((llanta, i) =>
            i === index
                ? { id: llanta.id, fp: option === 'fp', pe: option === 'pe', pa: option === 'pa', desgaste: option === 'desgaste' }
                : llanta
        );
        setLlantasParte2(updatedLlantas);
    };

    const validateStep4 = () => {
        const isInvalid = llantasParte2.some((llanta) => {
            const noOptionSelected = !llanta.fp && !llanta.pe && !llanta.pa && !llanta.desgaste;
            return noOptionSelected;
        });

        if (isInvalid) {
            alert('Debe seleccionar al menos una opción (FP, PE, PA o desgaste) para cada llanta.');
            return false;
        }

        const requiresObservation = llantasParte2.some((llanta) => llanta.fp || llanta.pe);

        if (requiresObservation && !observacionGeneralLlantas.trim()) {
            alert('Debe ingresar una observación general si marca FP o PE en alguna llanta.');
            return false;
        }

        return true;
    };

    return (
        <div>
            <h2 className="text-xl font-bold mb-4">Revisión de Llantas (Parte 2)</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {llantasParte2.map((llanta, index) => (
                    <div key={llanta.id} className="mb-4">
                        <h3 className="font-bold">Llanta #{llanta.id}</h3>
                        <label className="inline-flex items-center mr-4">
                            <input
                                type="radio"
                                name={`llanta-${llanta.id}`}
                                checked={llanta.fp}
                                onChange={() => handleOptionChange(index, 'fp')}
                            />
                            Falta de Presión (FP)
                        </label>
                        <label className="inline-flex items-center mr-4">
                            <input
                                type="radio"
                                name={`llanta-${llanta.id}`}
                                checked={llanta.pe}
                                onChange={() => handleOptionChange(index, 'pe')}
                            />
                            Presión Excesiva (PE)
                        </label>
                        <label className="inline-flex items-center mr-4">
                            <input
                                type="radio"
                                name={`llanta-${llanta.id}`}
                                checked={llanta.pa}
                                onChange={() => handleOptionChange(index, 'pa')}
                            />
                            Presión Adecuada (PA)
                        </label>
                        <label className="inline-flex items-center">
                            <input
                                type="radio"
                                name={`llanta-${llanta.id}`}
                                checked={llanta.desgaste}
                                onChange={() => handleOptionChange(index, 'desgaste')}
                            />
                            Indicador de Desgaste
                        </label>
                    </div>
                ))}
            </div>

            <div className="mt-4">
                <label className="block font-bold mb-2">Observación General:</label>
                <textarea
                    value={observacionGeneralLlantas}
                    onChange={(e) => setObservacionGeneralLlantas(e.target.value)}
                    className="mt-1 p-2 border rounded w-full"
                    placeholder="Ingrese una observación general si marca FP o PE en alguna llanta"
                    disabled={!llantasParte2.some((llanta) => llanta.fp || llanta.pe)}
                />
            </div>

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
                        if (validateStep4()) {
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

export default StepCuatro;
