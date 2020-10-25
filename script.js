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
};

const YOU = blackJackGame.you;
const DEALER = blackJackGame.dealer;
const hitSound = new Audio("./sounds/swish.m4a");

document.querySelector("#hitBtn").addEventListener("click", blackJackHit);
document.querySelector("#dealBtn").addEventListener("click", blackJackDeal);

function blackJackHit() {
  let card = randomCard();
  showCard(YOU, card);
  updateScore(card, YOU);
  showResult(YOU);
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
  let yourImages = document.querySelector(YOU.div).querySelectorAll("img");
  let dealerImages = document.querySelector(DEALER.div).querySelectorAll("img");

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
