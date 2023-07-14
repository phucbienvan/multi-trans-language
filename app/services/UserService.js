const { User } = require('../models/index')
const { logger, web3 } = require('../../config');
const bcrypt = require('bcrypt');
const { TYPE_USER } = require('../constants/type.constant');
const jwt = require("jsonwebtoken");

class UserService {
    async registerUser(req, res) {
        try {
            const hashedPs = await bcrypt.hashSync(req.body.password, 10);
            const wallet = await web3().eth.accounts.create();

            const params = {
                email: req.body.email,
                username: req.body.username,
                password: hashedPs,
                public_key: wallet.address,
                private_key: wallet.privateKey,
                role: TYPE_USER.USER,
                amount: 0,
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
                data: await User.toUserResponse(loginUser.id, loginUser.username, loginUser.email, loginUser.role)
            });
        } catch (error) {
            logger.error(error);

            return res.status(401).json({ message: 'Server error' })
        }
    }

    async getUserProfile(req, res) {
        let token = req.headers.authorization.split(' ')[1];

        if (!token) {
            return false;
        }

        let decodedToken = jwt.verify(token, 'phucbv');

        let userId = req.body?.user_id ?? decodedToken.user.id;

        let fromUser = await User.getUserById(userId);

        if (!fromUser) {
            return res.status(404).json({ message: "User Not Found" });
        }

        let params = {
            id: fromUser.id,
            username: fromUser.username,
            email: fromUser.email,
            public_key: fromUser.public_key,
            amount: fromUser.amount
        }

        return res.status(200).json({
            data: params
        });
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
