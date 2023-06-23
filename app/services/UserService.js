const { User } = require('../models/index')
const { logger } = require('../../config');
const bcrypt = require('bcrypt');

class UserService {
    async registerUser(req, res) {
        try {
            const hashedPs = await bcrypt.hashSync(req.body.password, 10);

            const params = {
                email: req.body.email,
                username: req.body.username,
                password: hashedPs
            }

            const newUser = await this.insertUser(params);

            if (newUser) {
                res.status(200).json({
                    data: true,
                    message: "register success."
                })
            } else {
                res.status(422).json({
                    errors: {
                        body: "Unable to register a user"
                    }
                });
            }
        } catch (error) {
            logger.error(e);

            return res.status(401).json({ message: 'Server error' })
        }
    }

    async login(req, res) {
        try {
            const loginUser = await User.findOne({
                where: {
                    email: req.body.email
                }
            });

            if (!loginUser) {
                return res.status(404).json({ message: "User Not Found" });
            }

            const match = await bcrypt.compare(req.body.password, loginUser.password);

            if (!match) return res.status(401).json({ message: 'Wrong password' })

            return res.status(200).json({
                data: await User.toUserResponse(loginUser.username, loginUser.email)
            });
        } catch (error) {
            logger.error(e);

            return res.status(401).json({ message: 'Server error' })
        }
    }

    async insertUser(params) {
        try {
            const user = await User.create(params);

            return user;
        } catch (e) {
            logger.error(e);

            return false;
        }
    }
}

module.exports = new UserService();