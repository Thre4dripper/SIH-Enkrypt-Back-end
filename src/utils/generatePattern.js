const randomArray = require("../utils/randomArray");

const generatePattern = (pattern, categorySize, pass_image) => {
  let imagePattern = [];
  const gridSize = 4;

  for (let i = 0; i < pattern.length; i++) {
    let arr = [];
    for (let j = 0; j < gridSize; j++) {
      arr = randomArray(arr, +pass_image, 1, categorySize + 1);
    }

    if (pattern[i] === "1") {
      const index = Math.floor(Math.random() * gridSize);
      arr[index] = +pass_image;
    }
    // const str = arr.join("");

    imagePattern.push(arr);
  }

  return imagePattern;
};

module.exports = generatePattern;
