module.exports = (Web3js, tokenAddress, fromAddress) => {
    const contractABI = [
        {
            'constant': false,
            'inputs': [
                {
                    'name': '_to',
                    'type': 'address'
                },
                {
                    'name': '_value',
                    'type': 'uint256'
                }
            ],
            'name': 'transfer',
            'outputs': [
                {
                    'name': '',
                    'type': 'bool'
                }
            ],
            'type': 'function'
        }
    ]

    return new Web3js.eth.Contract(
        contractABI,
        tokenAddress,
        { from: fromAddress }
    );
};
