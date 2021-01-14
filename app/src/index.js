import Web3 from 'web3'
import ABI from '../../build/contracts/ERC721Mintable.json'
import {Contract} from "./contracts/domain/contract";
import {ERC721Contract} from "./contracts/infrastructure/ERC721.contract";
const CONTRACT_ADDRESS = '0x105fe56ff15f4029bf996d973c9c17b8d8f94be5'

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

    const contract = new ERC721Contract(CONTRACT_ADDRESS);
    console.log(await contract.getMetadata());
})

export default App;
