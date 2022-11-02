//VARIABLES DEFAULT OFF OR NOT ALIVE
// PLAYER VARS
let cards = [];
let sum = 0;
let hasBlackJack = false;
let isAlive = false;

let mess = "";
let messageEl = document.getElementsByClassName("message-el");
let sumEl = document.querySelector(".sum-el");
let yourCards = document.querySelector(".cards");
let open = document.getElementById("open");
let close = document.getElementById("close");
let input = document.getElementById("input");

//DEALER VARS
let dealerCards = document.querySelector(".cards1");
let dealerAlive = false;
let dealerCardsArray = [];
let dealerSum = 0;
let messageEl1 = document.getElementsByClassName("message-el1");
let sumEl1 = document.querySelector(".sum-el1");
let dealerMess = "";
let DealerHasBlackJack = false;
let foldcheck = false;

//RANDOM CARD FOR THE GAME
function getRandomCard() {
  let randomNumber = Math.floor(Math.random() * 13) + 1; // od 1.0 do 13.0
  if (randomNumber === 1) {
    return 11;
  } else if (randomNumber > 10) {
    return 10;
  } else {
    return randomNumber;
  }
}

//TWO RANDOM CARDS FOR THE START AFTER CLICK
function startGame() {
  newCardButton.classList.remove("hidden");
  //player
  isAlive = true;
  let firstCard = getRandomCard();
  let secondCard = getRandomCard();
  cards = [firstCard, secondCard];
  //
  sum = firstCard + secondCard;
  //dealer
  dealerAlive = true;
  let dealerFirstCard = getRandomCard();
  dealerCardsArray = [dealerFirstCard];
  dealerSum = dealerFirstCard + " X";
  renderGame();
}

//
//
//
//
//COMUNICATION
function renderGame() {
  yourCards.textContent = "Cards: ";
  for (let i = 0; i < cards.length; i++) {
    yourCards.textContent += cards[i] + " ";
  }

  if (sum <= 20) {
    mess = "Draw another or fold";
  } else if (sum === 21) {
    mess = "Dealer says : - You've got a blackjack! 😍";
    hasBlackJack = true;
  } else {
    mess = "Dealer wins 🟢";
    isAlive = false;
  }
  messageEl[0].textContent = mess;
  sumEl.textContent = "Sum: " + sum;
  //
  //
  //dealer messenge

  dealermessenge();

  checkPot();
}
function dealermessenge() {
  dealerCards.textContent = "Cards: ";
  for (let i = 0; i < dealerCardsArray.length; i++) {
    dealerCards.textContent += dealerCardsArray[i] + " ";
  }

  if (dealerSum < sum) {
    dealerMess = "You have better cards 🟢 ";
    mess = "You won!";

    DealerHasBlackJack = false;
    dealerAlive = true;
  } else if (dealerSum > sum && dealerSum < 22) {
    dealerMess = "Dealer wins 🟢";
    mess = "You lost!";

    DealerHasBlackJack = true;
    dealerAlive = true;
  } else {
    dealerMess = "Game in progress...";
    dealerAlive = false;
    DealerHasBlackJack = false;
  }

  messageEl1[0].textContent = dealerMess;
  sumEl1.textContent = "Sum: " + dealerSum;

  //
  //
  //
  //
  //...............nie dziala display gracza po przegranej
  //
  //

  //
  //
}

//
//
//
//
//NEW CARD ONCLICK - WITH 2 CONDITIONS
function newCard() {
  if (hasBlackJack === false && isAlive === true) {
    let newCard = getRandomCard();
    sum += newCard;
    cards.push(newCard);
    renderGame();
  } else {
    return;
  }
}
// FOLD FUNCTION
function fold() {
  foldcheck = true;
  newCardButton.classList.add("hidden");
  if (isAlive === true) {
    let newDealerCard = getRandomCard();
    dealerSum += newDealerCard;
    dealerCardsArray.push(newDealerCard);
    removeX();
    moreNumber();
  }
}

function removeX() {
  dealerSum = dealerCardsArray.reduce((accumulator, value) => {
    return accumulator + value;
  }, 0);
}

//
//
// function for full fold
function moreNumber() {
  if (dealerSum < 21) {
    let newDealerCard2 = getRandomCard();
    dealerSum += newDealerCard2;
    dealerCardsArray.push(newDealerCard2);
  } else {
    return;
  }
  renderGame();
}

//CREDITS

player = {
  // INPUT OFF SO FUNCTION ON
  Name: "Kosma ",
  Chips: 145,
  // INPUT OFF SO FUNCTION ON
  Updated: true,
};

let chips = document.querySelector(".chips"); // element

chips.textContent = player.Name + "$" + player.Chips; //player.Name - // INPUT OFF SO FUNCTION ON

const winValue = 10;

// adding winning
function checkPot() {
  if (hasBlackJack === true) {
    chips.textContent = player.Name + "$" + (player.Chips + winValue);
    // INPUT OFF SO FUNCTION ON
    player.Chips = Number(player.Chips) + 10;
  }
}

open.addEventListener("click", () => {
  modal_container.classList.add("show");
});

close.addEventListener("click", () => {
  modal_container.classList.remove("show");
});

//UPDATES
// 1. DEALER DESKTOP - DONE
// 2. USERNAME INPUT AND BUTTON - DONE
// 3. BETTING SYSTEM
// 4. WYGRANA - PRZEGRANA - DRAW CO DALEJ?

/// mozliwosci
/// 1. GRACZ WYGRYWA
/// 2. SI WYGRYWA
/// 3. GRACZ WCHODZI - DWIE 11 - LOSS
