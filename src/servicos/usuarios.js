const usuariosDoLocalStorage = JSON.parse(localStorage.getItem("usuarios")) || [];

export const buscarUsuarioLogado = () => {
  const idUsuarioLogado = localStorage.getItem("usuarioLogado");

  if (!idUsuarioLogado) {
    return null;
  }

  return usuariosDoLocalStorage.find((u) => u.id === idUsuarioLogado) || null;
};

export const salvarUsuario = (usuarioAtualizado) => {
  const indexDoUsuario = usuariosDoLocalStorage.findIndex((u) => u.id === usuarioAtualizado.id);
  usuariosDoLocalStorage[indexDoUsuario] = usuarioAtualizado;
  localStorage.setItem("usuarios", JSON.stringify(usuariosDoLocalStorage));
};
