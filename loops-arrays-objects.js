function countEvenOdd(arr) {
  let even = 0;
  let odd = 0;
  
  for (let i = 0; i < arr.length; i++){
    arr[i] % 2 === 0 ? even++ : odd++;
  }
  
  return {even, odd}
};

function minMax(arr){
  let min = null;
  let max = null;
  
  if (arr.length !== 0){
    for (let num of arr){
      if (num < min) min = num;
      if (num > max) max = num;
    };
  };
  
  return {min, max};
};

function wordFreq(arr){
  const words = {};
  
  for (let word of arr){
    if (word in words){
      words[word]++;
    } else {
      words[word] = 1;
    }
  };
  
  return words;
};

function filterRange(arr, min, max){
  let range = [];
  
  for (let num of arr){
    if (num >= min && num <=max) range.push(num);
  };
  
  return range;
};

function sumByKey(arr, key){
  let sum = 0;
  
  for (let obj of arr){
    console.log(obj)
    if (obj[key] && Number.isFinite(obj[key])) sum += obj[key];
  };
  
  return sum;
};

function manualReverse(arr) {
  const len = arr.length;
  const reversed = [];
  
  for (let i = 0; i < len; i++){
    reversed[i] = arr[len - 1 - i];
  }
  
  return reversed;
};

function findByCriteria(arr, criteria){
  itemsLoop: for (let item of arr){
    for (let key in criteria){
      if (item[key] !== criteria[key]){
        continue itemsLoop;
      };
    };
    return item;
  };
  
  return null;
};

function groupBy(arr, key){
  const grouped = {};
  
  for (let obj of arr){
    const keyValue = obj[key]; 
    
    if (keyValue in grouped) {
      grouped[keyValue].push(obj)
    } else {
      grouped[keyValue] = [obj]
    }
  };
  
  return grouped;
};

function isPalindrome(arr){
  const lastIdx = arr.length - 1;
  
  for (let i = 0; i < lastIdx / 2; i++){
    if (arr[i] !== arr[lastIdx - i]) return false;
  };
  
  return true;
};

function compactObject(obj) {
  const newObj = {};
  
  for (let [key, value] of Object.entries(obj)){
    if (value !== null && value !== undefined && value !== ''){
      newObj[key] = value;
    };
  };
  
  return newObj;
};

function intersection(arr1, arr2){
  const newArr = [];

  for (let i = 0; i < arr1.length; i++){
    for (let j = 0; j < arr2.length; j++){
      if (arr1[i] === arr2[j] && !(newArr.includes(arr1[i]))){
        newArr.push(arr1[i]);
      };
    };
  };

  return newArr;
};

function letterFrequency(arr){
  const obj = {};

  for (let string of arr){
    for (let char of string){
      const lowerChar = char.toLowerCase();

      if (lowerChar in obj){
        obj[lowerChar]++;
      } else {
        obj[lowerChar] = 1;
      };
    };
  };

  return obj;
};

function sumMatchingKeys(obj1, obj2){
  const sumObj = {...obj1};

    for (let key in obj2){
      if (key in sumObj){
        sumObj[key] += obj2[key];
      } else {
        sumObj[key] = obj2[key];
      };
    };

  return sumObj;
};

function removeAll(arr, value){
  const newArr = [];

  for (let item of arr){
    if (item !== value) newArr.push(item);
  };

  return newArr;
};

function chunkArray(arr, size){
  if (arr.length === 0) return [];
  
  const newArr = [[]];
  let newArrIdx = 0;

  for (let i = 0; i < arr.length; i++){
    if (newArr[newArrIdx].length < size){
      newArr[newArrIdx].push(arr[i]);
    } else {
      newArr[++newArrIdx] = [arr[i]];
      };
  };

  return newArr;
};

function invertObject(obj) {
  const newObj = {};

  for (let [key, value] of Object.entries(obj)){
    newObj[value] = key;
  };

  return newObj;
};

function indexPositions(arr){
  const obj = {};

  for (let i = 0; i < arr.length; i++){
    const key = arr[i];

    if (obj[key]) {
      obj[key].push(i)
    } else {
      obj[key] = [i];
    };
  };

  return obj;
};