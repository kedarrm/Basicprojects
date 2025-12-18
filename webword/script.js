const wordToGuess = "apple"; // Change this to any 5-letter word
const maxAttempts = 6;
let currentAttempt = 0;

const board = document.getElementById('board');
const input = document.getElementById('guess-input');
const submitButton = document.getElementById('submit-button');
const message = document.getElementById('message');

// Create board tiles
for (let i = 0; i < maxAttempts * 5; i++) {
  const tile = document.createElement('div');
  tile.classList.add('tile');
  board.appendChild(tile);
}

submitButton.addEventListener('click', () => {
  const guess = input.value.toLowerCase();
  if (guess.length !== 5) {
    message.textContent = "Please enter a 5-letter word!";
    return;
  }

  if (currentAttempt >= maxAttempts) {
    message.textContent = "Game over! You've used all attempts.";
    return;
  }

  const rowStart = currentAttempt * 5;
  const tiles = document.querySelectorAll('.tile');
  let isCorrect = true;

  // Color tiles based on guess
  for (let i = 0; i < 5; i++) {
    const tile = tiles[rowStart + i];
    tile.textContent = guess[i];
    if (guess[i] === wordToGuess[i]) {
      tile.classList.add('correct');
    } else if (wordToGuess.includes(guess[i])) {
      tile.classList.add('present');
      isCorrect = false;
    } else {
      tile.classList.add('absent');
      isCorrect = false;
    }
  }

  if (guess === wordToGuess) {
    message.textContent = "Congratulations! You've guessed the word!";
    return;
  }

  currentAttempt++;
  if (currentAttempt >= maxAttempts) {
    message.textContent = `Game over! The word was "${wordToGuess}".`;
  }

  input.value = "";
});
