function delayedAdd(a, b, delay, callback) {
  setTimeout(() => callback(null, a + b), delay);
}

function readConfig(path, callback) {
  setTimeout(() => {
    if (typeof path === "string") {
      callback(null, { path });
    } else {
      callback(new Error("Path must be a string"));
    }
  }, 50);
}

function addAsync(a, b, delay = 50) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(a + b);
    }, delay);
  });
}

function wait(delay) {
  return new Promise((resolve) => {
    setTimeout(resolve, delay);
  });
}

// First post's comments
getUser()
  .then((user) => getPosts(user.id))
  .then((posts) => getFirstPostComments(posts[0].id))
  .then((comments) => console.log(comments));

function allSettled(promises) {
  return Promise.all(
    promises.map((promise) => {
      return Promise.resolve(promise)
        .then((res) => ({ status: "fulfiled", value: res }))
        .catch((err) => ({ status: "rejected", reason: err }));
    }),
  );
}
