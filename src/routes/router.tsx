import { createBrowserRouter } from "react-router-dom";
// import Home from "../views/Home";
// import Inspeccion from '../views/Inspeccion';
// import Fallas from "../views/Fallas";
// import Salidas from "../views/Salidas";
import RegistroInspeccionSalida from "../views/InsRegistroSalida";



const router = createBrowserRouter([
  { path: "/registro-inspeccion-salida", element: <RegistroInspeccionSalida /> },
  // { path: "/home", element: <Home /> },
  // { path: "/inspeccion", element: <Inspeccion /> },
  // { path: "/fallas", element: <Fallas /> },
  // { path: "/salidas", element: <Salidas/> },
]);

export default router;



