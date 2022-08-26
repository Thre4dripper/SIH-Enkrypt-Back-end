const { randomArray } = require("../utils/utils");
let { GRID_SIZE } = require("../config/Constants");

const generatePattern = (pattern, categorySize, imageNumber, attempts) => {
    let imagePattern = [];
    if (attempts >= 5)
        GRID_SIZE = 9;

    for (let i = 0; i < pattern.length; i++) {
        let arr = [];
        for (let j = 0; j < GRID_SIZE; j++) {
            arr = randomArray(arr, imageNumber, 0, categorySize);
        }

        if (pattern[i] === "1") {
            const index = Math.floor(Math.random() * GRID_SIZE);
            arr[index] = imageNumber;
        }
        // const str = arr.join("");

        imagePattern.push(arr);
    }

    return imagePattern;
};

module.exports = generatePattern;
