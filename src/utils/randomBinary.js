const randomBinary = (pattern) => {
  let patternLength = pattern.length;
  if (patternLength === 0) patternLength = 5;
  else patternLength++;

  let number = Math.floor(Math.random() * Math.pow(2, patternLength));

  let str = "";
  while (number !== 0) {
    str += number % 2;
    number = parseInt(number / 2);
  }
  return str.padStart(patternLength, "0");
};

module.exports = randomBinary;
