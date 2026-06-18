import "./Principal.css";
import { IoIosArrowBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";

function Principal({
  voltarPara,
  titulo,
  children,
}) {

  // Hook para navegação entre páginas
  const navigate = useNavigate();

  return (
    <main className="principal__root">

      {/* Área do título da página */}
      <div className="principal__titulo">

        {/* Botão de voltar */}
        {voltarPara && (
          <IoIosArrowBack
            size={24}
            onClick={() =>
              navigate(voltarPara)
            }
          />
        )}

        {/* Título da página */}
        <h2>{titulo}</h2>

      </div>

      {/* Conteúdo da página */}
      {children}

    </main>
  );
}

export default Principal;