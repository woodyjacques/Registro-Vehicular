
type Step1Props = {
    sucursal: string;
    setSucursal: (value: string) => void;
    onNext: () => void;
};

function StepUno({ sucursal, setSucursal, onNext }: Step1Props) {
    const validateStep1 = () => {
        if (!sucursal) {
            alert('Debe seleccionar una sucursal.');
            return false;
        }
        return true;
    };

    return (
        <div>
            <div className="mb-4">
                <label className="block mb-2 font-bold">A qué sucursal pertenece:</label>
                <div className="flex flex-col space-y-2">
                    {[
                        "Casa Matriz Mañanitas",
                        "Chiriquí",
                        "Chorrera",
                        "Chorrera Planta",
                        "Colón",
                        "Juan Díaz",
                        "Aguadulce",
                        "Los Santos"
                    ].map((nombre, index) => (
                        <label key={index} className="inline-flex items-center">
                            <input
                                type="radio"
                                name="sucursal"
                                value={nombre}
                                onChange={(e) => setSucursal(e.target.value)}
                                className="mr-2"
                                required
                            />
                            (SU0{index + 1}) {nombre}
                        </label>
                    ))}
                </div>
            </div>
            <div className="flex justify-between">
                <button
                    type="button"
                    className="bg-blue-500 text-white px-4 py-2 rounded"
                    onClick={() => {
                        if (validateStep1()) {
                            onNext();
                        }
                    }}
                >
                    Siguiente
                </button>
            </div>
        </div>
    );
}

export default StepUno;

