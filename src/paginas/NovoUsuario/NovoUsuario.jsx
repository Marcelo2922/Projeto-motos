import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import BotaoCustomizado from "../../componentes/BotaoCustomizado/BotaoCustomizado";
import CampoCustomizado from "../../componentes/CampoCustomizado/CampoCustomizado";
import Principal from "../../componentes/Principal/Principal";
import validarEmail from "../../utils/validarEmail";
import validarSenha from "../../utils/validarSenha";

function NovoUsuario() {
  // Controle de navegação entre páginas
  const navigate = useNavigate();

  // Estado do formulário de cadastro
  const [usuarioForm, setUsuarioForm] = useState({
    nome: "",
    email: "",
    senha: "",
    confirmacaoSenha: "",
  });

  // Validação e salvamento do novo usuário
  const salvar = () => {
    if (
      !usuarioForm.nome.trim() ||
      !usuarioForm.email.trim() ||
      !usuarioForm.senha.trim()
    ) {
      toast.error("Todos os campos são obrigatórios.");
      return;
    }

    if (!validarEmail(usuarioForm.email)) {
      toast.error("Email inválido.");
      return;
    }

    if (!validarSenha(usuarioForm.senha)) {
      toast.error(
        "A senha deve conter no mínimo 4 caracteres."
      );
      return;
    }

    if (
      usuarioForm.senha !==
      usuarioForm.confirmacaoSenha
    ) {
      toast.error("As senhas não coincidem.");
      return;
    }

    const usuariosDoLocalStorage =
      JSON.parse(localStorage.getItem("usuarios")) || [];

    const usuarioJaCadastrado =
      usuariosDoLocalStorage.find(
        (u) => u.email === usuarioForm.email
      );

    if (usuarioJaCadastrado) {
      // Verifica se já existe um usuário com o mesmo e-mail
      toast.error("Este email já está cadastrado.");
      return;
    }

    usuariosDoLocalStorage.push({
      id: crypto.randomUUID(),
      ...usuarioForm,
    });

    localStorage.setItem(
      "usuarios",
      JSON.stringify(usuariosDoLocalStorage)
    );

    toast.success("Usuário cadastrado com sucesso!");
    navigate("/login");
  };

  return (
    <Principal
      titulo="Novo Usuário"
      voltarPara="/login"
    >
      {/* Campo Nome */}
      <CampoCustomizado
        label="Nome"
        id="nome"
        value={usuarioForm.nome}
        onChange={(e) =>
          setUsuarioForm({
            ...usuarioForm,
            nome: e.target.value,
          })
        }
        obrigatorio
      />

      {/* Campo E-mail */}
      <CampoCustomizado
        label="Email"
        type="email"
        value={usuarioForm.email}
        onChange={(e) =>
          setUsuarioForm({
            ...usuarioForm,
            email: e.target.value,
          })
        }
        onBlur={(e) => {
          if (!validarEmail(e.target.value)) {
            toast.error("Email inválido.");
          }
        }}
        obrigatorio
      />

      {/* Campo Senha */}
      <CampoCustomizado
        label="Senha"
        type="password"
        value={usuarioForm.senha}
        onChange={(e) =>
          setUsuarioForm({
            ...usuarioForm,
            senha: e.target.value,
          })
        }
        onBlur={(e) => {
          if (!validarSenha(e.target.value)) {
            toast.error(
              "A senha deve conter no mínimo 4 caracteres."
            );
          }
        }}
        obrigatorio
      />

      {/* Campo Confirmação de Senha */}
      <CampoCustomizado
        label="Confirmação da Senha"
        type="password"
        value={usuarioForm.confirmacaoSenha}
        onChange={(e) =>
          setUsuarioForm({
            ...usuarioForm,
            confirmacaoSenha: e.target.value,
          })
        }
        obrigatorio
      />

      {/* Botão de cadastro */}
      <BotaoCustomizado
        tipo="secundario"
        aoClicar={salvar}
      >
        Salvar
      </BotaoCustomizado>
    </Principal>
  );
}

export default NovoUsuario;