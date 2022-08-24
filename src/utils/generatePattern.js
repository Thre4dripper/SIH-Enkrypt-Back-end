const { randomArray } = require("../utils/utils");
const { GRID_SIZE, GRIDS_COUNT } = require("../config/Constants");
const { randomInt } = require("./utils");

const generatePattern = (pattern, categorySize, imageNumbers) => {
    let imagePattern = [];

    //filling random values in all the grids
    for (let i = 0; i < pattern.length; i++) {
        let arr = [];
        for (let j = 0; j < GRID_SIZE; j++) {
            arr = randomArray(arr, 0, categorySize);
        }
        imagePattern.push(arr);
    }

    let startIndex = 0, endIndex = GRIDS_COUNT / imageNumbers.length;

    //now filling all the sequence of images - 1 in the grids
    for (let i = 0; i < imageNumbers.length - 1; i++) {
        //random grid number
        const gridIndex = randomInt(startIndex, endIndex);
        //random image position in the grid
        const imageIndex = randomInt(0, GRID_SIZE);
        imagePattern[gridIndex][imageIndex] = imageNumbers[i];

        //updating the start and end index
        endIndex += endIndex - startIndex;
        startIndex = gridIndex + 1;
    }
    //filling the last image number
    //set end index to last grid number
    endIndex = GRIDS_COUNT - 1;

    //repeat the same process as above of inserting last image of sequence
    //at random grid number and random position in the grid
    const gridIndex = randomInt(startIndex, endIndex);
    const imageIndex = randomInt(0, GRID_SIZE);
    imagePattern[gridIndex][imageIndex] = imageNumbers[imageNumbers.length - 1];

    return imagePattern;
};

module.exports = generatePattern;
