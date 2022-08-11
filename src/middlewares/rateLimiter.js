const rateLimit = require("express-rate-limit");
const { RATE_LIMIT_WINDOW, RATE_LIMIT_MAX } = require("../config/Constants");

const rateLimiter = rateLimit({
  windowMs: RATE_LIMIT_WINDOW,
  max: RATE_LIMIT_MAX,
  message: "Too many requests from this IP, please try again after an hour",
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

module.exports = rateLimiter;
