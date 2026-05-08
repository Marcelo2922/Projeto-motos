import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Principal from "../../componentes/Principal/Principal";
import "./PaginaInicial.css";

function PaginaInicial() {

  // Navegação entre páginas
  const navigate = useNavigate();

  // Estados dos cards
  const [estoque, setEstoque] = useState(0);
  const [total, setTotal] = useState(0);
  const [valorVendido, setValorVendido] = useState(0);

  // Carrega dados do localStorage
  useEffect(() => {

    const lista = JSON.parse(localStorage.getItem("motos")) || [];

    // Quantidade em estoque ou reservadas
    const qtdEstoque = lista.filter(
      (m) =>
        m.situacao === "estoque" ||
        m.situacao === "reservada"
    ).length;

    // Soma total das motos vendidas
    const totalVendas = lista
      .filter((m) => m.situacao === "vendida")
      .reduce((acc, moto) => acc + (moto.preco || 0), 0);

    // Atualiza estados
    setEstoque(qtdEstoque);
    setTotal(lista.length);
    setValorVendido(totalVendas);

  }, []);

  // Formata valores em Real
  function formatarMoeda(valor) {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(valor);
  }

  return (
    <Principal>

      {/* Container dos cards */}
      <div className="cards-container">

        {/* Card estoque */}
        <div
          className="card-home"
          onClick={() => navigate("/estoque")}
        >
          <div className="icone">📦</div>

          <h2>Estoque</h2>

          <p>{estoque} motos disponíveis</p>
        </div>

        {/* Card lista de motos */}
        <div
          className="card-home"
          onClick={() => navigate("/lista-de-motos")}
        >
          <div className="icone">📋</div>

          <h2>Lista de motos</h2>

          <p>{total} cadastradas</p>
        </div>

        {/* Card vendas */}
        <div className="card-home card-nao-clicavel">

          <div className="icone">💰</div>

          <h2>Vendas</h2>

          <p>{formatarMoeda(valorVendido)}</p>
        </div>

        {/* Card cadastrar moto */}
        <div
          className="card-home"
          onClick={() => navigate("/cadastro-moto")}
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