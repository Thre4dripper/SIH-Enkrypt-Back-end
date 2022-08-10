const randomArray = (arr, pass_image, min, max) => {
  const num = Math.floor(Math.random() * (max - min) + min);
  if (pass_image===num || arr.includes(num)) {
    return randomArray(arr, pass_image, min, max);
  } else {
    arr.push(num);
    return arr;
  }
};

module.exports = randomArray;