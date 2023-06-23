const multer = require('multer');
const formData = multer();
const { Router } = require('express');
const questionController = require('../app/controllers/QuestionController');
const userController = require('../app/controllers/UserController');

class apiRoute {
    constructor() {
        this.router = Router();
        this.registerRoutes();
    }

    registerRoutes() {
        this.router.post(
            '/questions',
            formData.fields([]),
            questionController.question
        );
        this.router.post(
            '/users/register',
            formData.fields([]),
            userController.register
        );
        this.router.post(
            '/users/login',
            formData.fields([]),
            userController.login
        );
    }
}

module.exports = new apiRoute();
