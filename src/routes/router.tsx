import { createBrowserRouter } from "react-router-dom";
import Home from "../views/Home";
import Inspeccion from '../views/Inspeccion';
// import Salidas from "../views/Salidas";
import Registro from '../views/Registro';


const router = createBrowserRouter([
  { path: "/", element: <Registro /> },
  { path: "/home", element: <Home /> },
  { path: "/inspeccion", element: <Inspeccion /> },
  // { path: "/registro-entrada", element: <Registro /> },

  // { path: "/salidas", element: <Salidas /> }
]);

export default router;



