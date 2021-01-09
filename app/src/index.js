import Web3 from 'web3'
import ABI from '../../build/contracts/ERC721Mintable.json'
const CONTRACT_ADDRESS = '0xe0036B2E878a67029b3a24e35aA7d28F221d28DC'

const App = {
    web3: null,
    contract: null,

    getMetadata: async () => {
        App.contract = new App.web3.eth.Contract(ABI.abi, CONTRACT_ADDRESS)
        const name = await App.contract.methods.name().call()
        const symbol = await App.contract.methods.symbol().call()
        console.log(name)
    }
    
}

window.App = App

window.addEventListener('load', async () => {
    if (window.ethereum) {
        App.web3 = new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:7545"))
        await window.ethereum.enable()
    } 

    App.getMetadata()
})