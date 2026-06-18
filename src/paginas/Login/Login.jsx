import "./Login.css";

import { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import BotaoCustomizado from "../../componentes/BotaoCustomizado/BotaoCustomizado";
import CampoCustomizado from "../../componentes/CampoCustomizado/CampoCustomizado";
import Principal from "../../componentes/Principal/Principal";

function Login() {
  // Estado do formulário de login
  const [loginForm, setLoginForm] = useState({
    email: "",
    senha: "",
  });

  // Realiza a validação e autenticação do usuário
  const entrar = () => {
    if (!loginForm.email.trim() || !loginForm.senha.trim()) {
      toast.error("Preencha todos os campos para entrar!");
      return;
    }

    const usuariosDoLocalStorage =
      JSON.parse(localStorage.getItem("usuarios")) || [];

    const usuarioEncontrado = usuariosDoLocalStorage.find(
      (u) =>
        u.email === loginForm.email &&
        u.senha === loginForm.senha
    );

    if (!usuarioEncontrado) {
      toast.error("Email ou senha incorretos!");
      return;
    }

    localStorage.setItem(
      "usuarioLogado",
      usuarioEncontrado.id
    );

    window.location.href = "/";
  };

  return (
    <Principal>
      {/* Formulário de login */}
      <div className="login__form">
        <h2 className="login__titulo">
          Seja bem-vindo!
        </h2>

        {/* Campo de e-mail */}
        <CampoCustomizado
          label="E-mail"
          value={loginForm.email}
          onChange={(e) =>
            setLoginForm({
              ...loginForm,
              email: e.target.value,
            })
          }
          onKeyPress={(e) =>
            e.code === "Enter" && entrar()
          }
        />

        {/* Campo de senha */}
        <CampoCustomizado
          type="password"
          label="Senha"
          value={loginForm.senha}
          onChange={(e) =>
            setLoginForm({
              ...loginForm,
              senha: e.target.value,
            })
          }
          onKeyPress={(e) =>
            e.code === "Enter" && entrar()
          }
        />

        {/* Botão de acesso ao sistema */}
        <BotaoCustomizado
          tipo="primario"
          aoClicar={entrar}
        >
          Entrar
        </BotaoCustomizado>

        {/* Link para cadastro de novo usuário */}
        <Link
          to="/novo-usuario"
          className="login__link-cadastro"
        >
          Não tem uma conta? Cadastre-se!
        </Link>
      </div>
    </Principal>
  );
}

export default Login;