var choices = ["rock", "paper", "scissors"];
var humanScore = 0;
var computerScore = 0;
var ties = 0;
var scoreDisplay = document.getElementById("score");
var resultText = document.getElementById("result-text");
var buttons = document.querySelectorAll("[data-choice]");
var resetButton = document.getElementById("reset");
function getComputerChoice() {
    return choices[Math.floor(Math.random() * choices.length)];
}
function playRound(humanChoice, computerChoice) {
    if (humanChoice === computerChoice) {
        ties++;
        return "Tie! You both chose ".concat(humanChoice, ".");
    }
    var win = (humanChoice === "rock" && computerChoice === "scissors") ||
        (humanChoice === "paper" && computerChoice === "rock") ||
        (humanChoice === "scissors" && computerChoice === "paper");
    if (win) {
        humanScore++;
        return "You win the round! ".concat(humanChoice, " beats ").concat(computerChoice, ".");
    }
    else {
        computerScore++;
        return "You lose the round! ".concat(computerChoice, " beats ").concat(humanChoice, ".");
    }
}
function updateDisplay(result) {
    resultText.textContent = result;
    scoreDisplay.textContent = "You: ".concat(humanScore, " | Computer: ").concat(computerScore, " | Ties: ").concat(ties);
    if (humanScore === 5 || computerScore === 5) {
        var winner = humanScore === 5 ? "You win the game!" : "Computer wins the game!";
        resultText.textContent = winner;
        buttons.forEach(function (btn) { return btn.setAttribute("disabled", "true"); });
    }
}
buttons.forEach(function (button) {
    button.addEventListener("click", function () {
        var humanChoice = button.getAttribute("data-choice");
        var computerChoice = getComputerChoice();
        var result = playRound(humanChoice, computerChoice);
        updateDisplay(result);
    });
});
resetButton.addEventListener("click", function () {
    humanScore = 0;
    computerScore = 0;
    ties = 0;
    resultText.textContent = "Make your move!";
    scoreDisplay.textContent = "You: 0 | Computer: 0 | Ties: 0";
    buttons.forEach(function (btn) { return btn.removeAttribute("disabled"); });
});
