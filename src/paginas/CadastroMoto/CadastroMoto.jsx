import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Principal from "../../componentes/Principal/Principal";
import { toast } from "react-toastify";
import "./CadastroMoto.css";

function CadastroMoto() {
  const navigate = useNavigate();
  const { motoId } = useParams();

  const lista = JSON.parse(localStorage.getItem("motos")) || [];
  const motoEditando = lista.find((m) => m.id === Number(motoId));

  const [nome, setNome] = useState(motoEditando?.nome || "");
  const [preco, setPreco] = useState(
    motoEditando?.preco ? String(motoEditando.preco) : ""
  );
  const [descricao, setDescricao] = useState(motoEditando?.descricao || "");
  const [marca, setMarca] = useState(motoEditando?.marca || "");
  const [imagem, setImagem] = useState(motoEditando?.imagem || "");

  const [ano, setAno] = useState(motoEditando?.ano || "");
  const [placa, setPlaca] = useState(motoEditando?.placa || "");
  const [cor, setCor] = useState(motoEditando?.cor || "");
  const [km, setKm] = useState(motoEditando?.km || "");

  const [situacao, setSituacao] = useState(
    motoEditando?.situacao || "estoque"
  );

  const [tipo, setTipo] = useState(motoEditando?.tipo || "");

  function handleSituacao(e) {
    setSituacao(e.target.value);
  }

  function handleTipo(e) {
    const value = e.target.name;

    if (tipo === value) {
      setTipo(""); 
    } else {
      setTipo(value);
    }
  }

  function handleImagem(e) {
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setImagem(reader.result);
      reader.readAsDataURL(file);
    }
  }

  function formatarPreco(valor) {
    if (!valor || valor === "0") return "";

    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(Number(valor));
  }

  function handlePreco(e) {
    let valor = e.target.value.replace(/\D/g, "");
    valor = valor.replace(/^0+/, "");

    if (!valor) {
      setPreco("");
      return;
    }

    setPreco(valor);
  }

  function handlePlaca(e) {
    let valor = e.target.value.toUpperCase();

    valor = valor.replace(/[^A-Z0-9]/g, "");
    valor = valor.slice(0, 7);

    if (valor.length > 3) {
      valor = valor.slice(0, 3) + "-" + valor.slice(3);
    }

    setPlaca(valor);
  }

  function salvar() {
    const regexPlaca = /^[A-Z]{3}-?[0-9][A-Z][0-9]{2}$/;

    if (!nome || !preco || ano.length !== 4) {
      toast.error("Preencha os campos obrigatórios corretamente!");
      return;
    }

    if (placa && !regexPlaca.test(placa)) {
      toast.error("Placa inválida! Ex: ABC1D23");
      return;
    }

    let novaLista;

    if (motoId) {
      novaLista = lista.map((m) =>
        m.id === Number(motoId)
          ? {
              ...m,
              nome,
              preco: Number(preco),
              descricao,
              marca,
              imagem,
              ano,
              placa,
              cor,
              km,
              situacao,
              tipo,
            }
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
        ano,
        placa,
        cor,
        km,
        situacao,
        tipo,
        cores: ["#000000"],
      };

      novaLista = [...lista, novaMoto];
    }

    localStorage.setItem("motos", JSON.stringify(novaLista));

    toast.success(motoId ? "Moto atualizada!" : "Moto cadastrada!");

    navigate("/lista-de-motos");
  }

  return (
    <Principal
      titulo={motoId ? "Editar Moto" : "Cadastrar Moto"}
      voltarPara="/lista-de-motos"
    >
      <div className="form-container">

        <div className="campo">
          <label>Marca</label>
          <select
            className="input"
            value={marca}
            onChange={(e) => setMarca(e.target.value)}
          >
            <option value="">Selecione</option>
            <option>Honda</option>
            <option>Yamaha</option>
            <option>BMW</option>
            <option>Kawasaki</option>
            <option>Suzuki</option>
          </select>
        </div>

        <div className="campo">
          <label>Modelo</label>
          <input
            className="input"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
          />
        </div>

        <div className="campo">
          <label>Ano</label>
          <input
            className="input"
            type="number"
            value={ano}
            onChange={(e) =>
              setAno(e.target.value.replace(/\D/g, "").slice(0, 4))
            }
            onKeyDown={(e) =>
              ["e", "E", "+", "-", "."].includes(e.key) &&
              e.preventDefault()
            }
          />
        </div>

        <div className="campo">
          <label>Preço</label>
          <input
  className="input"
  value={formatarPreco(preco)}
  onChange={handlePreco}
  inputMode="numeric"
  pattern="[0-9]*"
/>
        </div>

        <div className="campo">
          <label>KM</label>
          <input
            className="input"
            type="number"
            value={km}
            onChange={(e) =>
              setKm(e.target.value.replace(/\D/g, "").slice(0, 6))
            }
            onKeyDown={(e) =>
              ["e", "E", "+", "-", "."].includes(e.key) &&
              e.preventDefault()
            }
          />
        </div>

        <div className="campo">
          <label>Cor</label>
          <select
            className="input"
            value={cor}
            onChange={(e) => setCor(e.target.value)}
          >
            <option value="">Selecione</option>
            <option>Preto</option>
            <option>Branco</option>
            <option>Vermelho</option>
            <option>Azul</option>
            <option>Cinza</option>
          </select>
        </div>

        <div className="campo">
          <label>Placa</label>
          <input
            className="input"
            value={placa}
            onChange={handlePlaca}
            placeholder="ABC1D23"
          />
        </div>

        <div className="campo">
          <label>Situação</label>
          <select
            className="input"
            value={situacao}
            onChange={handleSituacao}
          >
            <option value="estoque">Em estoque</option>
            <option value="reservada">Reservada</option>
            <option value="vendida">Vendida</option>
          </select>
        </div>

        <div className="campo">
          <label>Tipo</label>

          <label>
            <input
              type="checkbox"
              name="zeroKm"
              checked={tipo === "zeroKm"}
              onChange={handleTipo}
            />
            Zero KM
          </label>

          <label>
            <input
              type="checkbox"
              name="semiNova"
              checked={tipo === "semiNova"}
              onChange={handleTipo}
            />
            Semi-nova
          </label>
        </div>

        <div className="campo">
          <label>Descrição</label>
          <textarea
            className="textarea"
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
          />
        </div>

        <div className="campo">
          <label>Imagem</label>
          <input
            className="input-file"
            type="file"
            onChange={handleImagem}
          />
        </div>
        
        <button className="btn-salvar" onClick={salvar}>
          {motoId ? "Atualizar" : "Salvar"}
        </button>
      </div>
    </Principal>
  );
}

export default CadastroMoto;