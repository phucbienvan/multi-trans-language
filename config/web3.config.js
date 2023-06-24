const { HTTP_PROVIDER } = process.env;
const web3 = require('web3');

const options = {
    reconnect: {
        auto: true,
        delay: 5000,
        maxAttempts: 5,
        onTimeout: false
    }
};

const createWeb3Instance = () => {
    const provider = new web3.providers.HttpProvider(HTTP_PROVIDER, options);
    console.log(provider);
    const web3Instance = new web3(provider);
    return web3Instance;
};

module.exports = createWeb3Instance;
