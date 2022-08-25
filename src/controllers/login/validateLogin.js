require('dotenv').config();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../../models/user");
const { createLoginPattern, clearPattern, clearSession } = require("./dbOperations");
const { SESSION_TIMEOUT } = require("../../config/Constants");

/** =========================== FUNCTION FOR FINAL VALIDATION OF USER BY PATTERN  ==============================*/
const validateLogin = async (req, res) => {
    const { username, loginId, pattern } = req.body;

    if (!username || !loginId || !pattern) {
        return res.status(400).json({ message: "Empty Field(s)", success: false });
    }

    try {
        const user = await User.findOne({ username }).exec();

        //getting session from user loginId
        const session = user.sessions.find(
            (session) => session.loginId === loginId
        );

        if (!session) {
            return res.status(409).json({
                message: "session doesn't exist",
                success: false,
            });
        }

        //getting pattern,patternTime from session
        const dbPattern = session.pattern;
        const dbPatternTimestamp = session.patternTime + SESSION_TIMEOUT;
        const timestamp = Date.now();

        //checking validity of pattern by timestamp
        if (timestamp > dbPatternTimestamp) {
            //clearing pattern from user's data
            //once pattern is cleared, pattern always show pattern expired, unless user relogin with username
            await clearPattern(user, session);

            return res.status(401).json({
                message: "Pattern expired, please relogin",
                success: false,
            });
        }

        //checking pattern
        if (await bcrypt.compare(pattern, dbPattern)) {
            //clearing session after successful login
            await clearSession(user);

            user.__v = 0;
            await user.save();

            const token = await jwt.sign({ username }, process.env.JWT_SECRET, {
                expiresIn: "300s",
            });

            //returning success message
            return res.status(200).json({
                message: "pattern validated",
                success: true,
                token,
            });
        }
        //pattern not matched
        else {
            const imagesNumber = user.pass_image.split("-").length;
            /*
            for wrong attempts, pattern gets reset for security reasons,
            although user gets redirected to login page for new pattern
            */
            await createLoginPattern(user, loginId, imagesNumber);

            //unauthorized
            return res.status(401).json({
                message: "pattern not validated",
                success: false,
            });
        }
    } catch (e) {
        console.log(e);
        return res.status(500).json({
            message: "Something went wrong",
            success: false,
        });
    }
};

module.exports = validateLogin;
