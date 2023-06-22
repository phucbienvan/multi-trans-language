const questionService = require('../services/QuestionService');

class QuestionController {
    async question(req, res) {
        const question = await questionService.question(req);

        return res
            .status(200)
            .json({ question });
    }
}

module.exports = new QuestionController();
