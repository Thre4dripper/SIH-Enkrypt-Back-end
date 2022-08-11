module.exports = {
  GRIDS_COUNT: 8,
  GRID_SIZE: 4,
  CATS_COUNT: 5,
  DOGS_COUNT: 5,

  IP_RATE_LIMIT_WINDOW: 15 * 60 * 1000, // 15 minutes
  IP_RATE_LIMIT_MAX: 20, // start blocking after 20 requests

  USER_RATE_LIMIT_WINDOW: 30 * 60 * 1000, // 30 minutes
  USER_RATE_LIMIT_MAX: 10, // start blocking after 20 requests
};
