import {ERC721Contract} from "../../shared/domain/ERC721.contract";
import ABI from '../../../../../build/contracts/ERC721Mintable.json'
import {Metadata} from "../../shared/domain/metadata";
import {getHarmonyContract} from "../domain/harmony-wallet";

export class ERC721HarmonyContract implements ERC721Contract {
    constructor(private readonly address: string) {

    }

    async getOwner(): Promise<string>{
        const contract = await getHarmonyContract(ABI.abi, this.address);
        return contract.methods.owner().call();
    }

    async getMetadata(): Promise<Metadata> {
        const contract = await getHarmonyContract(ABI.abi, this.address);
        return {
            name: await contract.methods.name().call(),
            symbol: await contract.methods.symbol().call(),
            baseURI: await contract.methods.baseURI().call()
        };
    }

    async mint(to: string, tokenId: number) {
        const contract = await getHarmonyContract(ABI.abi, this.address);
        return contract.methods.mint(to, tokenId).send({gas: 6721975, gasPrice: 20000000000});
    }
}
