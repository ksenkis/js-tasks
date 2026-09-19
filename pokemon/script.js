const input = document.querySelector("#nameInput");
const button = document.querySelector("#searchButton");
const nameElement = document.querySelector("#name");
const imageElement = document.querySelector("#image");
const weightElement = document.querySelector("#weight");
const heightElement = document.querySelector("#height");
const errorElement = document.querySelector("#error");

button.addEventListener("click", loadPockemon);

async function loadPockemon() {
  try {
    const promise = await fetch(
      `https://pokeapi.co/api/v2/pokemon/${input.value}`,
    );
    const json = await promise.json();

    errorElement.hidden = true;
    renderPokemon(json);
  } catch {
    pokemonCard.hidden = true;
    errorElement.hidden = false;
  }
}

function renderPokemon(pokemon) {
  nameElement.textContent = pokemon.name;
  weightElement.textContent = pokemon.weight;
  heightElement.textContent = pokemon.height;

  imageElement.src = pokemon.sprites.front_default;
  imageElement.alt = pokemon.name;

  pokemonCard.hidden = false;
}
