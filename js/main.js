const choices = document.querySelectorAll(".choice");
const score = document.getElementById("score");
const result = document.getElementById("result");
const restart = document.getElementById("restart");
const modal = document.querySelector(".modal");

const scoreboard = {
  player: 0,
  computer: 0,
};

function play(event) {
  restart.style.display = "inline-block";
  const playerChoice = event.target.id;
  const computerChoice = getComputerChoice();
  const winner = getWinner(playerChoice, computerChoice);
  showWinner(winner, computerChoice);

  console.log(playerChoice, computerChoice, winner);
}

function getComputerChoice() {
  const random = Math.random();
  if (random < 0.34) {
    return "rock";
  } else if (random <= 0.67) {
    return "paper";
  } else {
    return "scissors";
  }
}

function getWinner(p, c) {
  if (p === c) {
    return "draw";
  } else if (p === "rock") {
    if (c === "paper") {
      return "computer";
    } else {
      return "player";
    }
  } else if (p === "paper") {
    if (c === "scissors") {
      return "computer";
    } else {
      return "player";
    }
  } else if (p === "scissors") {
    if (c === "rock") {
      return "computer";
    } else {
      return "player";
    }
  }
}

function showWinner(winner, computerChoice) {
  if (winner === "player") {
    scoreboard.player++;
    result.innerHTML = `
    <h1 class="text-win">You win</h1>
    <i class="fas fa-hand-${computerChoice} fa-10x"</i>
    <p>Computer chose <strong>${computerChoice}</strong></p>
    `;
  } else if (winner === "computer") {
    scoreboard.computer++;
    result.innerHTML = `
    <h1 class="text-lose">You lose</h1>
    <i class="fas fa-hand-${computerChoice} fa-10x"</i>
    <p>Computer chose <strong>${computerChoice}</strong></p>
    `;
  } else {
    result.innerHTML = `
    <h1>Its a draw</h1>
    <i class="fas fa-hand-${computerChoice}" fa-10x"</i>
    <p>Computer chose <strong>${computerChoice}</strong></p>
    `;
  }
  score.innerHTML = `<p>Player:${scoreboard.player}</p>
                 <p>Computer:${scoreboard.computer}</p>
  `;

  modal.style.display = "block";
}

function clearModal(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

function restartGame() {
  scoreboard.player = 0;
  scoreboard.computer = 0;
  score.innerHTML = `
  <p>Player:0</p>
  <p>Computer:0</p>
  `;
  restart.style.display = "none";
}

choices.forEach((choice) => choice.addEventListener("click", play));

window.addEventListener("click", clearModal);

restart.addEventListener("click", restartGame);
