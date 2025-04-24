const playerScoreElem = document.getElementById('player-score');
const computerScoreElem = document.getElementById('computer-score');
const resultText = document.getElementById('result-text');
const choiceButtons = document.querySelectorAll('.choice-button');
const playAgainBtn = document.querySelector('.play-again-button');


let playerScore = 0;
let computerScore = 0;
let gameOver = false;

playAgainBtn.textContent = 'Play Again';
playAgainBtn.className = 'play-again-button';
playAgainBtn.style.display = 'none';
document.querySelector('.play-again-container').appendChild(playAgainBtn);

choiceButtons.forEach(button => {
  button.addEventListener('click', () => {
    if (gameOver) return;

    const playerChoice = button.dataset.choice;
    const computerChoice = getComputerChoice();
    const result = determineWinner(playerChoice, computerChoice);
    updateScores(result);
    displayResult(result, playerChoice, computerChoice);

    if (playerScore === 5 || computerScore === 5) {
      gameOver = true;
      displayFinalResult();
    }
  });
});

playAgainBtn.addEventListener('click', () => {
  playerScore = 0;
  computerScore = 0;
  gameOver = false;
  playerScoreElem.textContent = playerScore;
  computerScoreElem.textContent = computerScore;
  resultText.textContent = 'Make your move!';
  playAgainBtn.style.display = 'none';
});

function getComputerChoice() {
  const choices = ['rock', 'paper', 'scissors'];
  return choices[Math.floor(Math.random() * choices.length)];
}

function determineWinner(player, computer) {
  if (player === computer) return 'draw';
  if (
    (player === 'rock' && computer === 'scissors') ||
    (player === 'paper' && computer === 'rock') ||
    (player === 'scissors' && computer === 'paper')
  ) {
    return 'player';
  } else {
    return 'computer';
  }
}

function updateScores(winner) {
  if (winner === 'player') {
    playerScore++;
    playerScoreElem.textContent = playerScore;
  } else if (winner === 'computer') {
    computerScore++;
    computerScoreElem.textContent = computerScore;
  }
}

function displayResult(winner, playerChoice, computerChoice) {
  if (winner === 'draw') {
    resultText.textContent = `It's a draw! You both chose ${playerChoice}.`;
  } else if (winner === 'player') {
    resultText.textContent = `You win! ${capitalize(playerChoice)} beats ${computerChoice}.`;
  } else {
    resultText.textContent = `You lose! ${capitalize(computerChoice)} beats ${playerChoice}.`;
  }
}

function displayFinalResult() {
  if (playerScore === 5) {
    resultText.textContent = '🎉 You won the game!';
  } else {
    resultText.textContent = '😞 Computer won the game!';
  }
  playAgainBtn.style.display = 'block';
}

function capitalize(word) {
  return word.charAt(0).toUpperCase() + word.slice(1);
}
