/* eslint-disable react-refresh/only-export-components */

import {
  createContext,
  useContext,
  useState,
} from "react";

import {
  buscarUsuarioLogado,
} from "../servicos/usuarios";

// Criação do contexto global da aplicação
const AppContext = createContext();

const AppContextProvider = ({
  children,
}) => {

  // Busca o usuário salvo na sessão
  const usuarioLogadoDefault =
    buscarUsuarioLogado();

  // Estado que controla o usuário autenticado
  const [
    usuarioLogado,
    setUsuarioLogado,
  ] = useState(
    usuarioLogadoDefault
  );

  return (

    <AppContext.Provider
      value={{
        usuarioLogado,
        setUsuarioLogado,
      }}
    >

      {/* Componentes filhos terão acesso ao contexto */}
      {children}

    </AppContext.Provider>

  );
};

// Hook personalizado para acessar o contexto
export const useAppContext = () => {

  const context =
    useContext(AppContext);

  return context;
};

export default AppContextProvider;