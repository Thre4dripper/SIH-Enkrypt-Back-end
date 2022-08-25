const { randomBinary } = require("../../utils/utils");
const bcrypt = require("bcrypt");
/** =========================== FUNCTION FOR CREATING AND STORING LOGIN PATTERN  ==============================*/
const createLoginPattern = async (user, loginId, imagesNumber) => {
    const session = user.sessions.find((session) => session.loginId === loginId);
    const attempts = user.__v;

    //pattern length is decided by user attempts
    const pattern = randomBinary(attempts, imagesNumber);

    const hashedPattern = await bcrypt.hash(pattern, 10);

    //session doesn't exist, creating new session
    if (!session) {
        user.sessions.push({
            loginId,
            pattern: hashedPattern,
            patternTime: Date.now(),
        });
    }
    //session exists, updating pattern and timestamp
    else {
        const index = user.sessions.indexOf(session);
        user.sessions[index].pattern = hashedPattern;
    }

    //last login gets reset after user rate window is over
    if (user.lastLogin === 0)
        user.lastLogin = Date.now();

    await user.save();
    return pattern;
};

/** =========================== FUNCTION FOR CLEARING SESSION FROM DATABASE ==============================*/
const clearSession = async (user, session) => {
    const index = user.sessions.indexOf(session);
    user.sessions.splice(index, 1);
    await user.save();
};

/** =========================== FUNCTION FOR CLEARING PATTERN FROM DATABASE ==============================*/
const clearPattern = async (user, session) => {
    const index = user.sessions.indexOf(session);
    user.sessions[index].pattern = "";
    user.sessions[index].patternTime = 0;
    await user.save();
};

module.exports = { createLoginPattern, clearSession, clearPattern };