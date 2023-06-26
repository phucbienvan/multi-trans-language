const sendPointService = require('../services/SendPointService');

class SendPointController {
    async sendPoint (req, res) {
        const question = await sendPointService.sendPoint();

        return res
            .status(200)
            .json({ question });
    }
}

module.exports = new SendPointController();