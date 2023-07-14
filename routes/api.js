const multer = require('multer');
const formData = multer();
const { Router } = require('express');
const questionController = require('../app/controllers/QuestionController');
const userController = require('../app/controllers/UserController');
const sendPointController = require('../app/controllers/SendPointController');
const verifyJWT = require('../app/middleware/verifyJWT');
const verifyAdminJWT = require('../app/middleware/verifyAdminJWT');
const validate = require('../app/validations/validation');

class apiRoute {
    constructor() {
        this.router = Router();
        this.registerRoutes();
    }

    registerRoutes() {
        this.router.post(
            '/questions',
            verifyJWT,
            formData.fields([]),
            validate.question,
            questionController.question
        );

        this.router.get(
            '/questions',
            verifyJWT,
            formData.fields([]),
            questionController.getQuestions
        );

        this.router.post(
            '/users/register',
            formData.fields([]),
            validate.register,
            userController.register
        );

        this.router.post(
            '/users/login',
            formData.fields([]),
            validate.login,
            userController.login
        );

        this.router.get(
            '/profile',
            verifyJWT,
            formData.fields([]),
            userController.getUserProfile
        );

        this.router.post(
            '/send-point',
            verifyJWT,
            formData.fields([]),
            validate.sendPoint,
            sendPointController.sendPoint
        );

        this.router.get(
            '/get-transactions',
            verifyJWT,
            formData.fields([]),
            sendPointController.getTransactions
        );

        this.router.post(
            '/admin-send-point',
            verifyAdminJWT,
            formData.fields([]),
            validate.sendPoint,
            sendPointController.adminSendPoint
        );

        this.router.get(
            '/admin-get-transaction',
            verifyAdminJWT,
            formData.fields([]),
            sendPointController.adminGetTransaction
        );
    }
}

module.exports = new apiRoute();
