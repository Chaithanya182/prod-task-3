const cells = document.querySelectorAll(".cell");
const statusDisplay = document.getElementById("status");
const resetButton = document.getElementById("resetBtn");

let gameActive = true;
let currentPlayer = "X";
let gameState = ["", "", "", "", "", "", "", "", ""];

const winningConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

function initializeGame() {
  currentPlayer = "X";
  gameActive = true;
  gameState = ["", "", "", "", "", "", "", "", ""];
  statusDisplay.textContent = "Player X's Turn";
  cells.forEach((cell) => {
    cell.textContent = "";
    cell.style.backgroundColor = "#f0f0f0";
  });
}

function handleCellClick(clickedCellEvent) {
  const clickedCell = clickedCellEvent.target;
  const clickedCellIndex = parseInt(
    clickedCell.getAttribute("id").substring(5)
  );

  if (gameState[clickedCellIndex] !== "" || !gameActive) {
    return;
  }

  gameState[clickedCellIndex] = currentPlayer;
  clickedCell.textContent = currentPlayer;
  clickedCell.style.backgroundColor =
    currentPlayer === "X" ? "#546e7a" : "#ffd54f";
  checkWin();
  checkDraw();
  currentPlayer = currentPlayer === "X" ? "O" : "X";
  statusDisplay.textContent = `Player ${currentPlayer}'s Turn`;
}

function checkWin() {
  for (let condition of winningConditions) {
    const [a, b, c] = condition;
    if (
      gameState[a] !== "" &&
      gameState[a] === gameState[b] &&
      gameState[a] === gameState[c]
    ) {
      statusDisplay.textContent = `Player ${gameState[a]} Wins!`;
      gameActive = false;
      cells.forEach(
        (cell) =>
          (cell.style.backgroundColor =
            gameState[a] === "X" ? "#78909c" : "#ffe082")
      );
      return;
    }
  }
}

function checkDraw() {
  if (!gameState.includes("") && gameActive) {
    statusDisplay.textContent = "It's a Draw!";
    gameActive = false;
  }
}

cells.forEach((cell) => {
  cell.addEventListener("click", handleCellClick);
});

resetButton.addEventListener("click", initializeGame);

initializeGame();
