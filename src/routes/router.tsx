import { createBrowserRouter } from "react-router-dom";
import Home from "../views/Home";
import Registro from '../views/Registro';
import Inspeccion from '../views/Inspeccion';
import Salidas from "../views/Salidas";

const router = createBrowserRouter([
  { path: "/", element: <Home /> },
  { path: "/registro-entrada", element: <Registro /> },
  { path: "/inspeccion", element: <Inspeccion /> },
  { path: "/salidas", element: <Salidas /> }
]);

export default router;



