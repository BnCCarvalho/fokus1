const html = document.querySelector("html");

const banner = document.querySelector(".app__image");
const titulo = document.querySelector(".app__title");

const focoBt = document.querySelector(".app__card-button--foco");
const curtoBt = document.querySelector(".app__card-button--curto");
const longoBt = document.querySelector(".app__card-button--longo");
const botoes = document.querySelectorAll(".app__card-button");
const startPauseBt = document.querySelector("#start-pause");
const restartBt = document.querySelector("#reset");

const musicaFocoInput = document.querySelector("#alternar-musica");
const iniciarOuPausarBt = document.querySelector(
  ".app__card-primary-button-label"
);
const tempoNaTela = document.querySelector("#timer");

const musica = new Audio("/sons/luna-rise-part-one.mp3");
const somPlay = new Audio("/sons/play.wav");
const somPause = new Audio("/sons/pause.mp3");
const somRestart = new Audio("/sons/reset.mp3");
const somFimTempo = new Audio("/sons/beep.mp3");

const imgPlay = "/imagens/play_arrow.png";
const imgPause = "/imagens/pause.png";
const imgTocador = document.querySelector(".app__card-primary-butto-icon");

let tempoDecorridoEmSegundos = 1500;
let intervaloId = null;

musica.loop = true;

//desafio: colocar uma musica para cada tipo de foco
musicaFocoInput.addEventListener("change", () => {
  musica.paused ? musica.play() : musica.pause();
});

focoBt.addEventListener("click", () => {
  tempoDecorridoEmSegundos = 1500;
  alterarContexto("foco");
  focoBt.classList.add("active");
});

curtoBt.addEventListener("click", () => {
  tempoDecorridoEmSegundos = 300;
  alterarContexto("descanso-curto");
  curtoBt.classList.add("active");
});

longoBt.addEventListener("click", () => {
  tempoDecorridoEmSegundos = 900;
  alterarContexto("descanso-longo");
  longoBt.classList.add("active");
});

function alterarContexto(contexto) {
  exibirTempo();
  botoes.forEach(function (contexto) {
    contexto.classList.remove("active");
  });

  html.setAttribute("data-contexto", contexto);
  banner.setAttribute("src", `/imagens/${contexto}.png`);
  switch (contexto) {
    case "foco":
      titulo.innerHTML = `Otimize sua produtividade,<br />
      <strong class="app__title-strong">mergulhe no que importa.</strong>`;
      break;

    case "descanso-curto":
      titulo.innerHTML = `Que tal dar uma respirada?<br />
      <strong class="app__title-strong">Faça uma pausa curta!</strong>`;
      break;

    case "descanso-longo":
      titulo.innerHTML = `Hora de voltar à superfície.<br />
      <strong class="app__title-strong">Faça uma pausa longa.</strong>`;
      break;

    default:
      break;
  }
}

const contagemRegressiva = () => {
  if (tempoDecorridoEmSegundos <= 0) {
    somFimTempo.play();
    alert("Tempo finalizado");
    zerar();
    return;
  }

  tempoDecorridoEmSegundos -= 1;
  exibirTempo();
};

startPauseBt.addEventListener("click", iniciarOuPausar);

function iniciarOuPausar() {
  if (intervaloId) {
    somPause.play();
    zerar();
    return;
  }
  somPlay.play();
  imgTocador.src = `${imgPause}`;
  intervaloId = setInterval(contagemRegressiva, 1000);
  // iniciarOuPausarBt.textContent = "Pausar";
}

function zerar() {
  clearInterval(intervaloId);
  // iniciarOuPausarBt.textContent = "Começar";
  imgTocador.src = `${imgPlay}`;
  intervaloId = null;
}

function exibirTempo() {
  const tempo = new Date(tempoDecorridoEmSegundos * 1000);
  const tempoFormatado = tempo.toLocaleTimeString("pt-br", {
    minute: "2-digit",
    second: "2-digit",
  });
  tempoNaTela.innerHTML = `${tempoFormatado}`;
}

restartBt.addEventListener("click", resetarTempo);

function resetarTempo() {
  somRestart.play();
  zerar();
  tempoDecorridoEmSegundos = 1500;
  alterarContexto("foco");
  focoBt.classList.add("active");
}

exibirTempo();
