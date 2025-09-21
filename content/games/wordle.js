// Wordle Game - No API dependency
class WordleGame {
    constructor() {
        this.word = 'REACT';
        this.guesses = [];
        this.currentGuess = '';
        this.currentRow = 0;
        this.gameOver = false;
        this.gameWon = false;
        
        this.init();
    }

    async init() {
        await this.loadDailyWord();
        this.createGameBoard();
        this.setupEventListeners();
    }

    async loadDailyWord() {
        // For testing: always get a new random word on refresh
        // Comment out the localStorage check below to enable daily words
        /*
        const storedData = localStorage.getItem('wordleDaily');
        const today = new Date().toDateString();
        
        if (storedData) {
            const data = JSON.parse(storedData);
            if (data.date === today) {
                this.word = data.word.toUpperCase();
                console.log('Using stored word for today:', this.word);
                return;
            }
        }
        */

        // Load word bank and pick a random word
        try {
            const response = await fetch('content/games/wordle-bank.txt');
            const text = await response.text();
            const words = text.trim().split('\n').map(word => word.trim());
            
            // Pick a truly random word for testing
            const wordIndex = Math.floor(Math.random() * words.length);
            const selectedWord = words[wordIndex];
            
            this.word = selectedWord.toUpperCase();
            
            // Don't store for testing - get new word each refresh
            // localStorage.setItem('wordleDaily', JSON.stringify({
            //     date: today,
            //     word: selectedWord
            // }));
        } catch (error) {
            this.word = 'REACT';
        }
    }

    createGameBoard() {
        const gameContainer = document.querySelector('.placeholder');
        if (!gameContainer) return;

        gameContainer.innerHTML = `
            <div class="wordle-game">
                <div class="wordle-header">
                    <h3>Daily Wordle</h3>
                    <div class="wordle-stats">
                        <span class="attempts">${this.currentRow}/6</span>
                    </div>
                </div>
                <div class="wordle-board" id="wordleBoard">
                    ${this.createRows()}
                </div>
                <div class="wordle-result" id="wordleResult"></div>
            </div>
        `;
    }

    createRows() {
        let rows = '';
        for (let i = 0; i < 6; i++) {
            rows += `
                <div class="wordle-row" data-row="${i}">
                    ${this.createCells(i)}
                </div>
            `;
        }
        return rows;
    }

    createCells(rowIndex) {
        let cells = '';
        for (let i = 0; i < 5; i++) {
            const isCurrentRow = rowIndex === this.currentRow;
            const isCurrentCell = isCurrentRow && i === this.currentGuess.length;
            const letter = this.guesses[rowIndex] ? this.guesses[rowIndex][i] : '';
            
            cells += `
                <div class="wordle-cell ${isCurrentCell ? 'current' : ''}" data-cell="${rowIndex}-${i}">
                    ${letter}
                </div>
            `;
        }
        return cells;
    }


    setupEventListeners() {
        // Keyboard input
        document.addEventListener('keydown', (e) => {
            if (this.gameOver) return;
            
            if (e.key === 'Enter') {
                this.submitGuess();
            } else if (e.key === 'Backspace') {
                this.removeLetter();
            } else if (e.key.match(/[a-zA-Z]/) && e.key.length === 1) {
                this.addLetter(e.key.toUpperCase());
            }
        });

    }

    addLetter(letter) {
        if (this.currentGuess.length < 5) {
            this.currentGuess += letter;
            this.updateDisplay();
        }
    }

    removeLetter() {
        if (this.currentGuess.length > 0) {
            this.currentGuess = this.currentGuess.slice(0, -1);
            this.updateDisplay();
        }
    }

    updateDisplay() {
        const currentRow = document.querySelector(`[data-row="${this.currentRow}"]`);
        if (!currentRow) return;

        const cells = currentRow.querySelectorAll('.wordle-cell');
        cells.forEach((cell, index) => {
            if (index < this.currentGuess.length) {
                cell.textContent = this.currentGuess[index];
            } else {
                cell.textContent = '';
            }
        });
    }

    async submitGuess() {
        if (this.currentGuess.length !== 5) return;
        if (this.gameOver) return;

        this.guesses[this.currentRow] = this.currentGuess;
        this.updateGuessColors(this.currentGuess, this.currentRow);
        
        if (this.currentGuess === this.word) {
            this.gameWon = true;
            this.gameOver = true;
            this.showWinMessage();
        } else if (this.currentRow >= 5) {
            this.gameOver = true;
            this.showLoseMessage();
        } else {
            this.currentRow++;
            this.currentGuess = '';
            this.updateDisplay();
        }

        this.updateStats();
    }

    updateGuessColors(guess, rowIndex) {
        const row = document.querySelector(`[data-row="${rowIndex}"]`);
        const cells = row.querySelectorAll('.wordle-cell');

        const wordArray = this.word.split('');
        const guessArray = guess.split('');
        const remainingLetters = [...wordArray];

        // First pass: mark correct letters
        guessArray.forEach((letter, index) => {
            if (letter === wordArray[index]) {
                cells[index].classList.add('correct');
                remainingLetters[index] = null;
            }
        });

        // Second pass: mark present letters
        guessArray.forEach((letter, index) => {
            if (letter !== wordArray[index] && remainingLetters.includes(letter)) {
                cells[index].classList.add('present');
                const letterIndex = remainingLetters.indexOf(letter);
                remainingLetters[letterIndex] = null;
            }
        });

        // Third pass: mark absent letters
        guessArray.forEach((letter, index) => {
            if (letter !== wordArray[index] && !remainingLetters.includes(letter)) {
                cells[index].classList.add('absent');
            }
        });
    }


    updateStats() {
        const attemptsElement = document.querySelector('.attempts');
        if (attemptsElement) {
            attemptsElement.textContent = `${this.currentRow}/6`;
        }
    }

    showWinMessage() {
        const resultElement = document.getElementById('wordleResult');
        if (resultElement) {
            resultElement.innerHTML = `
                <div class="win">
                    Correct
                </div>
            `;
            resultElement.classList.add('show', 'win');
        }
    }

    showLoseMessage() {
        const resultElement = document.getElementById('wordleResult');
        if (resultElement) {
            resultElement.innerHTML = `
                <div class="lose">
                    Wrong. The word was: ${this.word}
                </div>
            `;
            resultElement.classList.add('show', 'lose');
        }
    }
}

// Initialize function
function initializeWordle() {
    const placeholder = document.querySelector('.placeholder');
    if (placeholder) {
        new WordleGame();
    }
}

// Export for use
window.initializeWordle = initializeWordle;
