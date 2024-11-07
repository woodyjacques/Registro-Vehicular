interface Llantas {
    id: number;
    fp: boolean;
    pe: boolean;
    pa: boolean;
    desgaste: boolean;
    observacion: string;
}

interface StepTresProps {
    llantasParte1: Llantas[];
    setLlantasParte1: (llantas: Llantas[]) => void;
    observacionGeneral: string;
    setObservacionGeneral: (observacion: string) => void;
    handlePreviousStep: () => void;
    handleNextStep: () => void;
}

function StepTres({ llantasParte1, setLlantasParte1, observacionGeneral, setObservacionGeneral, handlePreviousStep, handleNextStep }: StepTresProps) {

    const handleOptionChange = (index: number, option: 'fp' | 'pe' | 'pa' | 'desgaste') => {
        const updatedLlantas = llantasParte1.map((llanta, i) => 
            i === index
                ? { id: llanta.id, fp: option === 'fp', pe: option === 'pe', pa: option === 'pa', desgaste: option === 'desgaste', observacion: llanta.observacion }
                : llanta
        );
        setLlantasParte1(updatedLlantas);
    };

    const validateStep3 = () => {
        const isInvalid = llantasParte1.some((llanta) => {
            const noOptionSelected = !llanta.fp && !llanta.pe && !llanta.pa && !llanta.desgaste;
            return noOptionSelected;
        });

        const requiresObservation = llantasParte1.some(llanta => llanta.fp || llanta.pe) && !observacionGeneral.trim();

        if (isInvalid) {
            alert('Debe seleccionar al menos una opción (FP, PE, PA o desgaste) para cada llanta.');
            return false;
        }

        if (requiresObservation) {
            alert('Debe ingresar una observación general si marca FP o PE en alguna llanta.');
            return false;
        }

        return true;
    };

    return (
        <div>
            <h2 className="text-xl font-bold mb-4">Revisión de Llantas (Parte 1)</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {llantasParte1.map((llanta, index) => (
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
                    value={observacionGeneral}
                    onChange={(e) => setObservacionGeneral(e.target.value)}
                    className="mt-1 p-2 border rounded w-full"
                    placeholder="Ingrese una observación general si marca FP o PE en alguna llanta"
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
                        if (validateStep3()) {
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

export default StepTres;
