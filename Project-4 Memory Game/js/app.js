// >>>>>> Objects and variables declaration section >>>>>>

//Create a list that holds all of your cards
// this array should be the same during all the time of a single macth and change only when the player press the btn "restart"
let cardsArray = ['fa-anchor', 'fa-anchor', 'fa-bicycle', 'fa-bolt', 'fa-cube', 'fa-diamond', 'fa-diamond', 'fa-plane', 'fa-leaf', 'fa-bomb', 'fa-leaf', 'fa-bomb', 'fa-bolt', 'fa-bicycle', 'fa-plane', 'fa-cube'];

let lock = false;
let firstClick = null, secondClick = null;
let li1 = null, li2 = null; //element of firstClick and secondClick
let score = document.querySelector('#fin-score');
//move(s) variables
let moves = 0;
let lastMoves = document.querySelector('#fin-moves');
let lastTime = document.querySelector('#fin-time');
let counter = document.querySelector('.moves');
let machedCard = 0;

// star icon variable
const allStars = document.querySelectorAll('.fa-star');
console.log(allStars, "STAR");

// Time variables
let time = document.querySelector('.displayTime');
let startGame = 0;
let gameInterval;

let modal = document.querySelector('.pop-up')

const buttonRestart = document.getElementsByClassName('restart');

// <<<<<< End of objects and variables declaration section <<<<<<

// >>>>>> Functions declaration section >>>>>>


// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    let currentIndex = array.length,
        temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}


//Timer inspired by https://stackoverflow.com/questions/20618355/the-simplest-possible-javascript-countdown-timer
function timer() {
    let minutes = 0;
    let seconds = 0;
    gameInterval = setInterval(function () {
        seconds = parseInt(seconds, 10) + 1;
        minutes = parseInt(minutes, 10);
        if (seconds >= 60) {
            minutes += 1;
            seconds = 0;
        }

        seconds = seconds < 10 ? "0" + seconds : seconds;
        minutes = minutes < 10 ? "0" + minutes : minutes;

        time.innerHTML = minutes + ":" + seconds;
        lastTime.textContent = time.textContent;
        // console.log(time,"hellooooo are you there????");
    }, 1000);
}

function endOfGame() {
    clearInterval(gameInterval);
}


function displaySymbol(el) {
    el.classList.add("open");
    el.classList.add("show");
}


function closeUnmatchedCards() {
    let els = document.getElementsByClassName('unMatch');
    Array.from(els).forEach(el => {
        el.classList.remove('unMatch');
        el.classList.remove('show');
        el.classList.remove('open');
    });
}


function restartClick() {
    firstClick = null;
    secondClick = null;
}

function changeRating() {
    // console.log(moves, "where are youuuuuuuuuuuuuuu???")
    if (moves === 10) {
        document.querySelector('.cup-gold').classList.remove('hide');
        return true;
    } else if (moves === 16) {
        allStars[0].classList.add('hide')
        allStars[3].classList.add('hide');
        document.querySelector('.cup-silver').classList.remove('hide');
        document.querySelector('.cup-gold').classList.add('hide');
    } else if (moves === 20) {
        allStars[1].classList.add('hide');
        allStars[4].classList.add('hide');
        document.querySelector('.cup-bronze').classList.remove('hide');
        document.querySelector('.cup-silver').classList.add('hide');

    }
    // console.log(allStars, "are you my stars??!");
}


function moveCounter() {
    moves++;
    counter.innerHTML = moves;
    lastMoves.innerHTML = moves;
// setting rates based on moves
    if (moves <= 20 && moves !== 0) {
        changeRating()
    }
}


function restarValue() {
    // show again stars
    for (let i = 0; i < 3; i++) {
        allStars[i].classList.remove('hide');
    }
    //show again cups
    for (let i = 0; i < 3; i++) {
        allStars[i].classList.remove('hide');
    }

    // empty matched cards variables
    machedCard = 0;
    startGame = 0;
    moves = 0;
    counter.textContent = 0;
    li1 = null;
    li2 = null;
    // hide the modal
    modal.classList.remove('showed');
    modal.classList.add('hide');
}

//****Game logic****


// newCard function
const newCard = cardClass => {
    // we create a new li element with a class "card"
    let li = document.createElement("li");
    li.classList.add("card");
    // we create a "i" element called icon and we applied to it a "fa" class, then we applied a class form the array of cards
    let icon = document.createElement("i");
    li.appendChild(icon);
    icon.classList.add("fa");
    icon.classList.add(cardClass);
    return li;
};


const pickACard = card => {

    card.addEventListener('click', function (e) {
        // we start the time at the first click
        if (startGame === 0) {
            timer();
            startGame++;
        }

        let li = e.currentTarget;
        //if the card is already open ignore it
        if (lock || li.classList.contains('open') && li.classList.contains('show')) {
            // console.log("this card is already open");
            return true;
        }

        let icon = li.getElementsByClassName('fa')[0].className;

        if (firstClick === null && secondClick === null) {

            firstClick = icon;
            li1 = li; // element of firstClick
            // console.log("firstClick", firstClick);

        } else if (firstClick !== null && secondClick === null) {
            secondClick = icon;
            li2 = li; // element secondClick
            // console.log(secondClick, "secondClick");

            if (firstClick === secondClick) {
                li1.classList.add('match');
                li1.classList.add('true');
                li2.classList.add('match');
                li2.classList.add('true');
                score.textContent += 5;
                machedCard++;
                if (machedCard === 8) {
                    endOfGame()
                    modal.classList.remove('hide')
                    modal.classList.add('showed')
                }

                // console.log('Right Choice ');
            } else {
                // console.log('Wrong Choice ');
                li1.classList.add('unMatch');
                li2.classList.add('unMatch');
                score.textContent -= 1;
                setTimeout(function () {
                    closeUnmatchedCards()
                }, 750)
            }
            moveCounter();
            restartClick();
        }
        displaySymbol(li);
    })
};


function gameStart() {
    // we store in a variable our "ul" element with inside the class "desk" and we store inside it our "li" element, created before.
    // list[0] because one the console appear as an object
    // we restart the variables
    // Show again the stars
    restarValue();
    // we restart the click
    restartClick();
    // // we stop the time
    endOfGame();
    //  we clear the time string
    time.innerHTML = '00:00';
    // we grab all the cards
    let list = document.getElementsByClassName("deck");

    // we empty the current board of cards
    list[0].innerHTML = '';

    // We first shuffle the array of cards
    let cardsShuffled = shuffle(cardsArray);

    for (let card of cardsShuffled) {
        let li = newCard(card);
        list[0].appendChild(li);
    }

    let cards = list[0].getElementsByClassName("card") // it's an html collection
    for (let card of cards) {

        pickACard(card);
    }

}

gameStart();


Array.from(buttonRestart).forEach(el => {
    el.addEventListener('click', function () {
        gameStart()
    })
});

