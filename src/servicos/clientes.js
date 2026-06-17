const clientesDoLocalStorage = JSON.parse(localStorage.getItem("clientes")) || [];

export const buscarClientesPeloUsuario = (idUsuario) => {
  return clientesDoLocalStorage.filter((cliente) => cliente.idUsuario === idUsuario);
};

export const buscarClientePeloId = (idCliente) => {
  return clientesDoLocalStorage.find((cliente) => cliente.id === idCliente);
};

export const adicionarCliente = (cliente, idUsuario) => {
  const novoCliente = { id: crypto.randomUUID(), idUsuario, ...cliente };
  clientesDoLocalStorage.push(novoCliente);
  localStorage.setItem("clientes", JSON.stringify(clientesDoLocalStorage));
};

export const atualizarCliente = (clienteAtualizado) => {
  const indexDoCliente = clientesDoLocalStorage.findIndex(
    (cliente) => cliente.id === clienteAtualizado.id
  );
  clientesDoLocalStorage[indexDoCliente] = clienteAtualizado;
  localStorage.setItem("clientes", JSON.stringify(clientesDoLocalStorage));
};

export const removerClientePeloId = (idCliente) => {
  const clientesAtualizados = clientesDoLocalStorage.filter((cliente) => cliente.id !== idCliente);
  localStorage.setItem("clientes", JSON.stringify(clientesAtualizados));
};
