require('dotenv').config()
const Web3 = require('web3')
const CONTRACT_ABI = (require('../build/contracts/ERC721Mintable.json')).abi
const HTTP_PROVIDER = process.env.HTTP_PROVIDER
const CONTRACT_ADDRESS = '0xBc736716b9fDE38f3ff02d779e5b221242D5119E'
const ETH_PUBLIC_KEY = process.env.ETH_PUBLIC_KEY
const ETH_PRIVATE_KEY = process.env.ETH_PRIVATE_KEY

const getMetadata = async () => {

    const web3 = new Web3(new Web3.providers.HttpProvider(HTTP_PROVIDER))
    const contract = new web3.eth.Contract(CONTRACT_ABI, CONTRACT_ADDRESS, { from: ETH_PUBLIC_KEY })
    const name = await contract.methods.name().call()
    const symbol = await contract.methods.symbol().call()
    console.log(name)
    console.log(symbol)
}

getMetadata()