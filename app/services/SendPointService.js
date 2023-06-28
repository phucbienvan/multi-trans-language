const { logger, web3, contract } = require('../../config');
const transferAbi = require('../abi/transfer.json');
const { TOKEN_ADDRESS } = process.env;
const jwt = require("jsonwebtoken");
const { User } = require('../models');

class SendPointService {
    constructor() {
        this.Web3js = web3();
    }

    async sendPoint(req, res) {
        const token = req.headers.authorization.split(' ')[1];

        if (!token) {
            return false;
        }

        const decodedToken = jwt.verify(token, 'phucbv');
    
        const fromUser = await User.getUserById(decodedToken.user.id);

        const toUser = await User.getUserById(req.body.user_id);

        let web3Contract = await contract(
            this.Web3js,
            TOKEN_ADDRESS,
            fromUser.public_key
        );

        let amount = await this.Web3js.utils.toHex(
            this.Web3js.utils.toWei('1')
        );
        let data = await web3Contract.methods
            .transfer(toUser.public_key, amount)
            .encodeABI();
        let nonce = await this.Web3js.eth.getTransactionCount(
            fromUser.public_key,
            'pending'
        );
        let tx = {
            gas: this.Web3js.utils.toHex('5000000'),
            to: TOKEN_ADDRESS,
            value: '0x00',
            data: data,
            nonce: nonce,
            from: fromUser.public_key,
        };

        let signedTx = await this.Web3js.eth.accounts.signTransaction(
            tx,
            fromUser.private_key
        );

        await this.Web3js.eth.sendSignedTransaction(signedTx.rawTransaction);

        return true;
    }
}

module.exports = new SendPointService();
