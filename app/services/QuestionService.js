const { Configuration, OpenAIApi } = require("openai");
const { logger } = require('../../config');
const { OPEN_API_KEY, OPEN_AI_MODEL } = process.env;
const { Question, User } = require('../models/index');
const jwt = require("jsonwebtoken");

class QuestionService {
    async question(req, res) {
        try {
            const token = req.headers.authorization.split(' ')[1];

            if (!token) {
                return false;
            }

            const decodedToken = jwt.verify(token, 'phucbv');
        
            const fromUser = await User.getUserById(decodedToken.user.id);

            if (fromUser.amount < 1) {
                return res.status(422).json({
                    errors: {
                        message: "not enough"
                    }
                });
            }

            const configuration = new Configuration({
                apiKey: OPEN_API_KEY,
            });

            const openai = new OpenAIApi(configuration);

            const completion = await openai.createCompletion({
                model: OPEN_AI_MODEL,
                prompt: "dịch từ sau sang tiếng việt: " + req.body.keyword,
                max_tokens: 200
            });

            await fromUser.update({
                amount: fromUser.amount - 1
            })

            const params = {
                answer: req.body.keyword,
                question: completion.data.choices[0].text,
                user_id: 44
            }

            return this.insertQuestion(params);
        } catch (error) {
            logger.error(error);

            return false;
        }
    }

    async insertQuestion(params) {
        try {
            const question = await Question.create(params);

            return question;
        } catch (e) {
            logger.error(e);

            return false;
        }
    }
}

module.exports = new QuestionService();
