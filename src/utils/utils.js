const { GRIDS_COUNT } = require("../config/Constants");

/**======================== FUNCTION FOR GENERATING RANDOM NUMBERS B/W LIMITS ===========================*/
const randomInt = (min, max) => Math.floor(Math.random() * (max - min) + min);

/**========================== FUNCTION FOR GENERATING RANDOM BINARY STRING ===============================*/
const randomBinary = (atempts) => {
  let patternLength = GRIDS_COUNT + atempts;

  let number = randomInt(0, Math.pow(2, patternLength));

  let str = "";
  while (number !== 0) {
    str += number % 2;
    number = parseInt(number / 2);
  }
  return str.padStart(patternLength, "0");
};

/**======================== FUNCTION FOR GENERATING RANDOM VALUES IN ARRAY =========================*/
const randomArray = (arr, pass_image, min, max) => {
  const num = randomInt(min, max);
  if (pass_image === num || arr.includes(num)) {
    return randomArray(arr, pass_image, min, max);
  } else {
    arr.push(num);
    return arr;
  }
};

module.exports = { randomArray, randomBinary };
