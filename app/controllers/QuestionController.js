const questionService = require('../services/QuestionService');

class QuestionController {
    async question(req, res) {
        const data = await questionService.question(req, res);

        return res
            .status(200)
            .json({ data });
    }

    async getQuestions (req, res) {
        const data = await questionService.getQuestions(req);

        return res
            .status(200)
            .json({ data });
    }
}

module.exports = new QuestionController();
