const jwt = require('jsonwebtoken');
const { TYPE_USER } = require('../constants/type.constant');

const verifyAdminJWT = (req, res, next) => {
    const authHeader = req.headers.authorization || req.headers.Authorization;

    if (!authHeader) {
        return res.status(401).json({ message: 'Login required' })
    }

    const token = authHeader.split(' ')[1];

    jwt.verify(
        token,
        'phucbv',
        (err, decoded) => {
            if (err) {
                return res.status(403).json({ message: 'Forbidden' });
            }

            req.userId = decoded.user.id;
            req.userEmail = decoded.user.email;
            req.userHashedPwd = decoded.user.password;

            if (decoded.user.role !== TYPE_USER.ADMIN) {
                return res.status(403).json({ message: 'Forbidden Admin' });
            }

            next();
        }
    )
};

module.exports = verifyAdminJWT;
