const MAX_ATTEMPTS = 10;
let target, attempts, score, gameOver;

const guessInput = document.getElementById('guessInput');
const guessBtn = document.getElementById('guessBtn');
const resetBtn = document.getElementById('resetBtn');
const message = document.getElementById('message');
const historyEl = document.getElementById('history');
const attemptsUsedEl = document.getElementById('attemptsUsed');
const attemptsLeftEl = document.getElementById('attemptsLeft');
const scoreEl = document.getElementById('score');

function startGame() {
    target = Math.floor(Math.random() * 100) + 1;
    attempts = 0;
    gameOver = false;
    guessInput.value = '';
    guessInput.disabled = false;
    guessBtn.disabled = false;
    historyEl.innerHTML = '';
    setMessage('Enter a number to start guessing 🙂', 'info');
    updateStats();
    guessInput.focus();
}

function setMessage(text, type) {
    message.textContent = text;
    message.className = 'msg-' + type;
}

function updateStats() {
    attemptsUsedEl.textContent = attempts;
    attemptsLeftEl.textContent = MAX_ATTEMPTS - attempts;
}

function addChip(val, type) {
    const chip = document.createElement('div');
    chip.className = 'chip ' + type;
    chip.textContent = val;
    historyEl.appendChild(chip);
}

function endGame(won) {
    gameOver = true;
    guessInput.disabled = true;
    guessBtn.disabled = true;
    if (won) {
        const points = Math.max(100 - (attempts - 1) * 10, 10);
        score += points;
        scoreEl.textContent = score;
    }
}

function handleGuess() {
    if (gameOver) return;
    const val = parseInt(guessInput.value, 10);

    if (isNaN(val) || val < 1 || val > 100) {
        setMessage('Please enter a valid number between 1 and 100', 'info');
        return;
    }

    attempts++;
    updateStats();

    if (val === target) {
        addChip(val, 'ok');
        setMessage(`🎉 Correct! The number was ${target}. (+${Math.max(100 - (attempts-1)*10, 10)} points)`, 'correct');
        endGame(true);
    } else if (val < target) {
        addChip(val, 'lo');
        setMessage('⬆️ Go higher!', 'low');
    } else {
        addChip(val, 'hi');
        setMessage('⬇️ Go lower!', 'high');
    }

    if (!gameOver && attempts >= MAX_ATTEMPTS) {
        setMessage(`❌ Out of attempts! The number was ${target}`, 'high');
        endGame(false);
    }

    guessInput.value = '';
    guessInput.focus();
}

guessBtn.addEventListener('click', handleGuess);
guessInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') handleGuess();
});
resetBtn.addEventListener('click', startGame);

score = 0;
startGame();