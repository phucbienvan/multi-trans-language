const { Configuration, OpenAIApi } = require("openai");
const { logger } = require('../../config');
const { OPEN_API_KEY, OPEN_AI_MODEL } = process.env;

class QuestionService {
    async question(req) {
        try {
            const configuration = new Configuration({
                apiKey: OPEN_API_KEY,
            });

            const openai = new OpenAIApi(configuration);

            const completion = await openai.createCompletion({
                model: OPEN_AI_MODEL,
                prompt: "dịch từ tiếng anh sau sang tiếng việt: " + req.body.keyword,
            });

            return completion.data.choices[0].text;
        } catch (error) {
            console.log(error);
            logger.error(error);

            return false;
        }
    }
}

module.exports = new QuestionService();
