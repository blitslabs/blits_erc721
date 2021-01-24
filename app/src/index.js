import Web3 from "web3";
import { ERC721HarmonyContract } from "./contracts/harmony/infrastructure/ERC721Harmony.contract";
import {HarmonyExtensionFactory} from "./contracts/harmony/infrastructure/harmony-extension.factory";
import harmonyConfiguration from "./contracts/harmony/domain/harmony-configuration";
import {HarmonyTransactionFactory} from "./contracts/harmony/infrastructure/harmony-transaction.factory";
const CONTRACT_ADDRESS = "0x03042C7fdA8c942a54C3e0cffAFB736b44C19986";

const App = {
    web3: null,
    contract: null,
};

window.App = App;

window.addEventListener("load", async () => {
    if (window.ethereum) {
        App.web3 = new Web3(
            new Web3.providers.HttpProvider("http://127.0.0.1:7545")
        );
        await window.ethereum.enable();
    }
    const from = "one1pnj3h4xh9fz780m8cd60t00hta6ph6efjtt8y9";
    const to = "one1swc96x2m54wfnklgyvwahragkey67ryheatx8l";
    const contractWithExtension = new ERC721HarmonyContract(new HarmonyExtensionFactory(harmonyConfiguration), CONTRACT_ADDRESS);
    const contractWithTransaction = new ERC721HarmonyContract(new HarmonyTransactionFactory(harmonyConfiguration, process.env.HARMONY_PRIVATE_KEY), CONTRACT_ADDRESS);
    console.log(await contractWithExtension.getMetadata());
    console.log(await contractWithTransaction.getMetadata());
    console.log(await contractWithExtension.balanceOf(from));
    console.log(await contractWithTransaction.balanceOf(to));
    console.log(await contractWithExtension.getTokens(from));
    console.log(await contractWithTransaction.getTokens(to));
    //console.log(await contractWithExtension.mint(from, 10));
    //console.log(await contractWithTransaction.mint(from, 6));

});

export default App;
