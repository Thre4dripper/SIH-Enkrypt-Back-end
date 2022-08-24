const { GRIDS_COUNT } = require("../config/Constants");

/**======================== FUNCTION FOR GENERATING RANDOM NUMBERS B/W LIMITS ===========================*/
const randomInt = (min, max) => Math.floor(Math.random() * (max - min) + min);

/**========================== FUNCTION FOR GENERATING RANDOM BINARY STRING ===============================*/
const randomBinary = (attempts) => {
    let patternLength = GRIDS_COUNT + attempts;

    let number = randomInt(0, Math.pow(2, patternLength));

    let str = "";
    while (number !== 0) {
        str += number % 2;
        number = parseInt(number / 2);
    }
    return str.padStart(patternLength, "0");
};

/**======================== FUNCTION FOR GENERATING RANDOM VALUES IN ARRAY =========================*/
const randomArray = (arr, min, max) => {
    const num = randomInt(min, max);
    if (arr.includes(num)) {
        return randomArray(arr, min, max);
    } else {
        arr.push(num);
        return arr;
    }
};

module.exports = { randomInt, randomArray, randomBinary };
