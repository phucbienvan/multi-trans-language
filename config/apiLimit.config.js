const rateLimit = require('express-rate-limit');
const { RATE_LIMIT } = process.env;

const apiLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: RATE_LIMIT,
  handler: function (req, res) {
      res.status(429).send({
          status: 500,
          message: 'Too many requests!',
      });
  },
});

module.exports = apiLimiter;
