const multer = require('multer');
const formData = multer();
const { Router } = require('express');
const questionController = require('../app/controllers/QuestionController');

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
    }
}

module.exports = new apiRoute();
