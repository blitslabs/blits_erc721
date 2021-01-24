import { ERC721Contract } from "../../shared/domain/ERC721.contract";
import ABI from "../../../../../build/contracts/ERC721Mintable.json";
import { Metadata } from "../../shared/domain/metadata";
import {HarmonyFactory} from "../domain/harmony.factory";
import {TokenURI} from "../../shared/domain/token-uri";

export class ERC721HarmonyContract implements ERC721Contract {
    constructor(private readonly harmonyFactory: HarmonyFactory, private readonly contractAddress: string) {}

    async getOwner(): Promise<string> {
        const contract = await this.harmonyFactory.getHarmonyContract(ABI.abi, this.contractAddress);
        return contract.methods.owner().call();
    }

    async getMetadata(): Promise<Metadata> {
        const contract = await this.harmonyFactory.getHarmonyContract(ABI.abi, this.contractAddress);
        return {
            name: await contract.methods.name().call(),
            symbol: await contract.methods.symbol().call(),
            baseURI: await contract.methods.baseURI().call(),
        };
    }

    async mint(to: string, tokenId: number) {
        if(!tokenId){
            tokenId = await this.totalSupply();
        }
        const contract = await this.harmonyFactory.getHarmonyContract(ABI.abi, this.contractAddress);
        return contract.methods
            .mint(to, tokenId)
            .send({ });
    }

    async balanceOf(account: string): Promise<number> {
        const contract = await this.harmonyFactory.getHarmonyContract(ABI.abi, this.contractAddress);
        return (await contract.methods.balanceOf(account).call()).toNumber();
    }

    async transfer(from: string, to: string, tokenId: number): Promise<any> {
        const contract = await this.harmonyFactory.getHarmonyContract(ABI.abi, this.contractAddress);
        return contract.methods
            .transferFrom(from, to, tokenId)
            .send({ });
    }

    async totalSupply(): Promise<number> {
        const contract = await this.harmonyFactory.getHarmonyContract(ABI.abi, this.contractAddress);
        return (await contract.methods.totalSupply().call()).toNumber();
    }

    async getTokens(account: string): Promise<TokenURI[]> {
        const balance = await this.balanceOf(account);
        const contract = await this.harmonyFactory.getHarmonyContract(ABI.abi, this.contractAddress);
        const baseURL = (await contract.methods.baseURI().call());
        const tokens: TokenURI[] = [];
        for (let i = 0; i < balance; i++){
            const id = (await contract.methods.tokenOfOwnerByIndex(account, i).call()).toNumber();
            tokens.push({
                id,
                url: `${baseURL}${id}`
            });
        }
        return tokens;
    }
}
