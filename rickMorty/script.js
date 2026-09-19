const input = document.querySelector("#nameInput");
const charactersElement = document.querySelector("#characters");
const prevButtonElement = document.querySelector("#prevButton");
const nextButtonElement = document.querySelector("#nextButton");
const pageElement = document.querySelector("#page");
const loaderElement = document.querySelector("#loader");
const infoElement = document.querySelector("#info");

const debouncedLoadCharacters = debounce(loadCharacters, 400);

input.addEventListener("input", debouncedLoadCharacters);
prevButtonElement.addEventListener("click", loadPrevCharacters);
nextButtonElement.addEventListener("click", loadNextCharacters);
charactersElement.addEventListener("click", (event) => showInfo(event));

let currentData = {};
let currentPage = 1;

function renderCharacters(characters) {
  charactersElement.innerHTML = "";

  characters.forEach((character) => {
    const card = document.createElement("div");
    card.className = "card";
    card.dataset.id = character.id;

    card.innerHTML = `
      <img src="${character.image}" alt="${character.name}">
      <p>${character.name}</p>
    `;

    charactersElement.append(card);
  });
}

async function loadCharacters() {
  loaderElement.hidden = false;
  infoElement.hidden = true;

  try {
    const response = await fetch(
      `https://rickandmortyapi.com/api/character/?name=${input.value}`,
    );

    if (response.status === 404) {
      charactersElement.innerHTML = "Нет результатов";
      infoElement.hidden = true;
      prevButtonElement.disabled = true;
      nextButtonElement.disabled = true;
      pageElement.textContent = "";
      return;
    }

    if (!response.ok) {
      charactersElement.innerHTML = `Ошибка: ${response.status}`;
      return;
    }

    const json = await response.json();

    currentData = json;

    renderCharacters(json.results);
    updatePaginationButtons();
    currentPage = 1;
    updatePage();
  } catch {
    charactersElement.innerHTML = "Ошибка загрузки данных";
  } finally {
    loaderElement.hidden = true;
  }
}

async function loadNextCharacters() {
  loaderElement.hidden = false;
  infoElement.hidden = true;

  try {
    if (currentData.info.next) {
      const response = await fetch(currentData.info.next);

      if (response.status === 404) {
        charactersElement.innerHTML = "Нет результатов";
        infoElement.hidden = true;
        prevButtonElement.disabled = true;
        nextButtonElement.disabled = true;
        pageElement.textContent = "";
        return;
      }

      if (!response.ok) {
        charactersElement.innerHTML = `Ошибка: ${response.status}`;
        return;
      }

      const json = await response.json();

      renderCharacters(json.results);
      currentData = json;
      updatePaginationButtons();
      currentPage += 1;
      updatePage();
    }
  } catch {
    charactersElement.innerHTML = "Ошибка загрузки данных";
  } finally {
    loaderElement.hidden = true;
  }
}

async function loadPrevCharacters() {
  loaderElement.hidden = false;
  infoElement.hidden = true;

  try {
    if (currentData.info.prev) {
      const response = await fetch(currentData.info.prev);

      if (response.status === 404) {
        charactersElement.innerHTML = "Нет результатов";
        infoElement.hidden = true;
        prevButtonElement.disabled = true;
        nextButtonElement.disabled = true;
        pageElement.textContent = "";
        return;
      }

      if (!response.ok) {
        charactersElement.innerHTML = `Ошибка: ${response.status}`;
        return;
      }

      const json = await response.json();

      renderCharacters(json.results);
      currentData = json;
      updatePaginationButtons();
      currentPage -= 1;
      updatePage();
    }
  } catch {
    charactersElement.innerHTML = "Ошибка загрузки данных";
  } finally {
    loaderElement.hidden = true;
  }
}

function updatePaginationButtons() {
  prevButtonElement.disabled = !currentData.info.prev;
  nextButtonElement.disabled = !currentData.info.next;
}

function updatePage() {
  pageElement.textContent = `Страница ${currentPage} из ${currentData.info.pages}`;
}

function showInfo(event) {
  const card = event.target.closest(".card");

  if (!card) {
    return;
  }

  infoElement.hidden = false;

  const characterId = Number(card.dataset.id);

  const characterInfo = currentData.results.find(
    (character) => character.id === characterId,
  );

  infoElement.textContent = JSON.stringify(characterInfo, null, 2);
}

function debounce(func, wait) {
  let timerId;

  return function (...args) {
    clearTimeout(timerId);

    timerId = setTimeout(() => func(...args), wait);
  };
}
