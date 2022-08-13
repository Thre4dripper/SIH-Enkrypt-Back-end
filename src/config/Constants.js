module.exports = {
  GRIDS_COUNT: 8,
  GRID_SIZE: 4,

  IP_RATE_LIMIT_WINDOW: 15 * 60 * 1000, // 15 minutes
  IP_RATE_LIMIT_MAX: 100, // start blocking after 100 requests

  USER_RATE_LIMIT_WINDOW: 10 * 60 * 1000, // 10 minutes
  USER_RATE_LIMIT_MAX: 10, // start blocking after 20 requests

  OTP_EXPIRY_TIME: 5 * 60 * 1000, // 5 minutes
};
