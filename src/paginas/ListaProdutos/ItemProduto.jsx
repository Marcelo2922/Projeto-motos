import "./ItemProduto.css";

function ItemProduto({ produto }) {
  return (
    <div className="card-moto">
      <img
        src={produto.imagem}
        alt={produto.nome}
        className="card-moto-img"
      />

      <div className="card-moto-info">
        <h2>{produto.nome}</h2>

        <p className="preco">
          R$ {produto.preco.toLocaleString("pt-BR")}
        </p>

        <div className="cores">
          {produto.cores.map((cor, i) => (
            <span
              key={i}
              className="cor"
              style={{ backgroundColor: cor }}
            />
          ))}
        </div>

        <button className="btn-detalhes">
          Ver detalhes
        </button>
      </div>
    </div>
  );
}

export default ItemProduto;