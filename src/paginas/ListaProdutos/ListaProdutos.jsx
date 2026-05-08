import { useState, useEffect } from "react";
import "./ListaProdutos.css";
import Principal from "../../componentes/Principal/Principal";
import ItemProduto from "./ItemProduto";
import {
  useNavigate,
  useLocation,
  useSearchParams,
} from "react-router-dom";

function ListaProdutos() {

  // Navegação entre páginas
  const navigate = useNavigate();

  // Informações da rota atual
  const location = useLocation();

  // Pega filtro da URL
  const [searchParams] = useSearchParams();
  const filtroUrl = searchParams.get("filtro");

  // Estados principais
  const [produtos, setProdutos] = useState([]);
  const [mostrarModal, setMostrarModal] = useState(false);
  const [produtoSelecionado, setProdutoSelecionado] = useState(null);

  // Estados dos filtros
  const [filtroMarca, setFiltroMarca] = useState("");
  const [filtroTipo, setFiltroTipo] = useState("");
  const [filtroSituacao, setFiltroSituacao] = useState("");

  // Carrega motos do localStorage
  useEffect(() => {

    const lista = JSON.parse(
      localStorage.getItem("motos") || "[]"
    );

    // Corrige dados antigos
    const listaCorrigida = lista.map((m) => ({
      ...m,
      status: m.status || {
        tipo: m.tipo || "",
        situacao: m.situacao || "estoque",
      },
    }));

    setProdutos(listaCorrigida);

  }, [location]);

  // Define filtro automático pela URL
  useEffect(() => {

    if (filtroUrl === "estoque") {

      setFiltroSituacao("estoque-reservada");

    } else if (location.state?.situacao) {

      setFiltroSituacao(location.state.situacao);

    } else {

      setFiltroSituacao("");
    }

  }, [location, filtroUrl]);

  // Abre modal de exclusão
  function confirmarExclusao(produto) {
    setProdutoSelecionado(produto);
    setMostrarModal(true);
  }

  // Fecha modal
  function cancelar() {
    setMostrarModal(false);
    setProdutoSelecionado(null);
  }

  // Exclui moto
  function excluir() {

    const novaLista = produtos.filter(
      (m) => m.id !== produtoSelecionado.id
    );

    localStorage.setItem(
      "motos",
      JSON.stringify(novaLista)
    );

    setProdutos(novaLista);

    cancelar();
  }

  // Lista única de marcas
  const marcas = [
    ...new Set(
      produtos.map((p) => p.marca).filter(Boolean)
    ),
  ];

  // Filtragem dos produtos
  const produtosFiltrados = produtos.filter((p) => {

    const matchMarca = filtroMarca
      ? p.marca === filtroMarca
      : true;

    const matchTipo = filtroTipo
      ? p.status?.tipo === filtroTipo
      : true;

    const matchSituacao =
      filtroSituacao === "estoque-reservada"
        ? p.status?.situacao === "estoque" ||
          p.status?.situacao === "reservada"
        : filtroSituacao
        ? p.status?.situacao === filtroSituacao
        : true;

    return (
      matchMarca &&
      matchTipo &&
      matchSituacao
    );
  });

  return (
    <Principal
      voltarPara="/"
      titulo="Lista de Motos"
    >

      {/* Área de filtros */}
      <div
        className="filtro"
        style={{
          display: "flex",
          gap: "10px",
          marginBottom: "20px",
        }}
      >

        {/* Filtro por marca */}
        <select
          className="input"
          value={filtroMarca}
          onChange={(e) =>
            setFiltroMarca(e.target.value)
          }
        >
          <option value="">
            Todas as marcas
          </option>

          {marcas.map((marca, index) => (
            <option key={index} value={marca}>
              {marca}
            </option>
          ))}
        </select>

        {/* Filtro por tipo */}
        <select
          className="input"
          value={filtroTipo}
          onChange={(e) =>
            setFiltroTipo(e.target.value)
          }
        >
          <option value="">
            Todos os tipos
          </option>

          <option value="zeroKm">
            Zero KM
          </option>

          <option value="semiNova">
            Semi-nova
          </option>
        </select>

        {/* Filtro por situação */}
        <select
          className="input"
          value={filtroSituacao}
          onChange={(e) =>
            setFiltroSituacao(e.target.value)
          }
        >
          <option value="">
            Todas
          </option>

          <option value="estoque">
            Em estoque
          </option>

          <option value="reservada">
            Reservada
          </option>

          <option value="vendida">
            Vendida
          </option>
        </select>
      </div>

      {/* Lista de produtos */}
      <div className="lista-produtos">

        {produtosFiltrados.length === 0 && (
          <p>Nenhuma moto encontrada</p>
        )}

        {produtosFiltrados.map((produto) => (

          <ItemProduto
            key={produto.id}
            produto={produto}

            // Editar moto
            onEditar={() =>
              navigate(
                `/cadastro-moto/${produto.id}`
              )
            }

            // Excluir moto
            onExcluir={() =>
              confirmarExclusao(produto)
            }
          />
        ))}
      </div>

      {/* Botão adicionar */}
      <button
        className="botao-add"
        onClick={() =>
          navigate("/cadastro-moto")
        }
      >
        +
      </button>

      {/* Modal de confirmação */}
      {mostrarModal && (

        <div className="modal-overlay">

          <div className="modal">

            <h3>Confirmar exclusão</h3>

            <p>
              Deseja excluir{" "}
              <strong>
                {produtoSelecionado?.nome}
              </strong>
              ?
            </p>

            <div className="modal-botoes">

              <button
                className="btn-cancelar"
                onClick={cancelar}
              >
                Cancelar
              </button>

              <button
                className="btn-excluir"
                onClick={excluir}
              >
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