function ItemProduto({ produto, onEditar, onExcluir }) {

  // Formata preço para Real brasileiro
  function formatarPreco(valor) {

    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(valor);
  }

  return (
    <div className="item-produto__root">

      {/* Imagem da moto */}
      {produto.imagem && (

        <div className="item-produto__img-container">

          <img
            src={produto.imagem}
            alt={produto.nome}
            className="item-produto__img"
          />
        </div>
      )}

      {/* Nome da moto */}
      <h3>{produto.nome}</h3>

      {/* Marca */}
      <p>
        <strong>Marca:</strong>{" "}
        {produto.marca || "Não informado"}
      </p>

      {/* Ano */}
      <p>
        <strong>Ano:</strong> {produto.ano}
      </p>

      {/* Preço */}
      <p className="item-produto__preco">
        {formatarPreco(produto.preco)}
      </p>

      {/* Botão editar */}
      <button
        className="item-produto__editar"
        onClick={onEditar}
      >
        Editar
      </button>

      {/* Botão excluir */}
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