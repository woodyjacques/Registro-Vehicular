
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
                        "(SU01) Casa Matriz Mañanitas",
                        "(SU02) Chiriquí",
                        "(SU03) Chorrera",
                        "(SU04) Chorrera Planta",
                        "(SU05) Colón",
                        "(SU06) Juan Díaz",
                        "(SU07) Aguadulce",
                        "(SU08) Los Santos"
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
                            {nombre}
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


// Tengo este archivo de excel que aparece en la imagen, lo hice con el objetivo de almacenar numeros consecutivos 0,1, 2, 3 de forma independiento de la sucursal, entonces en esta funcion quiero que almacenes esos numeros consecutivos depediendo la sucursar recuerda que debe empesar desde cero y antes de ingresar por favor verifique si existe ese numero consecutivo de esta sucursal espesifico 