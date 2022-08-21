require('dotenv').config()
const jwt = require("jsonwebtoken");

const verifyJWT = async (req, res) => {
    const token = req.headers["x-access-token"] || req.headers["authorization"];

    if (!token) {
        return res.status(401).json({ message: "No token, authorization denied", success: false });
    }

    try {
        const result = await jwt.verify(token, process.env.JWT_SECRET);
        if(result.username) {
            return res.status(200).json({ message: "Token verified", success: true });
        }
        else {
            return res.status(401).json({ message: "Invalid token", success: false });
        }
    } catch (err) {
        return res.status(400).json({ message: "Token is not valid", success: false });
    }
}

module.exports = verifyJWT;