function analyzeBookSales(booksArray) {
  return booksArray.reduce((sum, item) => sum + item.price, 0)
};

function analyzeBookSalesCategory(booksArray) {
  let categoryAmount = [];

  booksArray.forEach((book) => {
    const record = categoryAmount.find((item) => item.category === book.category);

    if (record) {record.count++} else {
      categoryAmount.push({category: book.category, count: 1});
    };
  });

  return categoryAmount;
};

function analyzeBookSalesMostExpensive(booksArray) {
  let mostExpensive = {
    title: "",
    price: 0
  };

  booksArray.forEach(({title, price}) => {
    if (price > mostExpensive.price) mostExpensive = {title, price};
  });

  return mostExpensive;
};

function adults(people){
  return people.filter(({age}) => age >= 18);
};

function filterByLength(arr){
  return arr.filter((item) => item.length >= 2);
};

function dateToString(arr){
  return arr.map((date) => date.toLocaleDateString("ru-RU"));
};

function arrayToString(arr){
  return arr.map((item) => item.join(','));
};

function adultsUpperCase(people){
  return people.filter(({age}) => age >= 18).map(({name}) => name.toUpperCase());
};

function groupSumBy(items, groupKey, valueKey){
  let result = {};

  items.forEach((item) => {
  const key = item[groupKey];

    if (result[key]){
      result[key] += item[valueKey];
    } else {
      result[key] = item[valueKey];
    };
  });

  return result;
};

function analyzeStudents(students){
  const filteredStudents = students.filter(({grades}) => grades.reduce((sum, grade) => sum + grade)/grades.length >= 4);

  return filteredStudents.map((student) => student.name);
};

function tagsCount(posts){
  const result = {};
  const tags = posts.reduce((acc, post) => [...acc, ...post.tags], []);

  tags.forEach((tag) => {
    if (result[tag]){
      result[tag] += 1;
    } else {
      result[tag] = 1;
    };
  });

  return result;
};

function analyzeMovies(movies){
  const bestMovies = movies.filter(({rating}) => rating >= 8);
  const sortedMovies = bestMovies.sort((a, b) => b.year - a.year);

  return sortedMovies.map((item) => item.title);
};

function admins(users) {
  return users.filter(({role}) => role === 'admin').map(({email}) => email);
};

function groupById(arr){
  return arr.reduce((acc, item) => {return {...acc, [item.id]: item}}, {});
};

function analyzeProducts(products) {
  const resultProducts = products.filter(({active}) => active).sort((a, b) => b.price - a.price);

  return resultProducts.slice(0, 3).map(({title}) => title);
};

function analyzeReviews(texts, n) {
  const longReviews = texts.filter(({text}) => text.length >= n);

  return longReviews.reduce((acc, item) => acc + item.rating, 0)/longReviews.length.toFixed(2);
};

function routeTotals(routes, minSegments){
  const moreSegments = routes.filter(({segments}) => segments.length >= minSegments);

  return moreSegments.map(({id, segments}) => {
    return {id, total: segments.reduce((acc, item) => acc + item.distance, 0)}
    });
};

function allLowStockAreExpensive(inventory, lowStockThreshold, minPrice) {
  const lowStock = inventory.filter(({stock}) => stock < lowStockThreshold);

  return lowStock.every(({price}) => price > minPrice);
};

function balanceByType(tx, typeKey, amountKey) {
  const result = {};

  tx.forEach((item) => {
    const key = item[typeKey];

    if (key in result) {
      result[key] += item[amountKey];
    } else {
      result[key] = item[amountKey];
    };
  });

  const total = ('income' in result && 'expense' in result) ? result.income - result.expense : null;

  return {...result, total };
};
