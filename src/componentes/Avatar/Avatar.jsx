import "./Avatar.css";

const Avatar = ({ nome, imagem }) => {

  // Gera as iniciais do nome do usuário
  let primeirasLetras = nome
    .split(" ")
    .map((item) => item[0])
    .join("")
    .toUpperCase();

  // Limita as iniciais para no máximo 2 letras
  if (primeirasLetras.length > 2) {
    primeirasLetras = primeirasLetras.slice(0, 2);
  }

  return (

    <div className="avatar__root">

      {/* Exibe a foto caso exista */}
      {imagem ? (

        <img
          src={imagem}
          alt={nome}
        />

      ) : (

        /* Caso não exista foto, exibe as iniciais */
        primeirasLetras

      )}

    </div>

  );
};

export default Avatar;