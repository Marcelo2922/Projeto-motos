import { useAppContext } from "../../contexto/AppContext";
import Avatar from "../Avatar/Avatar";
import "./Cabecalho.css";

function Cabecalho() {

  // Obtém o usuário que está logado no sistema
  const { usuarioLogado } = useAppContext();

  return (
    <header className="cabecalho__root">

      {/* Logo da aplicação */}
      <a href="/">
        <img
          src="/logo.png"
          height="32"
          alt="Logo"
        />
      </a>

      {/* Exibe avatar somente se houver usuário logado */}
      {usuarioLogado && (

        <a href="/meu-perfil">

          <Avatar
            nome={usuarioLogado.nome}
            imagem={usuarioLogado.foto}
          />

        </a>

      )}

    </header>
  );
}

export default Cabecalho;