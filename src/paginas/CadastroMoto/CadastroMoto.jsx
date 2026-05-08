import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Principal from "../../componentes/Principal/Principal";
import { toast } from "react-toastify";
import "./CadastroMoto.css";

function CadastroMoto() {

  // Navegação entre páginas
  const navigate = useNavigate();

  // Pega ID da moto pela URL
  const { motoId } = useParams();

  // Lista salva no localStorage
  const lista =
    JSON.parse(localStorage.getItem("motos")) || [];

  // Procura moto para edição
  const motoEditando = lista.find(
    (m) => m.id === Number(motoId)
  );

  // Estados do formulário

  const [nome, setNome] = useState(
    motoEditando?.nome || ""
  );

  const [preco, setPreco] = useState(
    motoEditando?.preco
      ? String(motoEditando.preco)
      : ""
  );

  const [descricao, setDescricao] = useState(
    motoEditando?.descricao || ""
  );

  const [marca, setMarca] = useState(
    motoEditando?.marca || ""
  );

  const [imagem, setImagem] = useState(
    motoEditando?.imagem || ""
  );

  const [ano, setAno] = useState(
    motoEditando?.ano || ""
  );

  const [placa, setPlaca] = useState(
    motoEditando?.placa || ""
  );

  const [cor, setCor] = useState(
    motoEditando?.cor || ""
  );

  const [km, setKm] = useState(
    motoEditando?.km || ""
  );

  const [situacao, setSituacao] = useState(
    motoEditando?.situacao || "estoque"
  );

  const [tipo, setTipo] = useState(
    motoEditando?.tipo || ""
  );

  // Atualiza situação

  function handleSituacao(e) {

    setSituacao(e.target.value);
  }

  // Seleciona tipo da moto

  function handleTipo(e) {

    const value = e.target.name;

    // Se clicar novamente no mesmo checkbox
    // remove a seleção
    if (tipo === value) {

      setTipo("");

    } else {

      setTipo(value);
    }
  }

  // Salva imagem

  function handleImagem(e) {

    const file = e.target.files[0];

    if (file) {

      const reader = new FileReader();

      // Converte imagem para Base64
      reader.onloadend = () =>
        setImagem(reader.result);

      reader.readAsDataURL(file);
    }
  }

  // Formata preço para Real

  function formatarPreco(valor) {

    if (!valor || valor === "0")
      return "";

    return new Intl.NumberFormat(
      "pt-BR",
      {
        style: "currency",
        currency: "BRL",
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      }
    ).format(Number(valor));
  }

  // Trata valor do preço

  function handlePreco(e) {

    // Remove tudo que não for número
    let valor =
      e.target.value.replace(/\D/g, "");

    // Remove zeros à esquerda
    valor = valor.replace(/^0+/, "");

    // Se não houver valor
    if (!valor) {

      setPreco("");
      return;
    }

    setPreco(valor);
  }

  // Formata placa


  function handlePlaca(e) {

    let valor =
      e.target.value.toUpperCase();

    // Remove caracteres inválidos
    valor =
      valor.replace(/[^A-Z0-9]/g, "");

    // Limita em 7 caracteres
    valor = valor.slice(0, 7);

    // Adiciona hífen automático
    if (valor.length > 3) {

      valor =
        valor.slice(0, 3) +
        "-" +
        valor.slice(3);
    }

    setPlaca(valor);
  }


  // Salva moto


  function salvar() {

    // Regex da placa Mercosul
    const regexPlaca =
      /^[A-Z]{3}-?[0-9][A-Z][0-9]{2}$/;

    // Validação

    if (
      !nome ||
      !preco ||
      ano.length !== 4
    ) {

      toast.error(
        "Preencha os campos obrigatórios corretamente!"
      );

      return;
    }

    // Validação da placa


    if (
      placa &&
      !regexPlaca.test(placa)
    ) {

      toast.error(
        "Placa inválida! Ex: ABC1D23"
      );

      return;
    }

    let novaLista;

    // Atualiza moto existente


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

      // Cria nova moto

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

        // Cor padrão
        cores: ["#000000"],
      };

      novaLista = [...lista, novaMoto];
    }

    // Salva no localStorage


    localStorage.setItem(
      "motos",
      JSON.stringify(novaLista)
    );

    // Mensagem de sucesso

    toast.success(
      motoId
        ? "Moto atualizada!"
        : "Moto cadastrada!"
    );

    // Redireciona
    navigate("/lista-de-motos");
  }

  return (

    <Principal
      titulo={
        motoId
          ? "Editar Moto"
          : "Cadastrar Moto"
      }
      voltarPara="/lista-de-motos"
    >
      <form
        className="form-container"

        // Impede recarregar página
        onSubmit={(e) => {

          e.preventDefault();

          salvar();
        }}
      >

        <div className="campo">

          <label>Marca</label>

          <select
            className="input"
            value={marca}
            onChange={(e) =>
              setMarca(e.target.value)
            }
          >

            <option value="">
              Selecione
            </option>

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
            onChange={(e) =>
              setNome(e.target.value)
            }
          />

        </div>

        <div className="campo">

          <label>Ano</label>

          <input
            className="input"
            type="number"
            value={ano}

            onChange={(e) =>
              setAno(
                e.target.value
                  .replace(/\D/g, "")
                  .slice(0, 4)
              )
            }

            // Impede caracteres inválidos
            onKeyDown={(e) =>
              ["e", "E", "+", "-", "."].includes(
                e.key
              ) && e.preventDefault()
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
              setKm(
                e.target.value
                  .replace(/\D/g, "")
                  .slice(0, 6)
              )
            }

            onKeyDown={(e) =>
              ["e", "E", "+", "-", "."].includes(
                e.key
              ) && e.preventDefault()
            }
          />

        </div>

        <div className="campo">

          <label>Cor</label>

          <select
            className="input"
            value={cor}
            onChange={(e) =>
              setCor(e.target.value)
            }
          >

            <option value="">
              Selecione
            </option>

            <option>Preto</option>
            <option>Branco</option>
            <option>Vermelho</option>
            <option>Azul</option>
            <option>Cinza</option>

          </select>

        </div>

        {/*Placa*/}

        <div className="campo">

          <label>Placa</label>

          <input
            className="input"
            value={placa}
            onChange={handlePlaca}
            placeholder="ABC1D23"
          />

        </div>

        {/*Situação*/}

        <div className="campo">

          <label>Situação</label>

          <select
            className="input"
            value={situacao}
            onChange={handleSituacao}
          >

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

        {/*Tipo*/}

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

        {/*Descrição*/}

        <div className="campo">

          <label>Descrição</label>

          <textarea
            className="textarea"
            value={descricao}
            onChange={(e) =>
              setDescricao(e.target.value)
            }
          />

        </div>

        {/*Upload da imagem*/}

        <div className="campo">

          <label>Imagem</label>

          <input
            className="input-file"
            type="file"
            onChange={handleImagem}
          />

        </div>

        {/*Botão salvar type="submit" faz Enter funcionar*/}
        <button
          className="btn-salvar"
          type="submit"
        >

          {motoId
            ? "Atualizar"
            : "Salvar"}

        </button>

      </form>

    </Principal>
  );
}

export default CadastroMoto;