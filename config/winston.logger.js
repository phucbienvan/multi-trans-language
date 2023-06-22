const winston = require('winston');

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.prettyPrint(),
  ),
  defaultMeta: { service: 'service' },
  transports: [
    new winston.transports.File({ filename: 'error.log', level: 'error' })
  ],
  maxsize: 5242880, // 5MB
});

module.exports = logger;
