// >>>>>> Objects and variables declaration section >>>>>>

//Create a list that holds all of your cards
// this array should be the same during all the time of a single macth and change only when the player press the btn "restart"
let cardsArray = ['fa-anchor', 'fa-anchor', 'fa-bicycle', 'fa-bolt', 'fa-cube', 'fa-diamond', 'fa-diamond', 'fa-plane', 'fa-leaf', 'fa-bomb', 'fa-leaf', 'fa-bomb', 'fa-bolt', 'fa-bicycle', 'fa-plane', 'fa-cube'];


let lock = false;
let firstClick = null, secondClick = null;
let li1, li2;

//move(s) variables
let moves = 0;
let counter = document.getElementsByClassName('moves')

// star icon variable
const stars = document.getElementsByClassName('.fa-star')

// Time variables
let second = 0, minute = 0;
let time = document.getElementsByClassName('displayTime')
let interval;

const buttonRestart = document.getElementsByClassName('restart');

// <<<<<< End of objects and variables declaration section <<<<<<

// >>>>>> Function declaration section >>>>>>


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
function timer(time) {
    let minutes = 0;
    let seconds = 0;
    setInterval(function () {
        seconds = parseInt(seconds, 10) + 1;
        minutes = parseInt(minutes, 10);
        if (seconds >= 60) {
            minutes += 1;
            seconds = 0;
        }

        seconds = seconds < 10 ? "0" + seconds : seconds;
        minutes = minutes < 10 ? "0" + minutes : minutes;

        time.textContent = minutes + ":" + seconds;
    }, 1000);
}


function changeRating(starRating) {
    switch (starRating) {
        case 'gold':
            displayedStarRating.html('<li><i class="fa fa-star"></i></li>' +
                '<li><i class="fa fa-star"></i></li>' +
                '<li><i class="fa fa-star"></i></li>');
            displayedStarRating.csst('color', '#FAFAD2');
            starMult = 3;
            break;

        case 'silver':
            displayedStarRating.html('<li><i class="fa fa-star"></i></li>' +
                '<li><i class="fa fa-star"></i></li>' +
                '<li><i class="fa fa-star-o"></i></li>');
            displayedStarRating.css('color', '#DCDCDC');
            starMult = 2;
            break;

        case 'bronze':
            displayedStarRating.html('<li><i class="fa fa-star"></i></li>' +
                '<li><i class="fa fa-star-o"></i></li>' +
                '<li><i class="fa fa-star-o"></i></li>');
            displayedStarRating.css('color', '#CD7F32');
            starMult = 1;
            break;

        default:
            alert('Something went wrong in function changeRating(starRating)')
            break;
    }
}



function displaySymbol(el) {
    el.classList.add("rotate")
    el.classList.add("open");
    el.classList.add("show");
}


function closeUnmatchedCards() {
    let els = document.getElementsByClassName('unMatch');
    //console.log(els);
    Array.from(els).forEach(el => {
        el.classList.remove('unMatch');
        el.classList.remove('show');
        el.classList.remove('open');
    });
}

function  incrementMove() {
    moves +=1
    document.getElementsByClassName('.moves')
    moves.toString();
    if(moves <= 20&& moves != 0){
        changeRating()
    }
}





function restartClick() {
    firstClick = null;
    secondClick = null;
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
    //console.log(li);
    return li;
};


const pickACard = card => {

    card.addEventListener('click', function (e) {




        let li = e.currentTarget;
        // let prova = e.currentTarget.getElementsByClassName('fa')[0].className;
        // console.log(prova, "prova");
        // console.log(li, "current element");
        li.classList.remove('false');
        //console.log(li);
        //if the card is already open ignore it
        if (lock || li.classList.contains('open') && li.classList.contains('show')) {
            console.log("this card is already open");
            return true;
        }

        let icon = li.getElementsByClassName('fa')[0].className; //li.getElementsByClassName('fa')[0];
        // console.log(icon, 'ICON');



        if (firstClick === null && secondClick === null) {

            firstClick = icon;
            li1 = li;
            console.log("firstClick", firstClick, "li1", li1);

        } else if (firstClick !== null && secondClick === null) {

            secondClick = icon;
            li2 = li;
            console.log(secondClick, "secondClick");

            if (firstClick === secondClick) {
                li1.classList.add('match');
                li1.classList.add('true');
                li2.classList.add('match');
                li2.classList.add('true');


                console.log('Right Choice ');
            } else {
                console.log('Wrong Choice ');
                li1.classList.add('unMatch');
                li1.classList.add('false');
                li2.classList.add('unMatch');
                li2.classList.add('false');
                setTimeout(function () {
                    closeUnmatchedCards()
                }, 750)
            }
            restartClick();
        }


        displaySymbol(li);

        //let symbol = li.getElementsByClassName('fa')[0].className; // PROBLEMA ORANGE MATCH
        // console.log(symbol, 'symbol');
        // console.log(Array.from(symbol).join(''));
        // if(secondClick !== firstClick.getElementsByClassName('fa')[0].className) {
        //     secondClick =  e.currentTarget;
        //     console.log(secondClick, 'secondclick');
        //     console.log(secondClick, 'secondclick');
        // }
    })
};

// GERGO SECTION
//         if (match(previousCard, symbol)) {
//              console.log(previousCard, symbol);
//             li.classList.add('match')
//             markOtherCardAsMatched();
//         } else if {
//             // li.classList.add('unMatch')
//             if (previousCard === undefined) {
//                 console.log('carry on, its the first card!');
//             } else {
//                 lock = true;
//                 setTimeout(function () {
//                     // li.classList.add('false')
//                     closeUnmatchedCards();
//                     lock = false;
//                 }, 500)
//
//             }
//         }
//          previousCard = previousCard === undefined ? symbol : undefined;
//     })
// };


function restart() {
    // we store in a variable our "ul" element with inside the class "desk" and we store inside it our "li" element, created before.
    // list[0] because one the console appear as an object
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
    //console.log(cards, cards.length);
    for (let card of cards) {
        //console.log(card);
        /* card.addEventListener('click', function (e) {
            let li = e.currentTarget;
            displaySymbol(li);
        }) */
        pickACard(card);
    }

}

restart();


Array.from(buttonRestart).forEach(el => {
    el.addEventListener('click', function () {
        restart();
    })
});

function moveCounter() {
    moves++;
    counter.innerHTML = moves;
    //start timer on first move
    if(moves == 1){
        second = 0;
        minute = 0;
        timer();
    }



}


// function markOtherCardAsMatched() {
//     let unMatchCard = document.getElementsByClassName('unMatch');
//     Array.from(unMatchCard).forEach(el => {
//         el.classList.remove('unMatch');
//         el.classList.add('true');
//         el.classList.add('match');
//     });
// }


//  const match = (previousCard, currentCard) => previousCard == currentCard


/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */


/*Game rule
    * check if the card is open
    * open the first card
       * save the value
    * open the second one
    * check if they match
       * match : leave them open
       * they don't match : close them
            * remove show and open class
*/


/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */