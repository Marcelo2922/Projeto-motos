import { useState, useEffect } from "react";
import "../ListaProdutos/ListaProdutos.css";
import Principal from "../../componentes/Principal/Principal";
import ItemProduto from "../ListaProdutos/ItemProduto";

import {
  useNavigate,
  useLocation,
  useSearchParams,
} from "react-router-dom";

function ListaProdutos() {

  // =========================
  // Navegação entre páginas
  // =========================

  const navigate = useNavigate();

  // =========================
  // Informações da rota
  // =========================

  const location = useLocation();

  // =========================
  // Parâmetros da URL
  // =========================

  const [searchParams] =
    useSearchParams();

  const filtroUrl =
    searchParams.get("filtro");

  // =========================
  // Estados principais
  // =========================

  const [produtos, setProdutos] =
    useState([]);

  const [mostrarModal, setMostrarModal] =
    useState(false);

  const [produtoSelecionado,
    setProdutoSelecionado] =
    useState(null);

  // =========================
  // Estados dos filtros
  // =========================

  const [filtroMarca, setFiltroMarca] =
    useState("");

  const [filtroTipo, setFiltroTipo] =
    useState("");

  const [filtroSituacao,
    setFiltroSituacao] =
    useState("");

  // =========================
  // Carrega motos do localStorage
  // =========================

  useEffect(() => {

    const lista = JSON.parse(
      localStorage.getItem("motos") || "[]"
    );

    setProdutos(lista);

  }, [location]);

  // =========================
  // Define filtro automático
  // =========================

  useEffect(() => {

    // Mostra estoque + reservadas
    if (filtroUrl === "estoque") {

      setFiltroSituacao(
        "estoque-reservada"
      );

    }
    // Situação vinda da navegação
    else if (location.state?.situacao) {

      setFiltroSituacao(
        location.state.situacao
      );

    }
    // Sem filtro
    else {

      setFiltroSituacao("");
    }

  }, [location, filtroUrl]);

  // =========================
  // Abre modal exclusão
  // =========================

  function confirmarExclusao(produto) {

    setProdutoSelecionado(produto);

    setMostrarModal(true);
  }

  // =========================
  // Fecha modal
  // =========================

  function cancelar() {

    setMostrarModal(false);

    setProdutoSelecionado(null);
  }

  // =========================
  // Exclui produto
  // =========================

  function excluir() {

    const novaLista =
      produtos.filter(
        (m) =>
          m.id !== produtoSelecionado.id
      );

    localStorage.setItem(
      "motos",
      JSON.stringify(novaLista)
    );

    setProdutos(novaLista);

    cancelar();
  }

  // =========================
  // Lista única de marcas
  // =========================

  const marcas = [

    ...new Set(

      produtos
        .map((p) => p.marca)
        .filter(Boolean)

    ),

  ];

  // =========================
  // Filtra produtos
  // =========================

  const produtosFiltrados =
    produtos.filter((p) => {

      // =========================
      // NÃO MOSTRA MOTOS VENDIDAS
      // =========================

      if (p.situacao === "vendida") {

        return false;
      }

      // =========================
      // Filtro marca
      // =========================

      const matchMarca =
        filtroMarca
          ? p.marca === filtroMarca
          : true;

      // =========================
      // Filtro tipo
      // =========================

      const matchTipo =
        filtroTipo
          ? p.tipo === filtroTipo
          : true;

      // =========================
      // Filtro situação
      // =========================

      const matchSituacao =

        filtroSituacao ===
        "estoque-reservada"

          ? p.situacao === "estoque" ||
            p.situacao === "reservada"

          : filtroSituacao

          ? p.situacao === filtroSituacao

          : true;

      // =========================
      // Retorno final
      // =========================

      return (

        matchMarca &&
        matchTipo &&
        matchSituacao

      );
    });

  return (

    <Principal
      voltarPara="/"
      titulo="Estoque"
    >

      {/* =========================
          FILTROS
          ========================= */}

      <div
        className="filtro"

        style={{
          display: "flex",
          gap: "10px",
          marginBottom: "20px",
        }}
      >

        {/* =========================
            Filtro marca
            ========================= */}

        <select
          className="input"

          value={filtroMarca}

          onChange={(e) =>
            setFiltroMarca(
              e.target.value
            )
          }
        >

          <option value="">
            Todas as marcas
          </option>

          {marcas.map(
            (marca, index) => (

              <option
                key={index}
                value={marca}
              >
                {marca}
              </option>

            )
          )}

        </select>

        {/* =========================
            Filtro tipo
            ========================= */}

        <select
          className="input"

          value={filtroTipo}

          onChange={(e) =>
            setFiltroTipo(
              e.target.value
            )
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

        {/* =========================
            Filtro situação
            ========================= */}

        <select
          className="input"

          value={filtroSituacao}

          onChange={(e) =>
            setFiltroSituacao(
              e.target.value
            )
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

        </select>

      </div>

      {/* =========================
          LISTA DE MOTOS
          ========================= */}

      <div className="lista-produtos">

        {/* Sem resultados */}
        {produtosFiltrados.length === 0 && (

          <p>
            Nenhuma moto encontrada
          </p>

        )}

        {/* Lista */}
        {produtosFiltrados.map(
          (produto) => (

            <ItemProduto

              key={produto.id}

              produto={produto}

              // =========================
              // Editar moto
              // =========================

              onEditar={() =>
                navigate(
                  `/cadastro-moto/${produto.id}`
                )
              }

              // =========================
              // Excluir moto
              // =========================

              onExcluir={() =>
                confirmarExclusao(produto)
              }
            />

          )
        )}

      </div>

      {/* =========================
          BOTÃO ADICIONAR
          ========================= */}

      <button
        className="botao-add"

        onClick={() =>
          navigate("/cadastro-moto")
        }
      >
        +
      </button>

      {/* =========================
          MODAL EXCLUSÃO
          ========================= */}

      {mostrarModal && (

        <div className="modal-overlay">

          <div className="modal">

            <h3>
              Confirmar exclusão
            </h3>

            <p>

              Deseja excluir{" "}

              <strong>
                {produtoSelecionado?.nome}
              </strong>

              ?

            </p>

            <div className="modal-botoes">

              {/* Cancelar */}
              <button
                className="btn-cancelar"

                onClick={cancelar}
              >
                Cancelar
              </button>

              {/* Excluir */}
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