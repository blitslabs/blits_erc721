require('dotenv').config()
const Web3 = require('web3')
const Tx = require('ethereumjs-tx').Transaction
const ETH_CHAIN_ID = process.env.ETH_CHAIN_ID
const ETH_CHAIN_NAME = process.env.ETH_CHAIN_NAME
const ETH_PUBLIC_KEY = process.env.ETH_PUBLIC_KEY
const ETH_PRIVATE_KEY = process.env.ETH_PRIVATE_KEY
const HTTP_PROVIDER = process.env.HTTP_PROVIDER
const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS
const CONTRACT_ABI = (require('../build/contracts/ERC721Mintable.json')).abi


const mintToken = async (to, tokenId) => {
    const web3 = new Web3(new Web3.providers.HttpProvider(HTTP_PROVIDER))

    // Instantiate Contract
    let contract
    try {
        contract = new web3.eth.Contract(CONTRACT_ABI, CONTRACT_ADDRESS, { from: ETH_PUBLIC_KEY })
    } catch (e) {
        console.log(e)
        return { status: 'ERROR', message: 'Error instantiating contract' }
    }

    // Get TX Nonce
    const nonce = await web3.eth.getTransactionCount(ETH_PUBLIC_KEY)

    // Encode 
    const data = await contract.methods.mint(to, tokenId).encodeABI()

    // Prepare TX
    const rawTx = {
        from: ETH_PUBLIC_KEY,
        nonce: '0x' + nonce.toString(16),
        gasPrice: '0x003B9ACA00',
        gasLimit: '0x170D62',
        to: CONTRACT_ADDRESS,
        value: '0x0',
        chainId: ETH_CHAIN_ID,
        data
    }

    // Create TX
    const tx = new Tx(rawTx, { chain: ETH_CHAIN_NAME })

    // Load private key
    const privateKey = new Buffer.from(ETH_PRIVATE_KEY, 'hex')

    // Sign Tx
    tx.sign(privateKey)

    const serializedTx = tx.serialize()

    try {
        const txHash = await sendRawTx(serializedTx, web3)
        return { status: 'OK', payload: txHash, message: 'Transaction sent' }
    } catch (e) {
        return { status: 'ERROR', message: e }
    }
}

const sendRawTx = (serializedTx, web3) => {
    return new Promise((resolve, reject) => {
        web3.eth.sendSignedTransaction('0x' + serializedTx.toString('hex'), (error, txHash) => {
            if (error) {
                reject(error)
            }
            resolve(txHash)
        })
    })
}

const start = async () => {
    const to = '0x80a355E4E0dA302c2850d6f6fBe1F8c66363a286';
    const tokenId = 1;
    try {        
        const response = await mintToken(to, tokenId);
        console.log(response)
    } catch (e) {
        console.log(e);        
    }
}

start()