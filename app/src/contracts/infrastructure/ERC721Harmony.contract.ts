import {ERC721Contract} from "../domain/ERC721.contract";
import ABI from '../../../../build/contracts/ERC721Mintable.json'
import {Metadata} from "../domain/metadata";
import {Contract as HarmonyContract} from '@harmony-js/contract';
import {Harmony} from "@harmony-js/core";
import {ChainType} from "@harmony-js/utils";
import harmonyConfiguration from "../../shared/infrastructure/harmony-configuration";

export class ERC721HarmonyContract implements ERC721Contract {
    private readonly contract: HarmonyContract;

    constructor(address: string) {
        const hmmy = new Harmony(harmonyConfiguration.url, {
            chainType: ChainType.Harmony,
            chainId: harmonyConfiguration.net
        });
        console.log(harmonyConfiguration)
        console.log(hmmy)
        this.contract = hmmy.contracts.createContract(ABI.abi, address);
        console.log(this.contract)
    }

    async getMetadata(): Promise<Metadata> {
        return {
            name: await this.contract.methods.name().call(),
            symbol: await this.contract.methods.symbol().call(),
            baseURI: await this.contract.methods.baseURI().call()
        };
    }
}
