const caixa = document.querySelector(".cartas");
gameArray = [];

const Fotos = [
  "bobrossparrot",
  "fiestaparrot",
  "explodyparrot",
  "metalparrot",
  "revertitparrot",
  "tripletsparrot",
  "unicornparrot"
];

let contadorDeJogadas = 0;
let Finalizadas = 0;

const criarElemento = (tag, className) => {
  const elemento = document.createElement(tag);
  elemento.className = className;
  return elemento;
};
let primeiraCarta = "";
let segundaCarta = "";

function Final_Jogo() {
  alert(`VocÃª ganhou em ${contadorDeJogadas} jogadas!`);
}

const checarcartas = () => {
  const primeiraFoto = primeiraCarta.getAttribute("nome-foto");
  const segundaFoto = segundaCarta.getAttribute("nome-foto");

  if (primeiraFoto === segundaFoto) {
    primeiraCarta.firstChild.classList.add("carta-certa");
    segundaCarta.firstChild.classList.add("carta-certa");
    primeiraCarta = "";
    segundaCarta = "";

    Finalizadas++;
  } else {
    setTimeout(() => {
      primeiraCarta.classList.remove("virar-carta");
      segundaCarta.classList.remove("virar-carta");

      primeiraCarta = "";
      segundaCarta = "";
    }, 800);
  }
  
};

const clique = ({ target }) => {
  if (target.parentNode.className.includes("virar-carta")) {
    return;
  }

  if (primeiraCarta === "") {
    target.parentNode.classList.add("virar-carta");
    primeiraCarta = target.parentNode;
    contadorDeJogadas++;
  } else if (segundaCarta === "") {
    target.parentNode.classList.add("virar-carta");
    segundaCarta = target.parentNode;
    contadorDeJogadas++;
    checarcartas();   
    alertaFinal(); 
  }
};

const criarCarta = (foto) => {
  const carta = criarElemento("div", "carta");
  const frente = criarElemento("div", "lado frente");
  const verso = criarElemento("div", "lado verso");

  frente.style.backgroundImage = `url('img/${foto}.gif')`;

  carta.appendChild(frente);
  carta.appendChild(verso);

  carta.addEventListener("click", clique);
  carta.setAttribute("nome-foto", foto);

  return carta;
};

const loadGame = () => {
  Fotos.sort(() => Math.random() - 0.5);
    let numero = 0;
    while (numero < 4 || numero > 14 || numero % 2 === 1) {
      numero = prompt("Digite o número de cartas (números entre 4 e 14)");
    }
  
    for (let i = 0; i < numero / 2; i++) {
      gameArray[i] = Fotos[i];
    }
  
    const duplicarFotos = [...gameArray, ...gameArray];
  
    const fotosEmbaralhadas = duplicarFotos.sort(() => Math.random() - 0.5);
  
    fotosEmbaralhadas.forEach((foto) => {
      const carta = criarCarta(foto);
      caixa.appendChild(carta);
    });
  };
  
  loadGame();
  
  function alertaFinal() {
    if (Finalizadas === gameArray.length) {
      alert(`Você ganhou em ${contadorDeJogadas} jogadas`);
    }
  }


