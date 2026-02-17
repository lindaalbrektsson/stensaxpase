const choices = document.querySelectorAll(".choice");

const playerText = document.getElementById("playerText");
const computerText = document.getElementById("computerText");
const resultText = document.getElementById("resultText");

const scoreText = document.getElementById("scoreText");
const matchText = document.getElementById("matchText");
const resetBtn = document.getElementById("resetBtn");

const options = ["sten", "sax", "påse"];

let playerScore = 0;
let computerScore = 0;
let gameOver = false;

function getComputerChoice() {
  const randomIndex = Math.floor(Math.random() * options.length);
  return options[randomIndex];
}

function determineWinner(playerChoice, computerChoice) {
  if (playerChoice === computerChoice) return "Oavgjort!";

  const playerWins =
    (playerChoice === "sten" && computerChoice === "sax") ||
    (playerChoice === "sax" && computerChoice === "påse") ||
    (playerChoice === "påse" && computerChoice === "sten");

  if (playerWins) {
    return "Du vann!";
  }
  return "Datorn vann!";
}

function updateScore() {
  scoreText.textContent = `Poäng: Du ${playerScore} – ${computerScore} Datorn`;
}

function endMatch(winnerText) {
  gameOver = true;
  matchText.textContent = winnerText;

  choices.forEach(btn => (btn.disabled = true));
}

function resetGame() {
  playerScore = 0;
  computerScore = 0;
  gameOver = false;

  playerText.textContent = "Du valde: —";
  computerText.textContent = "Datorn valde: —";
  resultText.textContent = "Resultat: —";

  matchText.textContent = "Bäst av 3: först till 2 vinster";
  updateScore();

  choices.forEach(btn => {
    btn.disabled = false;
    btn.classList.remove("active");
  });
}

// ====== Events ======
choices.forEach(choiceBtn => {
  choiceBtn.addEventListener("click", () => {
    if (gameOver) return;

    // Markera aktivt val
    choices.forEach(c => c.classList.remove("active"));
    choiceBtn.classList.add("active");

    // Val
    const playerChoice = choiceBtn.id;          // "sten" / "sax" / "påse"
    const computerChoice = getComputerChoice(); // "sten" / "sax" / "påse"

    // Visa val
    playerText.textContent = `Du valde: ${playerChoice}`;
    computerText.textContent = `Datorn valde: ${computerChoice}`;

    // Resultat
    const result = determineWinner(playerChoice, computerChoice);
    resultText.textContent = `Resultat: ${result}`;

    // Poäng
    if (result === "Du vann!") playerScore++;
    if (result === "Datorn vann!") computerScore++;

    updateScore();

    // Bäst av 3 (först till 2 vinster)
    if (playerScore === 2) endMatch("Du vann matchen! 🥇");
    if (computerScore === 2) endMatch("Datorn vann matchen. ☹️");
  });
});

resetBtn.addEventListener("click", resetGame);

// Init
updateScore();




