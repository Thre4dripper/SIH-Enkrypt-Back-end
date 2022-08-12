const rateLimit = require("express-rate-limit");
const { IP_RATE_LIMIT_WINDOW, IP_RATE_LIMIT_MAX } = require("../config/Constants");

const ipRateLimiter = rateLimit({
  windowMs: IP_RATE_LIMIT_WINDOW,
  max: IP_RATE_LIMIT_MAX,
  message: "Too many requests from this IP, please try again after 15 minutes",
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

module.exports = ipRateLimiter;
