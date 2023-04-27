const container = document.querySelector(".container");
const form = document.querySelector("form");
const msg = document.querySelector(".message");
const resetCards = document.querySelector(".reset");
const nbCardsInput = document.querySelector(".nbCards");
let numCards = false;
let flippedCards = [];

function nbcards() {
  const selectedCards = parseInt(nbCardsInput.value, 10);
  if (selectedCards % 2 === 0) {
    msg.innerHTML = `<h3>Vous avez choisi ${selectedCards} cartes</h3>`;
    numCards = true;
  } else {
    msg.innerHTML = `<h3>Vous devez choisir un nombre paire</h3>`;
    container.innerHTML = "";
    numCards = false;
  }
}

function generatorCards() {
  const selectedCards = parseInt(nbCardsInput.value, 10);
  container.innerHTML = "";
  if (numCards === true) {
    for (let i = 0; i < selectedCards; i++) {
      container.innerHTML += `
        <div class="card">
          <div class="card_inner">
            <div class="card_face card_face-front">
              <h2>Card Front</h2>
            </div>
            <div class="card_face card_face-back">
              <h2>Card Back 1</h2>
            </div>
          </div>
        </div>
      `;
    }
  }
}

function reset() {
  container.innerHTML = "";
  flippedCards = [];
  msg.innerHTML =
    "<h3>Veuillez choisir le nombre de cartes pour votre partie</h3>";
}

function flipCard() {
  if (flippedCards.length < 2) {
    this.classList.toggle("is-flipped");
    flippedCards.push(this);
    if (flippedCards.length === 2) {
      checkMatch();
    }
  }
}

function checkMatch() {
  const card1 = flippedCards[0];
  const card2 = flippedCards[1];
  const isMatch = card1.innerHTML === card2.innerHTML;
  if (isMatch) {
    flippedCards = [];
  } else {
    setTimeout(() => {
      card1.classList.remove("is-flipped");
      card2.classList.remove("is-flipped");
      flippedCards = [];
    }, 1000);
  }
}

container.addEventListener("click", (event) => {
  const clickedCard = event.target.closest(".card_inner");
  if (clickedCard) {
    flipCard.call(clickedCard);
  }
});

form.addEventListener("submit", (e) => {
  e.preventDefault();
  nbcards();
  generatorCards();
  nbCardsInput.value = "";
});

resetCards.addEventListener("click", reset);
