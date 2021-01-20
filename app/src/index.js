import Web3 from "web3";
import { ERC721HarmonyContract } from "./contracts/harmony/infrastructure/ERC721Harmony.contract";
import { getHarmonyExtension } from "./contracts/harmony/domain/harmony-wallet";
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

    const contract = new ERC721HarmonyContract(CONTRACT_ADDRESS);

    const from = "one1pnj3h4xh9fz780m8cd60t00hta6ph6efjtt8y9";
    const to = "one1swc96x2m54wfnklgyvwahragkey67ryheatx8l";
});

export default App;
