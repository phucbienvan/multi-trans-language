const { logger, web3 } = require('../../config');
const transferAbi = require('../abi/transfer.json')

class SendPointService {
    async sendPoint() {
        const contract = new web3.eth.Contract(transferAbi, '0x7313Eb1c679ab808e30AA40463f754574B7d0D02', {
            from: '0x0445501FD391ea9aB2C9aFaeA9914e7c1228580F'
        })

        const amount = await web3().utils.toHex(web3().utils.toWei('1'));
        console.log(amount);
    }
}

module.exports = new SendPointService();
