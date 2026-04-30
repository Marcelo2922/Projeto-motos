import BotaoCustomizado from "../../componentes/BotaoCustomizado/BotaoCustomizado";
import Principal from "../../componentes/Principal/Principal";
import "./PaginaInicial.css";

import { useNavigate } from "react-router-dom";

function PaginaInicial() {
  const navigate = useNavigate();

  return (
    <Principal>
      <BotaoCustomizado tipo="primario" aoClicar={() => navigate("/lista-produtos")}>
        Lista de Motos
      </BotaoCustomizado>

      <BotaoCustomizado tipo="secundario" aoClicar={() => navigate("/lista-tarefas")}>
        Estoque de Motos
      </BotaoCustomizado>

      <BotaoCustomizado tipo="secundario" aoClicar={() => navigate("/cadastro-moto")}>
        Cadastro de Motos
      </BotaoCustomizado>

      <BotaoCustomizado aoClicar={() => navigate("/blablabla")}>Rota Inválida</BotaoCustomizado>
    </Principal>
  );
}

export default PaginaInicial;
