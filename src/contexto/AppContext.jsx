/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState } from "react";
import { buscarUsuarioLogado } from "../servicos/usuarios";

const AppContext = createContext();

const AppContextProvider = ({ children }) => {
  const usuarioLogadoDefault = buscarUsuarioLogado();
  const [usuarioLogado, setUsuarioLogado] = useState(usuarioLogadoDefault);

  return (
    <AppContext.Provider value={{ usuarioLogado, setUsuarioLogado }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  return context;
};

export default AppContextProvider;
