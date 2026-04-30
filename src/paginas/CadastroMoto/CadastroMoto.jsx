import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Principal from "../../componentes/Principal/Principal";

function CadastroMoto() {
  const navigate = useNavigate();
  const { id } = useParams();

  const lista = JSON.parse(localStorage.getItem("motos")) || [];

  const motoEditando = lista.find((m) => m.id === Number(id));

  const [nome, setNome] = useState(motoEditando?.nome || "");
  const [preco, setPreco] = useState(motoEditando?.preco || "");
  const [descricao, setDescricao] = useState(motoEditando?.descricao || "");
  const [marca, setMarca] = useState(motoEditando?.marca || "");
  const [imagem, setImagem] = useState(motoEditando?.imagem || "");

  function handleImagem(e) {
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagem(reader.result);
      };
      reader.readAsDataURL(file);
    }
  }

  function salvar() {
    let novaLista;

    if (id) {
      novaLista = lista.map((m) =>
        m.id === Number(id)
          ? { ...m, nome, preco, descricao, marca, imagem }
          : m
      );
    } else {
      const novaMoto = {
        id: Date.now(),
        nome,
        preco: Number(preco),
        descricao,
        marca,
        imagem,
        cores: ["#000000"],
      };

      novaLista = [...lista, novaMoto];
    }

    localStorage.setItem("motos", JSON.stringify(novaLista));
    navigate("/");
  }

  return (
    <Principal titulo="Cadastro de Moto" voltarPara="/">
      <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        
        <input
          placeholder="Nome da moto"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
        />

        <input
          placeholder="Marca"
          value={marca}
          onChange={(e) => setMarca(e.target.value)}
        />

        <input
          placeholder="Preço"
          type="number"
          value={preco}
          onChange={(e) => setPreco(e.target.value)}
        />

        <textarea
          placeholder="Descrição"
          value={descricao}
          onChange={(e) => setDescricao(e.target.value)}
        />

        <input type="file" accept="image/*" onChange={handleImagem} />

        {imagem && (
          <img
            src={imagem}
            alt="Preview"
            style={{ width: "200px", marginTop: "10px", borderRadius: "8px" }}
          />
        )}

        <button onClick={salvar}>Salvar</button>

      </div>
    </Principal>
  );
}

export default CadastroMoto;