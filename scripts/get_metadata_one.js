require('dotenv').config()
const { Harmony } = require('@harmony-js/core')
const { ChainID, ChainType } = require('@harmony-js/utils')
const ERC721Mintable = (require('../build/contracts/ERC721Mintable.json')).abi

const getMetadata = async () => {
    const hmy = new Harmony(process.env.HARMONY_PROVIDER,{ chainType: ChainType.Harmony, chainId: process.env.ONE_NETWORK === 'mainnet' ? ChainID.HmyMainnet : ChainID.HmyTestnet })
    const contract = hmy.contracts.createContract(ERC721Mintable, process.env.HARMONY_CONTRACT)
    const name = await contract.methods.name().call()
    const symbol = await contract.methods.symbol().call()
    console.log(name)
    console.log(symbol)
}

getMetadata()