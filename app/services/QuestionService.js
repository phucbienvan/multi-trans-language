const { Configuration, OpenAIApi } = require("openai");
const { logger } = require('../../config');
const { OPEN_API_KEY, OPEN_AI_MODEL } = process.env;
const { Question } = require('../models/index')

class QuestionService {
    async question(req) {
        try {
            const configuration = new Configuration({
                apiKey: OPEN_API_KEY,
            });

            const openai = new OpenAIApi(configuration);

            const completion = await openai.createCompletion({
                model: OPEN_AI_MODEL,
                prompt: "dịch từ sau sang tiếng việt: " + req.body.keyword,
                max_tokens: 200
            },
            // {
            //     timeout: 1000,
            //     headers: {
            //         "Example-Header": "example",
            //     },
            // }
            );

            const question = completion.data.choices[0].text;
            console.log(completion.data);

            const params = {
                answer: req.body.keyword,
                question: question,
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
