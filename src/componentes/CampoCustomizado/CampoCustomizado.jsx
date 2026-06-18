import "./CampoCustomizado.css";

function CampoCustomizado({
  label,
  obrigatorio,
  opcoes,
  ...props
}) {
  return (
    <div className="campo-customizado__root">

      {/* Texto do campo */}
      <span>
        {label} {obrigatorio}
      </span>

      {/* Campo input padrão */}
      {!opcoes && (
        <input
          className="campo-customizado__input"
          {...props}
        />
      )}

      {/* Campo select quando existir lista de opções */}
      {opcoes && (
        <select
          className="campo-customizado__input"
          {...props}
        >
          {/* Opção padrão */}
          <option
            key=""
            value=""
          >
            Selecione...
          </option>

          {/* Lista de opções */}
          {opcoes.map((opcao) => (
            <option
              key={opcao.valor}
              value={opcao.valor}
            >
              {opcao.label}
            </option>
          ))}
        </select>
      )}

    </div>
  );
}

export default CampoCustomizado;