const cors = require('cors');
const apiRoute = require('./api');
const { apiLimiter } = require('../config');
// const Authenticate = require('../app/middleware/authenticate');

module.exports = (app) => {
  app.use(
    '/api/',
    cors(),
    apiLimiter,
    // Authenticate.authenticateUser,
    apiRoute.router
  );
}
