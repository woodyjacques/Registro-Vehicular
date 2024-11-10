import { useState } from "react";

function Variables4(){
    
    const [luces, setLuces] = useState(
        [
          { id: 1, nombre: 'Medias', funcionaSi: false, funcionaNo: false, },
          { id: 2, nombre: 'Retroceso', funcionaSi: false, funcionaNo: false, },
          { id: 3, nombre: 'Derecho', funcionaSi: false, funcionaNo: false, },
          { id: 4, nombre: 'Izquierdo', funcionaSi: false, funcionaNo: false, },
          { id: 5, nombre: 'Intermitentes', funcionaSi: false, funcionaNo: false, },
          { id: 6, nombre: 'Stops', funcionaSi: false, funcionaNo: false, },
          { id: 7, nombre: 'Cabina', funcionaSi: false, funcionaNo: false, },
          { id: 8, nombre: 'Escolta', funcionaSi: false, funcionaNo: false, },
        ]
      );
    
      const [insumos, setInsumos] = useState(
        [
          { id: 1, nombre: 'Primeros auxilios', disponibleSi: false, disponibleNo: false },
          { id: 2, nombre: 'Conos', disponibleSi: false, disponibleNo: false },
          { id: 3, nombre: 'Triángulos', disponibleSi: false, disponibleNo: false },
          { id: 4, nombre: 'Cuñas', disponibleSi: false, disponibleNo: false },
          { id: 5, nombre: 'Extintor', disponibleSi: false, disponibleNo: false },
          { id: 6, nombre: 'Llanta de repuesto', disponibleSi: false, disponibleNo: false },
          { id: 7, nombre: 'Gato', disponibleSi: false, disponibleNo: false },
          { id: 8, nombre: 'Carretilla, según equipo', disponibleSi: false, disponibleNo: false },
        ]
      );

    return{
        luces, setLuces, insumos, setInsumos
    }
}

export default Variables4;