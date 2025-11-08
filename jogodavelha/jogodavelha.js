let tabuleiro = [];
let jogador = 1;
let jogoAtivo = true;

function iniciar() {
  tabuleiro = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""]
  ];

  jogador = 1;
  jogoAtivo = true;

  desenharTabuleiro();
  document.getElementById("aviso").innerText = "Vez do jogador 1";
}

function desenharTabuleiro() {
  let html = "<table border='1'>";
  for (let i = 0; i < 3; i++) {
    html += "<tr>";
    for (let j = 0; j < 3; j++) {
      html += `<td onclick="jogar(${i}, ${j})" id="cel${i}${j}">${tabuleiro[i][j]}</td>`;
    }
    html += "</tr>";
  }
  html += "</table>";
  document.getElementById("board").innerHTML = html;
}

function jogar(linha, coluna) {
  if (!jogoAtivo) return;

  if (tabuleiro[linha][coluna] !== "") return;

  tabuleiro[linha][coluna] = jogador === 1 ? "X" : "O";
  desenharTabuleiro();

  const vitoria = verificarVitoria();

  // Só destaca se realmente houver vitória
  if (vitoria !== null) {
    destacarVitoria(vitoria);
    document.getElementById("aviso").innerText = `🎉 Jogador ${jogador} venceu!`;
    jogoAtivo = false;
    setTimeout(() => {
      if (confirm("Jogar novamente?")) iniciar();
    }, 800);
    return;
  }

  if (verificarEmpate()) {
    document.getElementById("aviso").innerText = "😐 Empate!";
    jogoAtivo = false;
    setTimeout(() => {
      if (confirm("Jogar novamente?")) iniciar();
    }, 800);
    return;
  }

  jogador = jogador === 1 ? 2 : 1;
  document.getElementById("aviso").innerText = `Vez do jogador ${jogador}`;
}

function verificarVitoria() {
  // Linhas
  for (let i = 0; i < 3; i++) {
    if (tabuleiro[i][0] !== "" &&
        tabuleiro[i][0] === tabuleiro[i][1] &&
        tabuleiro[i][1] === tabuleiro[i][2]) {
      return [[i, 0], [i, 1], [i, 2]];
    }
  }

  // Colunas
  for (let j = 0; j < 3; j++) {
    if (tabuleiro[0][j] !== "" &&
        tabuleiro[0][j] === tabuleiro[1][j] &&
        tabuleiro[1][j] === tabuleiro[2][j]) {
      return [[0, j], [1, j], [2, j]];
    }
  }

  // Diagonais
  if (tabuleiro[0][0] !== "" &&
      tabuleiro[0][0] === tabuleiro[1][1] &&
      tabuleiro[1][1] === tabuleiro[2][2]) {
    return [[0, 0], [1, 1], [2, 2]];
  }

  if (tabuleiro[0][2] !== "" &&
      tabuleiro[0][2] === tabuleiro[1][1] &&
      tabuleiro[1][1] === tabuleiro[2][0]) {
    return [[0, 2], [1, 1], [2, 0]];
  }

  // Nenhuma vitória
  return null;
}

function destacarVitoria(celulas) {
  if (!celulas) return; // evita erro caso seja null
  for (const [i, j] of celulas) {
    const celula = document.getElementById(`cel${i}${j}`);
    celula.style.backgroundColor = "#9aff9a";
    celula.style.fontWeight = "bold";
  }
}

function verificarEmpate() {
  return tabuleiro.flat().every(c => c !== "");
}
