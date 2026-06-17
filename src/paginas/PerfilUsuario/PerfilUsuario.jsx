import { toast } from "react-toastify";
import Avatar from "../../componentes/Avatar/Avatar";
import BotaoCustomizado from "../../componentes/BotaoCustomizado/BotaoCustomizado";
import CampoCustomizado from "../../componentes/CampoCustomizado/CampoCustomizado";
import Principal from "../../componentes/Principal/Principal";
import { useAppContext } from "../../contexto/AppContext";
import { salvarUsuario } from "../../servicos/usuarios";
import "./PerfilUsuario.css";

function PerfilUsuario() {
  const { usuarioLogado, setUsuarioLogado } = useAppContext();

  const salvar = () => {
    salvarUsuario(usuarioLogado);
    toast.success("Perfil atualizado com sucesso!");
  };

  const sair = () => {
    localStorage.removeItem("usuarioLogado");
    window.location.href = "/";
  };

  return (
    <Principal titulo="Meu Perfil" voltarPara="/">
      {usuarioLogado && (
        <>
          <label for="imageUpload" className="perfil-usuario__avatar">
            <Avatar nome={usuarioLogado.nome} imagem={usuarioLogado.foto} />
            <input
              type="file"
              id="imageUpload"
              accept="image/*"
              style={{ display: "none" }}
              onChange={(e) => {
                const imagem = e.target.files[0];
                if (imagem) {
                  const reader = new FileReader();
                  reader.onload = (event) => {
                    setUsuarioLogado({ ...usuarioLogado, foto: event.target.result });
                  };
                  reader.readAsDataURL(imagem);
                }
              }}
            />
            <span className="perfil-usuario__avatar-text">Clique para alterar a foto</span>
          </label>

          <CampoCustomizado label="Email" value={usuarioLogado.email} disabled />
          <CampoCustomizado
            label="Nome"
            value={usuarioLogado.nome}
            onChange={(e) => setUsuarioLogado({ ...usuarioLogado, nome: e.target.value })}
          />

          <BotaoCustomizado tipo="primario" aoClicar={salvar}>
            Salvar
          </BotaoCustomizado>
          <BotaoCustomizado aoClicar={sair}>Sair</BotaoCustomizado>
        </>
      )}
    </Principal>
  );
}

export default PerfilUsuario;
