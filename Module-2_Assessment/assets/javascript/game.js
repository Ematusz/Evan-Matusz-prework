const Game = {
    wins: 0,
    guessesRemaining: 0,
    wordDictionary: ["LABRADOR RETRIEVER", "DOBERMAN PINSCHER", "GERMAN SHEPHERD"],
    imageDictionary: ["assets/images/labrador-retriever.jpg","assets/images/Doberman-Pinscher.jpeg","assets/images/German-Shepherd.jpeg"],
    barkDictionary: ["assets/sounds/labrador-barking-daniel_simon.mp3", "assets/sounds/doberman-pincher_daniel-simion.mp3", "assets/sounds/german-shephard-daniel_simon.mp3"],
    lettersGuessed: [],
    currentWordIndex: 0,
    displayedWord: [],
    successfulGuesses: 0,

    // accounts for the multiple word answers
    initializeWord: function() {
        let currentImagePath = this.imageDictionary[this.currentWordIndex];
        let image = document.querySelector("#clueImage");
        image.src = currentImagePath;

        let currentWord = this.wordDictionary[this.currentWordIndex];
        this.guessesRemaining = currentWord.length+4;
        let numberOfGuessesRemaining = document.querySelector("#numberOfGuessesRemaining");
        numberOfGuessesRemaining.innerText = this.guessesRemaining;
        
        this.lettersGuessed = [];
        let lettersGuessed_ = document.querySelector("#lettersGuessed");
        lettersGuessed_.innerText = this.lettersGuessed.join(",");

        this.displayedWord = [];
        this.successfulGuesses = 0;
        if(currentWord.includes(" ")) {
            this.successfulGuesses = 1;
        }
        for(i = 0; i < currentWord.length; ++i) {
            if(currentWord[i] === " ") {
                this.displayedWord.push(" ");
            } else {
                this.displayedWord.push(" _ ");
            }
        }
        let displayedWord_ = document.querySelector("#displayedWord");
        displayedWord_.innerText = this.displayedWord.join("");
        console.log(this.displayedWord.join(""));
    },

    // increments the current word down the list
    updateCurrentWord: function() {
        let newWord = this.currentWordIndex+1;
        if (!(newWord < this.wordDictionary.length)) {
            newWord = 0;
        }
        this.currentWordIndex = newWord;
    },

    // handles the keydown event
    keyReporter: function(event) {
        let currentWord = this.wordDictionary[this.currentWordIndex];
        if (event.isComposing || event.keyCode === 229) {
            return;
        }
        if (event.keyCode < 91 && event.keyCode > 64) {
            let letterGuessed = String.fromCharCode(event.keyCode)
            console.log(letterGuessed);
            if (!this.lettersGuessed.includes(letterGuessed)) {
                this.lettersGuessed.push(letterGuessed);
                let lettersGuessed_ = document.querySelector("#lettersGuessed");
                lettersGuessed_.innerText = this.lettersGuessed.join(",");
                this.guessesRemaining--;
                let numberOfGuessesRemaining = document.querySelector("#numberOfGuessesRemaining");
                numberOfGuessesRemaining.innerText = this.guessesRemaining;
                for(i = 0; i < currentWord.length; ++i) {
                    if(currentWord[i] === letterGuessed) {
                        this.displayedWord[i] = letterGuessed;
                        this.successfulGuesses++;
                        console.log(this.successfulGuesses)
                        if(this.successfulGuesses === currentWord.length) {
                            this.gameOver("win");
                            return;
                        }
                    }
                }
                if (this.guessesRemaining === 0) {
                    this.gameOver("lose");
                    return;
                }
                let displayedWord_ = document.querySelector("#displayedWord");
                displayedWord_.innerText = this.displayedWord.join("");
                console.log("displayed word",this.displayedWord.join(""));
            }
        }

    },

    gameOver: function(result) {
        console.log("game over");
        let dogBark_ = document.querySelector("#dogBark");
        dogBark_.src = this.barkDictionary[this.currentWordIndex];
        dogBark_.play();
        if(result === "win") {
            ++this.wins;
            let numberOfWins = document.querySelector("#numberOfWins");
            numberOfWins.innerText = this.wins;
        }
        this.updateCurrentWord();
        this.initializeWord();

    }
}
Game.initializeWord();
document.addEventListener('keydown',function () {
    Game.keyReporter(event)
});
