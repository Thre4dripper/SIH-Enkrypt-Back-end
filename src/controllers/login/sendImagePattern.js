const User = require("../../models/user");
const {createLoginPattern} = require("./dbOperations");
const generatePattern = require("../../utils/generatePattern");
/** =========================== FUNCTION FOR SENDING RANDOM IMAGE PATTERN TO CLIENT ==============================*/
const sendImagePattern = async (req, res) => {
    const {username, loginId, categoriesLength} = req.body;

    if (!username || !loginId || !categoriesLength) {
        return res.status(400).json({message: "Empty Field(s)", success: false});
    }

    const user = await User.findOne({username}).exec();

    //firstly creating login pattern to be stored in DB and also get it
    const pattern = await createLoginPattern(user, loginId);

    let {category, pass_image} = user;

    //getting pass_image value and login pattern value
    pass_image = pass_image.substring(pass_image.length - 1);

    const categorySize = categoriesLength.find(
        (item) => item.category.toLowerCase() === category
    )?.length;

    if (!categorySize) {
        //bad request
        return res
            .status(400)
            .json({message: "Category not found", success: false});
    }

    //generating image pattern to be sent to client
    const imagesPattern = generatePattern(pattern, categorySize, pass_image);

    return res.status(200).json({
        message: "pattern generated",
        isExist: true,
        pattern: imagesPattern,
        category,
    });
};

module.exports = {sendImagePattern};