// =====================================================================
// 🧠 JOGO DA VELHA COM PLACAR
// =====================================================================

let tabuleiro = [];
let jogador = 1;
let jogoAtivo = true;

// Variáveis para o placar
let vitorias1 = 0;
let vitorias2 = 0;
let empates = 0;

// =====================================================================
// INICIAR JOGO
// =====================================================================
function iniciar() {
  // Cria o tabuleiro vazio
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

// =====================================================================
// DESENHAR TABULEIRO
// =====================================================================
function desenharTabuleiro() {
  let html = "<table>";
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

// =====================================================================
// JOGAR
// =====================================================================
function jogar(linha, coluna) {
  if (!jogoAtivo) return;
  if (tabuleiro[linha][coluna] !== "") return;

  // Marca X ou O
  tabuleiro[linha][coluna] = jogador === 1 ? "X" : "O";
  desenharTabuleiro();

  // Verifica vitória
  const vitoria = verificarVitoria();

  if (vitoria !== null) {
    destacarVitoria(vitoria);
    document.getElementById("aviso").innerText = `🎉 Jogador ${jogador} venceu!`;

    // Atualiza o placar
    if (jogador === 1) vitorias1++;
    else vitorias2++;
    atualizarPlacar();

    jogoAtivo = false;
    setTimeout(() => {
      if (confirm("Jogar novamente?")) iniciar();
    }, 800);
    return;
  }

  // Verifica empate
  if (verificarEmpate()) {
    document.getElementById("aviso").innerText = "😐 Empate!";
    empates++;
    atualizarPlacar();
    jogoAtivo = false;
    setTimeout(() => {
      if (confirm("Jogar novamente?")) iniciar();
    }, 800);
    return;
  }

  // Troca jogador
  jogador = jogador === 1 ? 2 : 1;
  document.getElementById("aviso").innerText = `Vez do jogador ${jogador}`;
}

// =====================================================================
// VERIFICAR VITÓRIA
// =====================================================================
function verificarVitoria() {
  for (let i = 0; i < 3; i++) {
    if (tabuleiro[i][0] !== "" &&
        tabuleiro[i][0] === tabuleiro[i][1] &&
        tabuleiro[i][1] === tabuleiro[i][2]) {
      return [[i,0],[i,1],[i,2]];
    }
  }

  for (let j = 0; j < 3; j++) {
    if (tabuleiro[0][j] !== "" &&
        tabuleiro[0][j] === tabuleiro[1][j] &&
        tabuleiro[1][j] === tabuleiro[2][j]) {
      return [[0,j],[1,j],[2,j]];
    }
  }

  if (tabuleiro[0][0] !== "" &&
      tabuleiro[0][0] === tabuleiro[1][1] &&
      tabuleiro[1][1] === tabuleiro[2][2]) {
    return [[0,0],[1,1],[2,2]];
  }

  if (tabuleiro[0][2] !== "" &&
      tabuleiro[0][2] === tabuleiro[1][1] &&
      tabuleiro[1][1] === tabuleiro[2][0]) {
    return [[0,2],[1,1],[2,0]];
  }

  return null;
}

// =====================================================================
// DESTACAR VITÓRIA
// =====================================================================
function destacarVitoria(celulas) {
  for (const [i, j] of celulas) {
    const celula = document.getElementById(`cel${i}${j}`);
    celula.style.backgroundColor = "#9aff9a";
    celula.style.fontWeight = "bold";
  }
}

// =====================================================================
// VERIFICAR EMPATE
// =====================================================================
function verificarEmpate() {
  return tabuleiro.flat().every(c => c !== "");
}

// =====================================================================
// ATUALIZAR PLACAR
// =====================================================================
function atualizarPlacar() {
  document.getElementById("vitorias1").innerText = vitorias1;
  document.getElementById("vitorias2").innerText = vitorias2;
  document.getElementById("empates").innerText = empates;
}
