const { GRIDS_COUNT } = require("../config/Constants");

/**======================== FUNCTION FOR GENERATING RANDOM NUMBERS B/W LIMITS ===========================*/
const randomInt = (min, max) => Math.floor(Math.random() * (max - min) + min);

/**========================== FUNCTION FOR GENERATING RANDOM BINARY STRING ===============================*/
const randomBinary = (attempts, imagesNumber) => {
    let patternLength = GRIDS_COUNT + attempts;

    let str = "";
    for (let i = 0; i < patternLength; i++) {
        str += "0";
    }

    for (let i = 0; i < imagesNumber; i++) {
        const index = randomInt(0, patternLength);
        if (str[index] === '1') {
            i--;
            continue;
        }

        str = str.substring(0, index) + '1' + str.substring(index + 1);
    }

    return str;
};

/**======================== FUNCTION FOR GENERATING RANDOM VALUES IN ARRAY =========================*/
const randomArray = (arr, imageNumbers, min, max) => {
    const num = randomInt(min, max);
    if (imageNumbers.some((item) => item === num) || arr.includes(num)) {
        return randomArray(arr, imageNumbers, min, max);
    } else {
        arr.push(num);
        return arr;
    }
};

module.exports = { randomInt, randomArray, randomBinary };
