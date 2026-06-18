import { useEffect } from "react";
import {
  Outlet,
  useNavigate,
} from "react-router-dom";
import { useAppContext } from "../../contexto/AppContext";

function ValidarAutenticacao() {

  // Hook para navegação entre páginas
  const navigate = useNavigate();

  // Obtém o usuário atualmente logado
  const { usuarioLogado } = useAppContext();

  // Verifica se existe usuário autenticado
  useEffect(() => {

    if (!usuarioLogado) {

      navigate("/login");

    }

  }, [navigate, usuarioLogado]);

  // Renderiza as rotas protegidas apenas se estiver logado
  return usuarioLogado
    ? <Outlet />
    : null;
}

export default ValidarAutenticacao;