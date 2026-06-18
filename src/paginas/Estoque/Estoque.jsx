import { useState, useEffect } from "react";
import "../ListaProdutos/ListaProdutos.css";
import Principal from "../../componentes/Principal/Principal";
import ItemProduto from "../ListaProdutos/ItemProduto";
import { useAppContext } from "../../contexto/AppContext";

import {
  useNavigate,
  useLocation,
  useSearchParams,
} from "react-router-dom";

function ListaProdutos() {
  // Navegação, localização da rota e contexto do usuário
  const navigate = useNavigate();
  const location = useLocation();
  const { usuarioLogado } = useAppContext();

  // Leitura dos parâmetros da URL
  const [searchParams] = useSearchParams();
  const filtroUrl = searchParams.get("filtro");

  // Estados principais da página
  const [produtos, setProdutos] = useState([]);
  const [mostrarModal, setMostrarModal] = useState(false);
  const [produtoSelecionado, setProdutoSelecionado] = useState(null);

  // Estados dos filtros
  const [filtroMarca, setFiltroMarca] = useState("");
  const [filtroTipo, setFiltroTipo] = useState("");
  const [filtroSituacao, setFiltroSituacao] = useState("");

  // Carrega as motos do usuário logado
  useEffect(() => {
    const lista =
      JSON.parse(localStorage.getItem("motos")) || [];

    const listaDoUsuario = lista.filter(
      (moto) =>
        String(moto.idUsuario) ===
        String(usuarioLogado?.id)
    );

    setProdutos(listaDoUsuario);
  }, [location, usuarioLogado]);

  // Define filtros automáticos vindos da URL ou navegação
  useEffect(() => {
    if (filtroUrl === "estoque") {
      setFiltroSituacao("estoque-reservada");
    } else if (location.state?.situacao) {
      setFiltroSituacao(location.state.situacao);
    } else {
      setFiltroSituacao("");
    }
  }, [location, filtroUrl]);

  // Abre modal de confirmação para exclusão
  function confirmarExclusao(produto) {
    setProdutoSelecionado(produto);
    setMostrarModal(true);
  }

  // Fecha o modal e limpa o produto selecionado
  function cancelar() {
    setMostrarModal(false);
    setProdutoSelecionado(null);
  }

  // Remove a moto selecionada
  function excluir() {
    const todasAsMotos =
      JSON.parse(localStorage.getItem("motos")) || [];

    const novaListaCompleta =
      todasAsMotos.filter(
        (m) => m.id !== produtoSelecionado.id
      );

    localStorage.setItem(
      "motos",
      JSON.stringify(novaListaCompleta)
    );

    setProdutos(
      produtos.filter(
        (m) => m.id !== produtoSelecionado.id
      )
    );

    cancelar();
  }

  // Lista única de marcas para o filtro
  const marcas = [
    ...new Set(
      produtos
        .map((p) => p.marca)
        .filter(Boolean)
    ),
  ];

  // Aplicação dos filtros da tela
  const produtosFiltrados =
    produtos.filter((p) => {
      if (p.situacao === "vendida") {
        return false;
      }

      const matchMarca =
        filtroMarca
          ? p.marca === filtroMarca
          : true;

      const matchTipo =
        filtroTipo
          ? p.tipo === filtroTipo
          : true;

      const matchSituacao =
        filtroSituacao ===
        "estoque-reservada"
          ? p.situacao === "estoque" ||
            p.situacao === "reservada"
          : filtroSituacao
          ? p.situacao === filtroSituacao
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
      titulo="Estoque"
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
        </select>
      </div>

      {/* Lista de motos */}
      <div className="lista-produtos">
        {produtosFiltrados.length === 0 && (
          <p>Nenhuma moto encontrada</p>
        )}

        {produtosFiltrados.map(
          (produto) => (
            <ItemProduto
              key={produto.id}
              produto={produto}
              onEditar={() =>
                navigate(
                  `/cadastro-moto/${produto.id}`
                )
              }
              onExcluir={() =>
                confirmarExclusao(produto)
              }
            />
          )
        )}
      </div>

      {/* Botão para adicionar nova moto */}
      <button
        className="botao-add"
        onClick={() =>
          navigate("/cadastro-moto")
        }
      >
        +
      </button>

      {/* Modal de confirmação de exclusão */}
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
              {/* Botão cancelar */}
              <button
                className="btn-cancelar"
                onClick={cancelar}
              >
                Cancelar
              </button>

              {/* Botão confirmar exclusão */}
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