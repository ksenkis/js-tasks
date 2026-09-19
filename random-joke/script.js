const setupElement = document.querySelector("#setup");
const punchlineElement = document.querySelector("#punchline");

const prevButton = document.querySelector("#prev");
const nextButton = document.querySelector("#next");
const counterElement = document.querySelector("#counter");

const jokes = [];
let currentIndex = 0;

nextButton.addEventListener("click", loadNextJoke);
prevButton.addEventListener("click", loadPreviousJoke);

async function loadJoke() {
  const response = await fetch(
    "https://official-joke-api.appspot.com/jokes/random",
  );

  if (!response.ok) {
    return;
  }

  const json = await response.json();

  jokes.push(json);
  currentIndex = jokes.length - 1;

  renderJoke();
}

function renderJoke() {
  const joke = jokes[currentIndex];

  setupElement.textContent = joke.setup;
  punchlineElement.textContent = joke.punchline;

  updateCounter();
}

function updateCounter() {
  counterElement.textContent = `Шутка ${currentIndex + 1} из ${jokes.length}`;
}

function loadPreviousJoke() {
  if (currentIndex > 0) {
    currentIndex--;
    renderJoke();
  }
}

async function loadNextJoke() {
  if (currentIndex < jokes.length - 1) {
    currentIndex++;
    renderJoke();
  } else {
    await loadJoke();
  }
}

loadJoke();
