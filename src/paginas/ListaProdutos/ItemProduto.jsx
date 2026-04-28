import "./ItemProduto.css";

function ItemProduto({ produto }) {
  return (
    <div className="item-produto__root">
      <span>{produto.nome}</span>
      <span>{produto.preco}</span>

      <div className="item-produto__cores">
        {produto.cores.map((aquarela, contagem) => {
          return (
            <div
              key={contagem}
              className="item-produto__cor"
              style={{ backgroundColor: aquarela }}
            />
          );
        })}
      </div>
    </div>
  );
}

export default ItemProduto;
