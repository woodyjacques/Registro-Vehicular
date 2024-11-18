import { createBrowserRouter } from "react-router-dom";
import Home from "../views/Home";
import RegistroInspeccionSalida from "../views/InsRegistroSalida";
import RegistroInspeccionEntrada from "../views/InsRegistroEntrada";



const router = createBrowserRouter([
  { path: "/", element: <Home /> },
  { path: "/registro-inspeccion-salida", element: <RegistroInspeccionSalida /> },
  { path: "/registro-inspeccion-entrada", element: <RegistroInspeccionEntrada /> },
]);

export default router;



