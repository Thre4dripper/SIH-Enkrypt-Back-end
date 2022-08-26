require('dotenv').config();

const getCorrespondingKeysForNumber = (num) => {
    switch (num) {
        case "wfftxr":
            return "0";
        case "brtwag":
            return "1";
        case "esbpom":
            return "2";
        case "gfvatj":
            return "3";
        case "ahtehs":
            return "4";
        case "cvdgfq":
            return "5";
        case "ppufbc":
            return "6";
        case "dhtebh":
            return "7";
        case "chdind":
            return "8";
        case "eetyuy":
            return "9";
        default:
            return "dhsytr";
    }
};

const smallCharacters = [
    "a",
    "b",
    "c",
    "d",
    "e",
    "f",
    "g",
    "h",
    "i",
    "j",
    "k",
    "l",
    "m",
    "n",
    "o",
    "p",
    "q",
    "r",
    "s",
    "t",
    "u",
    "v",
    "w",
    "x",
    "y",
    "z",
];

const decryptPassImage = (passImage) => {
    const key = +process.env.PASS_IMAGE_DECRYPTION_KEY;

    let decrypted = "";
    for (let i = 0; i < passImage.length; i++) {
        for (let j = 0; j < 26; j++) {
            if (passImage[i] === smallCharacters[j]) {
                let index = (j - key) % 26;
                index < 0 ? index += 26 : index;
                decrypted += smallCharacters[index];
                break;
            }
        }
    }

    let imageNumber = "";
    while (decrypted.length > 0) {
        const currentKey = decrypted.substring(0, 6);
        imageNumber += getCorrespondingKeysForNumber(currentKey);
        decrypted = decrypted.substring(6);
    }

    return imageNumber;
}

module.exports = decryptPassImage;