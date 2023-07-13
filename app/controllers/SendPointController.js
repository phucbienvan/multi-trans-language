const sendPointService = require('../services/SendPointService');

class SendPointController {
    async sendPoint(req, res) {
        const question = await sendPointService.sendPoint(req, res);

        if (!question) {
            return res
                .status(500)
                .json({ message: 'Error' });
        }

        return res
            .status(200)
            .json({ question });
    }

    async adminSendPoint(req, res) {
        const data = await sendPointService.adminSendPoint(req, res);

        if (!data) {
            return res
                .status(500)
                .json({ message: 'Error' });
        }

        return res
            .status(200)
            .json({ data });
    }
}

module.exports = new SendPointController();