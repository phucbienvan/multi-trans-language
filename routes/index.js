const cors = require('cors');
const apiRoute = require('./api');
const { apiLimiter } = require('../config');

module.exports = (app) => {
  app.use(
    '/api/',
    cors(),
    apiLimiter,
    apiRoute.router
  );
}
