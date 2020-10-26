let blackJackGame = {
  you: {
    scoreSpan: "#your__result",
    div: "#your__box",
    score: 0,
  },
  dealer: {
    scoreSpan: "#dealer__result",
    div: "#dealer__box",
    score: 0,
  },
  cards: [
    {
      card: "2",
      value: 2,
    },
    {
      card: "3",
      value: 3,
    },
    {
      card: "4",
      value: 4,
    },
    {
      card: "5",
      value: 5,
    },
    {
      card: "6",
      value: 6,
    },
    {
      card: "7",
      value: 7,
    },
    {
      card: "8",
      value: 8,
    },
    {
      card: "9",
      value: 9,
    },
    {
      card: "10",
      value: 10,
    },
    {
      card: "K",
      value: 10,
    },
    {
      card: "J",
      value: 10,
    },
    {
      card: "Q",
      value: 10,
    },
    {
      card: "A",
      value: 11,
    },
  ],
  wins: 0,
  losses: 0,
  draws: 0,
  isStand: false,
  isOver: false,
};

const YOU = blackJackGame.you;
const DEALER = blackJackGame.dealer;
const hitSound = new Audio("./sounds/swish.m4a");
const winSound = new Audio("./sounds/cash.mp3");
const lossSound = new Audio("./sounds/aww.mp3");

document.querySelector("#hitBtn").addEventListener("click", blackJackHit);
document.querySelector("#dealBtn").addEventListener("click", blackJackDeal);
document.querySelector("#standBtn").addEventListener("click", blackJackStand);

function blackJackHit() {
  if (blackJackGame.isStand === false) {
    let card = randomCard();
    showCard(YOU, card);
    updateScore(card, YOU);
    showResult(YOU);
  }
}

function randomCard() {
  let randomIndex = Math.floor(Math.random() * 13);
  return blackJackGame.cards[randomIndex].card;
}

function showCard(activePlayer, card) {
  if (activePlayer.score <= 21) {
    let cardImage = document.createElement("img");
    cardImage.src = `./images/${card}.png`;
    document.querySelector(activePlayer.div).appendChild(cardImage);
    hitSound.play();
  }
}

function blackJackDeal() {
  if (blackJackGame.isOver === true) {
    blackJackGame.isStand = false;
    let yourImages = document.querySelector(YOU.div).querySelectorAll("img");
    let dealerImages = document
      .querySelector(DEALER.div)
      .querySelectorAll("img");

    //loop 1
    dealerImages.forEach((image) => image.remove());

    //loop 2
    for (const image of yourImages) {
      image.remove();
    }
    YOU.score = 0;
    DEALER.score = 0;
    document.querySelector(YOU.scoreSpan).textContent = "0";
    document.querySelector(YOU.scoreSpan).style.color = "white";
    document.querySelector(DEALER.scoreSpan).textContent = "0";
    document.querySelector(DEALER.scoreSpan).style.color = "white";
    document.getElementById("header__result").textContent = "Let's Play";
    document.getElementById("header__result").style.color = "black";

    blackJackGame.isOver = false;
  }
}

function updateScore(card, activePlayer) {
  if (card === "A" && activePlayer.score > 10) {
    for (const item of blackJackGame.cards) {
      if (card === item.card) {
        activePlayer.score += 1;
      }
    }
  } else {
    for (const item of blackJackGame.cards) {
      if (card === item.card) {
        activePlayer.score += item.value;
      }
    }
  }
}

function showResult(activePlayer) {
  if (activePlayer.score > 21) {
    document.querySelector(activePlayer.scoreSpan).textContent = "LOST!";
    document.querySelector(activePlayer.scoreSpan).style.color = "red";
  } else {
    document.querySelector(activePlayer.scoreSpan).textContent =
      activePlayer.score;
  }
}

function blackJackStand() {
  blackJackGame.isStand = true;
  let card = randomCard();
  showCard(DEALER, card);
  updateScore(card, DEALER);
  showResult(DEALER);
  if (DEALER.score > 16) {
    blackJackGame.isOver = true;
    showWinner(computeWinner());
  }
}

function computeWinner() {
  let winner;
  if (YOU.score <= 21) {
    if (YOU.score > DEALER.score || DEALER.score > 21) {
      winner = YOU;
      blackJackGame.wins++;
    } else if (YOU.score < DEALER.score) {
      blackJackGame.losses++;
      winner = DEALER;
    } else if (YOU.score === DEALER.score) {
      blackJackGame.draws++;
    }
  } else if (YOU.score > 21 && DEALER.score <= 21) {
    blackJackGame.losses++;
    winner = DEALER;
  } else if (YOU.score > 21 && DEALER.score > 21) {
    blackJackGame.draws++;
  }
  return winner;
}

function showWinner(winner) {
  let message, messageColor;
  if (blackJackGame.isOver === true) {
    if (winner === YOU) {
      document.getElementById("wins").textContent = blackJackGame.wins;
      message = "You WON!";
      messageColor = "green";
      winSound.play();
    } else if (winner === DEALER) {
      document.getElementById("losses").textContent = blackJackGame.losses;
      message = "You LOST!";
      messageColor = "red";
      lossSound.play();
    } else {
      document.getElementById("draws").textContent = blackJackGame.draws;
      message = "DRAW!";
      messageColor = "yellow";
    }
    document.getElementById("header__result").textContent = message;
    document.getElementById("header__result").style.color = messageColor;
  }
}
