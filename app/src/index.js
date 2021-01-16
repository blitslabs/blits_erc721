import Web3 from 'web3'
import ABI from '../../build/contracts/ERC721Mintable.json'
import {ERC721Contract} from "./contracts/domain/ERC721.contract";
import {ERC721HarmonyContract} from "./contracts/infrastructure/ERC721Harmony.contract";
const CONTRACT_ADDRESS = '0xf9cb0a924b08b87ad0b5498d81a6a426dda25Cbe'

const App = {
    web3: null,
    contract: null,
}

window.App = App

window.addEventListener('load', async () => {
    if (window.ethereum) {
        App.web3 = new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:7545"))
        await window.ethereum.enable()
    }

    const contract = new ERC721HarmonyContract(CONTRACT_ADDRESS);
    console.log(await contract.getMetadata());
})

export default App;
