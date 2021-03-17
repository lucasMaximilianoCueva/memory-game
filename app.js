const cards = document.querySelectorAll(".memory-card");

let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;

function flipCard() {
  if(lockBoard) return;
  if(this === firstCard) return;

  this.classList.add('flip');

  if (!hasFlippedCard) {
    hasFlippedCard = true;
    firstCard = this;

    return;
  }
  hasFlippedCard = false;
  secondCard = this;

  checkForMatch();
}
 
function checkForMatch() {
  let isMatch = firstCard.dataset.tool === secondCard.dataset.tool;
  isMatch ? disabledCards() : unflipCards();
}

function disabledCards() {
  firstCard.removeEventListener("click", flipCard);
  secondCard.removeEventListener("click", flipCard);
  const h1 = document.querySelector('.message');
  h1.classList.remove('animate__lightSpeedInRight')
  h1.classList.add('animate__flip');
  let message = 'Matched!!';
  h1.textContent = message;
  setTimeout(() => {
    h1.classList.remove('animate__flip');
    h1.classList.add('animate__lightSpeedInRight')
    let title = 'Memory Game';
    h1.textContent = title;
  }, 3000)
}

function unflipCards() {
  lockBoard = true;
  setTimeout(() => {
    firstCard.classList.remove("flip");
    secondCard.classList.remove("flip");
    lockBoard = false;
  }, 1500);
}

function resetBoard() {
  [hasFlippedCard, lockBoard] = [false, false];
  [firstCard, secondCard] = [null, null];
}

(function shuffle() {
  cards.forEach(card => {
    let randomPos = Math.floor(Math.random() * 12)
    card.style.order = randomPos;
  })
})();

cards.forEach((card) => card.addEventListener("click", flipCard));


