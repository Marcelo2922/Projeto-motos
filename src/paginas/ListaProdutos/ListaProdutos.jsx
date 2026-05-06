import { useState, useEffect } from "react";
import "./ListaProdutos.css";
import Principal from "../../componentes/Principal/Principal";
import ItemProduto from "./ItemProduto";
import { useNavigate, useLocation } from "react-router-dom";

function ListaProdutos() {
  const navigate = useNavigate();
  const location = useLocation();

  const [produtos, setProdutos] = useState([]);
  const [mostrarModal, setMostrarModal] = useState(false);
  const [produtoSelecionado, setProdutoSelecionado] = useState(null);

  const [filtroMarca, setFiltroMarca] = useState("");
  const [filtroTipo, setFiltroTipo] = useState("");
  const [filtroSituacao, setFiltroSituacao] = useState("");

  useEffect(() => {
    const lista = JSON.parse(localStorage.getItem("motos")) || [];

    const listaCorrigida = lista.map((m) => ({
      ...m,
      status: m.status || {
        tipo: "",
        situacao: "estoque",
      },
    }));

    setProdutos(listaCorrigida);
  }, [location]);

  function confirmarExclusao(produto) {
    setProdutoSelecionado(produto);
    setMostrarModal(true);
  }

  function cancelar() {
    setMostrarModal(false);
    setProdutoSelecionado(null);
  }

  function excluir() {
    const novaLista = produtos.filter(
      (m) => m.id !== produtoSelecionado.id
    );

    localStorage.setItem("motos", JSON.stringify(novaLista));
    setProdutos(novaLista);

    cancelar();
  }

  const marcas = [...new Set(produtos.map((p) => p.marca).filter(Boolean))];

  const produtosFiltrados = produtos.filter((p) => {
    const matchMarca = filtroMarca ? p.marca === filtroMarca : true;

    const matchTipo = filtroTipo
      ? p.status?.tipo === filtroTipo
      : true;

    const matchSituacao = filtroSituacao
      ? p.status?.situacao === filtroSituacao
      : true;

    return matchMarca && matchTipo && matchSituacao;
  });

  return (
    <Principal voltarPara="/" titulo="Lista de Motos">

      <div className="filtro" style={{ display: "flex", gap: "10px" }}>
        
        {/* Marca */}
        <select
          className="input"
          value={filtroMarca}
          onChange={(e) => setFiltroMarca(e.target.value)}
        >
          <option value="">Todas as marcas</option>

          {marcas.map((marca, index) => (
            <option key={index} value={marca}>
              {marca}
            </option>
          ))}
        </select>

        <select
          className="input"
          value={filtroTipo}
          onChange={(e) => setFiltroTipo(e.target.value)}
        >
          <option value="">Todos os tipos</option>
          <option value="zeroKm">Zero KM</option>
          <option value="semiNova">Semi-nova</option>
        </select>

        <select
          className="input"
          value={filtroSituacao}
          onChange={(e) => setFiltroSituacao(e.target.value)}
        >
          <option value="">Todas</option>
          <option value="estoque">Em estoque</option>
          <option value="reservada">Reservada</option>
          <option value="vendida">Vendida</option>
        </select>

      </div>

      <div className="lista-produtos">
        {produtosFiltrados.length === 0 && (
          <p>Nenhuma moto encontrada</p>
        )}

        {produtosFiltrados.map((produto) => (
          <ItemProduto
            key={produto.id}
            produto={produto}
            onEditar={() => navigate(`/cadastro-moto/${produto.id}`)}
            onExcluir={() => confirmarExclusao(produto)}
          />
        ))}
      </div>

      <button
        className="botao-add"
        onClick={() => navigate("/cadastro-moto")}
      >
        +
      </button>

      {mostrarModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Confirmar exclusão</h3>
            <p>
              Deseja excluir{" "}
              <strong>{produtoSelecionado?.nome}</strong>?
            </p>

            <div className="modal-botoes">
              <button className="btn-cancelar" onClick={cancelar}>
                Cancelar
              </button>
              <button className="btn-excluir" onClick={excluir}>
                Excluir
              </button>
            </div>
          </div>
        </div>
      )}

    </Principal>
  );
}

export default ListaProdutos;