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

  useEffect(() => {
    const lista = JSON.parse(localStorage.getItem("motos")) || [];
    setProdutos(lista);
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

  return (
    <Principal voltarPara="/" titulo="Lista de Motos">
      
      <div className="lista-produtos">
        {produtos.length === 0 && <p>Nenhuma moto cadastrada</p>}

        {produtos.map((produto) => (
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