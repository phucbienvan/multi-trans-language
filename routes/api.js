const multer = require('multer');
const formData = multer();
const { Router } = require('express');
const questionController = require('../app/controllers/QuestionController');
const userController = require('../app/controllers/UserController');
const sendPointController = require('../app/controllers/SendPointController');

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
        this.router.post(
            '/send-point',
            formData.fields([]),
            sendPointController.sendPoint
        );
    }
}

module.exports = new apiRoute();
