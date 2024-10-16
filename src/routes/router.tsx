import { createBrowserRouter } from "react-router-dom";
import Home from "../views/Home";
import Registro from '../views/Registro';
import Inspeccion from '../views/Inspeccion';
import Generacion from '../views/Generacion';

const router = createBrowserRouter([
  { path: "/", element: <Home /> },
  { path: "/registro-entrada", element: <Registro tipo="Entrada" /> },
  { path: "/registro-salida", element: <Registro tipo="Salida" /> },
  { path: "/inspeccion", element: <Inspeccion /> },
  { path: "/reporte", element: <Generacion /> }
]);

export default router;



