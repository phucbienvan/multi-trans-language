module.exports = (Web3js, fromAddress) => {
    console.log(222);
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
        // contractABI,
        { from: fromAddress }
    );
};
