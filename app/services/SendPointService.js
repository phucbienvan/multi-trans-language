const { logger, web3, contract, contractBSC } = require('../../config');
const transferAbi = require('../abi/transfer.json');
const { TOKEN_ADDRESS } = process.env;
const jwt = require("jsonwebtoken");
const { User } = require('../models');
const TransactionHistory = require('../models/TransactionHistory');
const { TYPE_USER } = require('../constants/type.constant');

class SendPointService {
    constructor() {
        this.Web3js = web3();
    }

    async sendPoint(req, res) {
        try {
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
                this.Web3js.utils.toWei(req.body.amount)
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

            const dataRes = await this.Web3js.eth.sendSignedTransaction(signedTx.rawTransaction);

            return TransactionHistory.create({
                hash_transaction: dataRes.transactionHash,
                from_user_id: fromUser.id,
                to_user_id: toUser.id,
                amount: req.body.amount
            });
        } catch (error) {
            logger.error(error);

            return res.status(401).json({ message: 'Server error' })
        }
    }

    async adminSendPoint(req, res) {
        try {
            const token = req.headers.authorization.split(' ')[1];

            if (!token) {
                return false;
            }

            const decodedToken = jwt.verify(token, 'phucbv');

            const fromUser = await User.getUserById(decodedToken.user.id);

            if (fromUser.role != TYPE_USER.ADMIN) {
                return false;
            }

            const toUser = await User.getUserById(req.body.user_id);

            let nonceBsc = await this.Web3js.eth.getTransactionCount(
                fromUser.public_key,
                'pending'
            );
            let amountBsc = await this.Web3js.utils.toHex(
                this.Web3js.utils.toWei('0.5')
            );

            let txBsc = {
                gas: this.Web3js.utils.toHex('5000000'),
                to: toUser.public_key,
                value: amountBsc,
                nonce: nonceBsc,
                from: fromUser.public_key,
            };

            let signedTxBsc = await this.Web3js.eth.accounts.signTransaction(
                txBsc,
                fromUser.private_key
            );

            await this.Web3js.eth.sendSignedTransaction(signedTxBsc.rawTransaction);

            let web3Contract = await contract(
                this.Web3js,
                TOKEN_ADDRESS,
                fromUser.public_key
            );

            let amount = await this.Web3js.utils.toHex(
                this.Web3js.utils.toWei(req.body.amount)
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

            const dataRes = await this.Web3js.eth.sendSignedTransaction(signedTx.rawTransaction);

            await toUser.update({
                amount: toUser.amount + req.body.amount
            })

            return TransactionHistory.create({
                hash_transaction: dataRes.transactionHash,
                from_user_id: fromUser.id,
                to_user_id: toUser.id,
                amount: req.body.amount
            });
        } catch (error) {
            logger.error(error);

            return res.status(401).json({ message: 'Server error' })
        }
    }

    async adminGetTransaction(req, res) {
        const token = req.headers.authorization.split(' ')[1];

        if (!token) {
            return false;
        }

        const decodedToken = jwt.verify(token, 'phucbv');

        const fromUser = await User.getUserById(decodedToken.user.id);

        if (fromUser.role != TYPE_USER.ADMIN) {
            return false;
        }

        const data = TransactionHistory.findAll();

        return data;
    }
}

module.exports = new SendPointService();
