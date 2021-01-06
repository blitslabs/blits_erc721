require('dotenv').config()

const { Harmony } = require('@harmony-js/core')
const { ChainID, ChainType, fromWei, Unit, Units, hexToNumber } = require('@harmony-js/utils')
const { getAddressFromPublicKey, toBech32, fromBech32 } = require('@harmony-js/crypto')

const ERC721Mintable = (require('../build/contracts/ERC721Mintable.json')).abi

const mint = async (to, tokenId) => {
    // Connect to HTTP Provider
    let hmy
    try {
        hmy = new Harmony(process.env.HARMONY_PROVIDER, { chainType: ChainType.Harmony, chainId: process.env.ONE_NETWORK === 'mainnet' ? ChainID.HmyMainnet : ChainID.HmyTestnet })
    } catch(e) {
        console.log(e)
        sendJSONresponse(res, 422, { status: 'ERROR', message: 'Error connecting to Harmony HTTP Provider'})
        return
    }
   
    // Instantiate Contract
    let contract
    try {
        contract = hmy.contracts.createContract(ERC721Mintable, process.env.HARMONY_CONTRACT)
    } catch(e) {
        console.log(e)
        sendJSONresponse(res, 422, { status: 'ERROR', message: 'An error occurred, please try again'})
        return
    }

    // Add Private Key
    try {
        contract.wallet.addByPrivateKey(process.env.HARMONY_PRIVATE_KEY)
    } catch (e) {
        return { status: 'ERROR', message: 'Error importing private key' }
    }

    const options = { gasPrice: 1000000000, gasLimit: 6721900, from: process.env.HARMONY_CHECKSUM_ADDRESS }

    const owner = await contract.methods.owner().call(options)
    console.log('Contract Owner:', owner)

    try {
        const response = await contract.methods.mint(to, tokenId).send(options)
        console.log(response)
    } catch(e) {
        console.log(e)
    }
}

const to = 'one1cp7c9skvdv87vlv6r45sjru4pauh822cp265gu'
const tokenId = '2'

mint(to, tokenId)