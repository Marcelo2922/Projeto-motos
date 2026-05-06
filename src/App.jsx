import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "./App.css";

import Cabecalho from "./componentes/Cabecalho/Cabecalho";
import Rodape from "./componentes/Rodape/Rodape";

import ListaProdutos from "./paginas/ListaProdutos/ListaProdutos";
import PaginaInicial from "./paginas/PaginaInicial/PaginaInicial";
import CadastroMoto from "./paginas/CadastroMoto/CadastroMoto";

const roteador = createBrowserRouter([
  {
    path: "/",
    element: <PaginaInicial />,
  },
  {
    path: "/lista-produtos",
    element: <ListaProdutos />,
  },
  {
    path: "/cadastro-moto/:motoId?",
    element: <CadastroMoto />,
  },
  {
    path: "*",
    element: <h3>Página não encontrada!!</h3>,
  },
]);

function App() {
  return (
    <>
      <Cabecalho />
      <RouterProvider router={roteador} />
      <Rodape />
      <ToastContainer />
    </>
  );
}

export default App;