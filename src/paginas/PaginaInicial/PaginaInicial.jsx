import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Principal from "../../componentes/Principal/Principal";
import "./PaginaInicial.css";

function PaginaInicial() {
  const navigate = useNavigate();

  const [estoque, setEstoque] = useState(0);
  const [total, setTotal] = useState(0);
  const [valorVendido, setValorVendido] = useState(0);

  useEffect(() => {
    const lista = JSON.parse(localStorage.getItem("motos")) || [];

    const qtdEstoque = lista.filter(
      (m) =>
        m.status?.situacao === "estoque" ||
        m.status?.situacao === "reservada"
    ).length;

    const totalVendas = lista
      .filter((m) => m.status?.situacao === "vendida")
      .reduce((acc, moto) => acc + (moto.preco || 0), 0);

    setEstoque(qtdEstoque);
    setTotal(lista.length);
    setValorVendido(totalVendas);
  }, []);

  function formatarMoeda(valor) {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(valor);
  }

  return (
    <Principal>
      <div className="cards-container">

        <div className="card-home card-nao-clicavel">
          <div className="icone">📦</div>
          <h2>Estoque</h2>
          <p>{estoque} motos disponíveis</p>
        </div>

        <div
          className="card-home"
          onClick={() => navigate("/lista-produtos")}
        >
          <div className="icone">📋</div>
          <h2>Lista de motos</h2>
          <p>{total} cadastradas</p>
        </div>

        <div className="card-home card-nao-clicavel">
          <div className="icone">💰</div>
          <h2>Vendas</h2>
          <p>{formatarMoeda(valorVendido)}</p>
        </div>

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