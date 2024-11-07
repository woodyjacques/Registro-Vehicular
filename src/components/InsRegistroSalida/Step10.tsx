// StepDiez.tsx
import React from 'react';

interface DanosCarroceria {
    id: number;
    vista: string;
    rayones: boolean;
    golpes: boolean;
    quebrado: boolean;
    faltante: boolean;
}

interface StepDiezProps {
    danosCarroceria: DanosCarroceria[];
    setDanosCarroceria: (danos: DanosCarroceria[]) => void;
    handlePreviousStep: () => void;
    handleSubmit: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
    isSubmitting: boolean;
}

const StepDiez: React.FC<StepDiezProps> = ({
    danosCarroceria,
    setDanosCarroceria,
    handlePreviousStep,
    handleSubmit,
    isSubmitting,}) => {

    return (
        <form onSubmit={handleSubmit}>
            <h2 className="text-xl font-bold mb-4">Parámetros de Daños en Carrocería</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {danosCarroceria.map((danos, index) => (
                    <div key={index} className="mb-4">
                        <h3 className="font-bold">Vista {danos.vista}</h3>
                        <label className="inline-flex items-center mr-4">
                            <input
                                type="checkbox"
                                checked={danos.rayones}
                                onChange={(e) => {
                                    const updatedDanos = [...danosCarroceria];
                                    updatedDanos[index] = { ...updatedDanos[index], rayones: e.target.checked };
                                    setDanosCarroceria(updatedDanos);
                                }}
                            />
                            Rayones (X)
                        </label>
                        <label className="inline-flex items-center mr-4">
                            <input
                                type="checkbox"
                                checked={danos.golpes}
                                onChange={(e) => {
                                    const updatedDanos = [...danosCarroceria];
                                    updatedDanos[index] = { ...updatedDanos[index], golpes: e.target.checked };
                                    setDanosCarroceria(updatedDanos);
                                }}
                            />
                            Golpe (/)
                        </label>
                        <label className="inline-flex items-center mr-4">
                            <input
                                type="checkbox"
                                checked={danos.quebrado}
                                onChange={(e) => {
                                    const updatedDanos = [...danosCarroceria];
                                    updatedDanos[index] = { ...updatedDanos[index], quebrado: e.target.checked };
                                    setDanosCarroceria(updatedDanos);
                                }}
                            />
                            Quebrado (O)
                        </label>
                        <label className="inline-flex items-center">
                            <input
                                type="checkbox"
                                checked={danos.faltante}
                                onChange={(e) => {
                                    const updatedDanos = [...danosCarroceria];
                                    updatedDanos[index] = { ...updatedDanos[index], faltante: e.target.checked };
                                    setDanosCarroceria(updatedDanos);
                                }}
                            />
                            Faltante (*)
                        </label>
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
                    type="submit"
                    className="bg-blue-500 text-white px-4 py-2 rounded"
                    disabled={isSubmitting}
                >
                    {isSubmitting ? 'Guardando...' : 'Guardar'}
                </button>
            </div>
        </form>

    );
};

export default StepDiez;
