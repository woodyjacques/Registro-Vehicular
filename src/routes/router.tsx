import { createBrowserRouter } from "react-router-dom";
import Home from "../views/Home";
import Inspeccion from '../views/Inspeccion';
import Registro from '../views/Registro';
import Fallas from "../views/Fallas";
import Salidas from "../views/Salidas";


const router = createBrowserRouter([
  { path: "/", element: <Registro /> },
  { path: "/home", element: <Home /> },
  { path: "/inspeccion", element: <Inspeccion /> },
  { path: "/fallas", element: <Fallas /> },
  { path: "/salidas", element: <Salidas/> },
]);

export default router;



