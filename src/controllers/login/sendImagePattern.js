const bcrypt = require("bcrypt");

const User = require("../../models/user");
const { createLoginPattern } = require("./dbOperations");
const generatePattern = require("../../utils/generatePattern");
/** =========================== FUNCTION FOR SENDING RANDOM IMAGE PATTERN TO CLIENT ==============================*/
const sendImagePattern = async (req, res) => {
    const { username, loginId, categoriesLength } = req.body;

    if (!username || !loginId || !categoriesLength) {
        return res.status(400).json({ message: "Empty Field(s)", success: false });
    }

    const user = await User.findOne({ username }).exec();

    let { category, pass_image } = user;

    const categorySize = categoriesLength.find(
        (item) => item.category.toLowerCase() === category
    )?.length;

    if (!categorySize) {
        //bad request
        return res
            .status(400)
            .json({ message: "Category not found", success: false });
    }

    //getting pass image number from hashed pass_image
    let imageNumbers = [];
    let pass_images = pass_image.split("-");
    for (let i = 0; i < pass_images.length; i++) {
        let imageNumber = 0;
        for (let j = 0; j < categorySize; j++) {
            if (bcrypt.compareSync(imageNumber.toString(), pass_images[i]))
                break;
            imageNumber++
        }
        imageNumbers.push(imageNumber);
    }

    //firstly creating login pattern to be stored in DB and also get it
    const pattern = await createLoginPattern(user, loginId, imageNumbers.length);

    //generating image pattern to be sent to client
    const imagesPattern = generatePattern(pattern, categorySize, imageNumbers);

    return res.status(200).json({
        message: "pattern generated",
        isExist: true,
        pattern: imagesPattern,
        category,
    });
};

module.exports = sendImagePattern;