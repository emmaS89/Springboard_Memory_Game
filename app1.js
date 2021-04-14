// DOM
const btnTest = document.querySelector('.btn-test')
const timer = document.querySelector('.timer');
const flip =document.querySelector('.moves');
const cards = document.querySelectorAll('.card');

let firstCard;
let secondCard;

let isFlippedCard = false;
let isLockBoard = false;

let pairs = 0;
let moves = 0;
let seconds = 0;
let minutes = 0;



// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
cards.forEach((card) => {
    card.addEventListener('click', flipCard)
    shuffleCards(cards);


})

// Fisher-Yates Shuffle Algorithm.
function shuffleCards(cards) { 
    for (let i = cards.length - 1; i > 0; i--) {
        let randIndex = Math.floor(Math.random() * (i + 1));
        cards[randIndex].style.order = i;
        cards[i].style.order = randIndex;
    }
}


function flipCard() {
    if(isLockBoard) return;
    // If this is equal to our card don't do anything. (Cannot click same card again!!!)
    if(this === firstCard) return;
    this.classList.add('flip');
    flipCount();


    if(!isFlippedCard) {
        firstCard = this;
        isFlippedCard =true;
        return;
    } else {
        secondCard = this;
        // Cannot flip other cards before checkForMatch
        isLockBoard = true;
        checkForMatch();
    }
}


function checkForMatch() {
    let isCardMatched = firstCard.classList[1] === secondCard.classList[1];
    isCardMatched ? cardMatched() : cardNotMatched();

}

function cardMatched() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);

    pairs++;
    if(pairs === cards.length / 2) endGame();
    // We have to resetBoard
    resetBoard();
}

function cardNotMatched() {
    setTimeout(() => {
        // After remove class from both card, we cannot flip card again,because our game is still locked.
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');

        // We have to resetBoard
        resetBoard();
    },800)

}

function resetBoard(){
    [isFlippedCard, isLockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
}

function endGame() {
    setTimeout(() => {
        stopTimer();
        alert(`You did it in ${moves} moves!` )
        cards.forEach((card) =>{
            card.classList.remove('flip');
            flip.innerHTML = `Moves: 0`;
            timer.innerHTML = `Time: 00:00`;

        })
        shuffleCards(cards)
        
    },300)
}

function flipCount() {
    moves++;
    flip.innerHTML = moves;
    if(moves === 1) {
        startTimer();
    }
}

// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

function startTimer() {
    timer.innerHTML = `${minutes} mins ${seconds} secs`;
    interval = setInterval(() => {
      seconds++;
      timer.innerHTML = `${minutes} mins ${seconds} secs`;
      if (seconds === 60) {
        minutes++;
        seconds = 0;
      }
    }, 1000);
  }


function stopTimer() {
    clearInterval(interval);
}
