function ItemProduto({ produto, onEditar, onExcluir }) {

  function formatarPreco(valor) {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(valor);
  }

  return (
    <div className="item-produto__root">

      {produto.imagem && (
        <div className="item-produto__img-container">
          <img
            src={produto.imagem}
            alt={produto.nome}
            className="item-produto__img"
          />
        </div>
      )}

      <h3>{produto.nome}</h3>

      <p>
        <strong>Marca:</strong>{" "}
        {produto.marca || "Não informado"}
      </p>

      <p>
        <strong>Ano:</strong> {produto.ano}
      </p>

      <p className="item-produto__preco">
        {formatarPreco(produto.preco)}
      </p>

      <button
        className="item-produto__editar"
        onClick={onEditar}
      >
        Editar
      </button>

      <button
        className="item-produto__excluir"
        onClick={onExcluir}
      >
        Excluir
      </button>

    </div>
  );
}

export default ItemProduto;