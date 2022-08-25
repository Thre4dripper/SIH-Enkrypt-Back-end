const { randomArray } = require("../utils/utils");
const { GRID_SIZE } = require("../config/Constants");
const { randomInt } = require("./utils");

const generatePattern = (pattern, categorySize, imageNumbers) => {
    let imagePattern = [];

    //filling random values in all the grids
    for (let i = 0; i < pattern.length; i++) {
        let arr = [];
        for (let j = 0; j < GRID_SIZE; j++) {
            arr = randomArray(arr, imageNumbers, 0, categorySize);
        }
        imagePattern.push(arr);
    }

    //now filling images in the grids
    let itr = 0;
    for (let i = 0; i < pattern.length; i++) {
        if (pattern[i] === '1') {
            const imagePosition = randomInt(0, GRID_SIZE);
            imagePattern[i][imagePosition] = imageNumbers[itr]
            itr++;
        }
    }

    //saving image indexes
    const imageIndexes = [...pattern].map((item, index) => {
        if (item === '1')
            return index;
    }).filter((item) => item !== undefined);


    for (let i = 0; i < imageNumbers.length; i++) {
        const gridIndex = randomInt(imageIndexes[i], pattern.length);
        if (imageIndexes.some((item) => item === gridIndex)) {
            i--;
            continue;
        }
        const imagePosition = randomInt(0, GRID_SIZE);
        imagePattern[gridIndex][imagePosition] = imageNumbers[i];
    }

    return imagePattern;
};

module.exports = generatePattern;
