const container = document.querySelector(".container");
const form = document.querySelector("form");
const msg = document.querySelector(".message");
const resetCards = document.querySelector(".reset");
const nbCardsInput = document.querySelector(".nbCards");

let numCards = false;
let flippedCards = [];

//Fonctions pour choisr le nombre de cartes
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

//Fonction pour générer les cartes celon le nombre choisi
function generatorCards() {
  const selectedCards = parseInt(nbCardsInput.value, 10);
  container.innerHTML = "";
  if (numCards === true) {
    const positions = [];
    for (let i = 0; i < selectedCards; i++) {
      const position = randomPosition();
      positions.push(position);
    }
    positions.sort(() => Math.random() - 0.5);

    for (let i = 0; i < selectedCards / 2; i++) {
      const color = randomColor();
      const id = randomId();
      const position1 = positions[i];
      const position2 = positions[i + selectedCards / 2];

      container.innerHTML += `
        <div class="card" style="order: ${position1};">
          <div class="card_inner">
            <div class="card_face card_face-front">
              <h2>❔</h2>
            </div>
            <div class="card_face card_face-back" id="${id}" style="background-color: ${color}">
            </div>
          </div>
        </div>
        <div class="card" style="order: ${position2};">
          <div class="card_inner">
            <div class="card_face card_face-front">
            <h2>❔</h2>
            </div>
            <div class="card_face card_face-back" id="${id}" style="background-color: ${color}">
            </div>
          </div>
        </div>
      `;
    }
  }
}

//Fonction pour reset le jeu
function reset() {
  container.innerHTML = "";
  flippedCards = [];
  msg.innerHTML =
    "<h3>Veuillez choisir le nombre de cartes pour votre partie</h3>";
}

//Fonction pour retourner les cartes

function flipCard() {
  if (flippedCards.length < 2) {
    this.classList.toggle("is-flipped");
    flippedCards.push(this);
    if (flippedCards.length === 2) {
      checkMatch();
    }
  }
}

//Fonction pour générer une couleur aléatoire
function randomColor() {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i += 1) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

//Fonction pour générer une position aléatoire
function randomPosition() {
  const position = Math.floor(Math.random() * 100);
  return position;
}

//Fonction generation id aléatoire
function randomId() {
  const id = Math.floor(Math.random() * 100);
  return id;
}

//Fonction pour vérifier si les cartes sont identiques
function checkMatch() {
  const card1 = flippedCards[0];
  const card2 = flippedCards[1];
  const id1 = card1.querySelector(".card_face-back").id;
  const id2 = card2.querySelector(".card_face-back").id;

  const isMatch = id1 === id2;
  if (isMatch) {
    card1.removeEventListener("click", flipCard);
    card2.removeEventListener("click", flipCard);
    flippedCards = [];
    msg.innerHTML = "<h3>Bravo vous avez trouvé une paire</h3>";
  } else {
    setTimeout(() => {
      card1.classList.remove("is-flipped");
      card2.classList.remove("is-flipped");
      flippedCards = [];
      msg.innerHTML = "<h3>Dommage, ce n'est pas une paire</h3>";
    }, 1500);
  }
}

//Evenements
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
