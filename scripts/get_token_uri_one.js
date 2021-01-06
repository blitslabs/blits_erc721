require('dotenv').config()

const { Harmony } = require('@harmony-js/core')
const { ChainID, ChainType, fromWei, Unit, Units, hexToNumber } = require('@harmony-js/utils')
const { getAddressFromPublicKey, toBech32, fromBech32 } = require('@harmony-js/crypto')

const ERC721Mintable = (require('../build/contracts/ERC721Mintable.json')).abi

const getTokenURI = async (tokenId) => {
    // Connect to HTTP Provider
    let hmy
    try {
        hmy = new Harmony(process.env.HARMONY_PROVIDER, { chainType: ChainType.Harmony, chainId: process.env.ONE_NETWORK === 'mainnet' ? ChainID.HmyMainnet : ChainID.HmyTestnet })
    } catch (e) {
        console.log(e)        
        return
    }

    // Instantiate Contract
    let contract
    try {
        contract = hmy.contracts.createContract(ERC721Mintable, process.env.HARMONY_CONTRACT)
    } catch (e) {
        console.log(e)        
        return
    }

    // Add Private Key
    try {
        contract.wallet.addByPrivateKey(process.env.HARMONY_PRIVATE_KEY)
    } catch (e) {
        return { status: 'ERROR', message: 'Error importing private key' }
    }

    const options = { gasPrice: 1000000000, gasLimit: 6721900, from: process.env.HARMONY_CHECKSUM_ADDRESS }

    try {
        const tokenURI = await contract.methods.tokenURI(tokenId).call(options)
        console.log('Token URI:', tokenURI)
    } catch (e) {
        console.log('Error:', e)
    }
}

const tokenId = '2'

getTokenURI(tokenId)