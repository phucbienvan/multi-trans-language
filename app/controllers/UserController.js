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
}

module.exports = new UserController();
