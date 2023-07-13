const apiLimiter = require('./apiLimit.config');
const logger = require('./winston.logger');
const web3 = require('./web3.config');
const contract = require('./simon.config');
const contractBSC = require('./bsc.config');

module.exports = {
    logger,
    apiLimiter,
    web3,
    contract,
    contractBSC,
}
