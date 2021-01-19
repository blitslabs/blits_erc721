import {ERC721Contract} from "../../shared/domain/ERC721.contract";
import ABI from '../../../../../build/contracts/ERC721Mintable.json'
import {Metadata} from "../../shared/domain/metadata";
import {Contract as HarmonyContract} from '@harmony-js/contract';
import {Harmony, HarmonyExtension} from "@harmony-js/core";
import {ChainType} from "@harmony-js/utils";
import harmonyConfiguration from "../../../shared/infrastructure/harmony-configuration";

export class ERC721HarmonyContract implements ERC721Contract {
    private readonly contract: HarmonyContract;
    private harmony: HarmonyExtension;

    constructor(address: string) {
        this.initHarmonyExtension();
        this.contract = this.harmony.contracts.createContract(ABI.abi, address);
    }


    private initHarmonyExtension(){
        if ((window as any).onewallet) {
            (window as any).onewallet.network = {
                chain_id: 2,
                chain_url: "https://api.s0.b.hmny.io"
            };
            this.harmony = new HarmonyExtension((window as any).onewallet, {
                chainType: ChainType.Harmony,
                chainId: harmonyConfiguration.net
            });
            this.harmony.wallet.getAccount()
        }
        else {
            throw new Error("Harmony not found")
        }
    }

    async getOwner(): Promise<string>{
        return this.contract.methods.owner().call();
    }

    async getMetadata(): Promise<Metadata> {
        return {
            name: await this.contract.methods.name().call(),
            symbol: await this.contract.methods.symbol().call(),
            baseURI: await this.contract.methods.baseURI().call()
        };
    }

    async mint(to: string, tokenId: number) {
        return await this.contract.methods.mint(to, tokenId).send({gas: 6721975, gasPrice: 20000000000});
    }
}
