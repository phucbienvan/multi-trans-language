const questionService = require('../services/QuestionService');

class QuestionController {
    async question(req, res) {
        const data = await questionService.question(req);

        return res
            .status(200)
            .json({ data });
    }
}

module.exports = new QuestionController();
