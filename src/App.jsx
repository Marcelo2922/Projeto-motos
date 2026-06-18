import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "./App.css";

import Cabecalho from "./componentes/Cabecalho/Cabecalho";
import Rodape from "./componentes/Rodape/Rodape";
import ValidarAutenticacao from "./componentes/ValidarAutenticacao/ValidarAutenticacao";
import AppContextProvider from "./contexto/AppContext";


import ListaProdutos from "./paginas/ListaProdutos/ListaProdutos";
import PaginaInicial from "./paginas/PaginaInicial/PaginaInicial";
import CadastroMoto from "./paginas/CadastroMoto/CadastroMoto";
import Estoque from "./paginas/Estoque/Estoque";
import Login from "./paginas/Login/Login";
import NovoUsuario from "./paginas/NovoUsuario/NovoUsuario";
import PerfilUsuario from "./paginas/PerfilUsuario/PerfilUsuario";


const roteador = createBrowserRouter([
  {
    path: "login",
    element: <Login />,
  },
  {
    path: "novo-usuario",
    element: <NovoUsuario />,
  },
  {
    path: "",
    element: <ValidarAutenticacao />,
    children: [
  {
    path: "/",
    element: <PaginaInicial />,
  },
  {
   path: "meu-perfil",
   element: <PerfilUsuario />,
  },
  {
    path: "/lista-de-motos",
    element: <ListaProdutos />,
  },
  {
    path: "/Estoque",
    element: <Estoque />,
  },
  {
    path: "/cadastro-moto/:motoId?",
    element: <CadastroMoto />,
  },
],
  },
  {
    path: "*",
    element: <h3>Página não encontrada!!</h3>,
  },

]);

function App() {
  return (
    <>
      <AppContextProvider>
        <Cabecalho />
        <RouterProvider router={roteador} />
        <Rodape />
        <ToastContainer />
      </AppContextProvider>
    </>
  );
}

export default App;