import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Principal from "../../componentes/Principal/Principal";
import { useAppContext } from "../../contexto/AppContext";
import "./PaginaInicial.css";

function PaginaInicial() {
  // Navegação entre páginas e dados do usuário logado
  const navigate = useNavigate();
  const { usuarioLogado } = useAppContext();

  // Estados dos indicadores exibidos na tela inicial
  const [estoque, setEstoque] = useState(0);
  const [total, setTotal] = useState(0);
  const [valorVendido, setValorVendido] = useState(0);

  // Carrega os dados das motos do usuário e calcula os indicadores
  useEffect(() => {
    const lista =
      JSON.parse(localStorage.getItem("motos")) || [];

    const listaDoUsuario = lista.filter(
      (moto) =>
        String(moto.idUsuario) ===
        String(usuarioLogado?.id)
    );

    const qtdEstoque = listaDoUsuario.filter(
      (m) =>
        m.situacao === "estoque" ||
        m.situacao === "reservada"
    ).length;

    const totalVendas = listaDoUsuario
      .filter((m) => m.situacao === "vendida")
      .reduce(
        (acc, moto) => acc + (moto.preco || 0),
        0
      );

    setEstoque(qtdEstoque);
    setTotal(listaDoUsuario.length);
    setValorVendido(totalVendas);
  }, [usuarioLogado]);

  // Formata valores monetários em Real (R$)
  function formatarMoeda(valor) {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(valor);
  }

  return (
    <Principal>
      {/* Cards de resumo do sistema */}
      <div className="cards-container">

        {/* Card de estoque */}
        <div
          className="card-home"
          onClick={() => navigate("/estoque")}
        >
          <div className="icone">📦</div>

          <h2>Estoque</h2>

          <p>{estoque} motos disponíveis</p>
        </div>

        {/* Card de listagem de motos */}
        <div
          className="card-home"
          onClick={() =>
            navigate("/lista-de-motos")
          }
        >
          <div className="icone">📋</div>

          <h2>Lista de motos</h2>

          <p>{total} cadastradas</p>
        </div>

        {/* Card de valor total vendido */}
        <div className="card-home card-nao-clicavel">
          <div className="icone">💰</div>

          <h2>Vendas</h2>

          <p>
            {formatarMoeda(valorVendido)}
          </p>
        </div>

        {/* Card para cadastro de nova moto */}
        <div
          className="card-home"
          onClick={() =>
            navigate("/cadastro-moto")
          }
        >
          <div className="icone">➕</div>

          <h2>Cadastrar</h2>

          <p>Nova moto</p>
        </div>
      </div>
    </Principal>
  );
}

export default PaginaInicial;