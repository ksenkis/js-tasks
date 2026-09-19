async function getPosts(n) {
  const response = await fetch("https://jsonplaceholder.typicode.com/posts");
  const json = await response.json();

  return json.slice(0, n);
}

async function getPostsWithComments(n) {
  const responsePosts = await fetch(
    "https://jsonplaceholder.typicode.com/posts",
  );
  const jsonPosts = await responsePosts.json();

  const responseComments = await fetch(
    "https://jsonplaceholder.typicode.com/comments",
  );
  const jsonComments = await responseComments.json();

  const result = jsonPosts.slice(0, n).map((post) => {
    const comments = jsonComments.filter(
      (comment) => comment.postId === post.id,
    );

    return { ...post, comments };
  });

  return result;
}

async function getFullPosts(n) {
  const responsePosts = await fetch(
    "https://jsonplaceholder.typicode.com/posts",
  );
  const jsonPosts = await responsePosts.json();

  const responseComments = await fetch(
    "https://jsonplaceholder.typicode.com/comments",
  );
  const jsonComments = await responseComments.json();

  const responseUsers = await fetch(
    "https://jsonplaceholder.typicode.com/users",
  );
  const jsonUsers = await responseUsers.json();

  const result = jsonPosts.slice(0, n).map((post) => {
    const comments = jsonComments.filter(
      (comment) => comment.postId === post.id,
    );
    const user = jsonUsers.find((user) => user.id === post.userId);

    return { ...post, comments, user };
  });

  return result;
}

async function getCharacters(filmTitle) {
  const response = await fetch(
    `https://swapi.dev/api/films/?search=${filmTitle}`,
  );
  const json = await response.json();
  const charactersUrls = json.results[0].characters.slice(0, 10);

  charactersUrls.forEach(async (characterUrl) => {
    const characterResponse = await fetch(characterUrl);
    const characterJson = await characterResponse.json();

    console.log(characterJson);
  });
}

async function getUniquePlanets(filmTitle) {
  const response = await fetch(
    `https://swapi.dev/api/films/?search=${filmTitle}`,
  );
  const json = await response.json();
  const charactersUrls = json.results[0].characters.slice(0, 10);

  const characters = charactersUrls.map(async (characterUrl) => {
    const response = await fetch(characterUrl);

    return await response.json();
  });

  const resolvedCharacters = await Promise.all(characters);

  const charactersWithPlanets = resolvedCharacters.map(async (character) => {
    const response = await fetch(character.homeworld);
    const json = await response.json();

    return { character, planet: json.name };
  });
  const resolvedCharactersWithPlanets = await Promise.all(
    charactersWithPlanets,
  );

  const uniquePlanetsWithCharacters = resolvedCharactersWithPlanets.reduce(
    (acc, { character, planet }) => {
      if (planet in acc) {
        acc[planet].push(character);
      } else {
        acc[planet] = [character];
      }
      return acc;
    },
    {},
  );

  console.log(uniquePlanetsWithCharacters);
}
