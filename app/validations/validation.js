const { check, validationResult } = require('express-validator');

let checkErrors = (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(403).json({
            code: 403,
            message: errors.array()[0].msg
        });
    } else next();
};

module.exports = {
    question: [
        check('keyword')
            .exists().withMessage('keyword invalid'),
        checkErrors,
    ],
    login: [
        check('email')
            .exists().withMessage('email invalid'),
        check('password')
            .exists().withMessage('password invalid'),
        checkErrors,
    ],
    register: [
        check('username')
            .exists().withMessage('username invalid'),
        check('email')
            .exists().withMessage('email invalid'),
        check('password')
            .exists().withMessage('password invalid'),
        checkErrors,
    ],
    sendPoint: [
        check('user_id')
            .exists().withMessage('user_id invalid')
            .isInt().withMessage('user_id is integer'),
        check('amount')
            .exists().withMessage('amount invalid')
            .isInt().withMessage('amount is integer'),
        checkErrors,
    ]
};
