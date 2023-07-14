const userService = require('../services/UserService');

class UserController {
    async register(req, res) {
        const register = await userService.registerUser(req, res);

        return register;
    }

    async login(req, res) {
        const login = await userService.login(req, res);

        return login;
    }

    async getUserProfile(req, res) {
        const data = await userService.getUserProfile(req, res);

        return data;
    }
}

module.exports = new UserController();
