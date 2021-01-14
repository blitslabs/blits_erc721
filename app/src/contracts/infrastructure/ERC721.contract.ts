import {Contract} from "../domain/contract";
import {Metadata} from "../domain/metadata";
import ABI from '../../../../build/contracts/ERC721Mintable.json'
import {Contract as Web3Contract} from 'web3-eth-contract';
import App from "../../index";

export class ERC721Contract implements Contract{
    private readonly contract: Web3Contract;
    constructor(address: string) {
        this.contract = new App.web3.eth.Contract(ABI.abi, address);
    }

    async getMetadata(): Promise<Metadata> {
        return {
            name: await this.contract.methods.name().call(),
            symbol: await this.contract.methods.symbol().call(),
            baseURI: await this.contract.methods.baseURI().call()
        };
    }
}
