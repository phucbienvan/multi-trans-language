const apiLimiter = require('./apiLimit.config');
const logger = require('./winston.logger');

module.exports = {
    logger,
    apiLimiter,
}
