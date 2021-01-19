import {ERC721Contract} from "../domain/ERC721.contract";
import ABI from '../../../../build/contracts/ERC721Mintable.json'
import {Metadata} from "../domain/metadata";
import {Contract as HarmonyContract} from '@harmony-js/contract';
import {Harmony, HarmonyExtension} from "@harmony-js/core";
import {ChainType} from "@harmony-js/utils";
import harmonyConfiguration from "../../shared/infrastructure/harmony-configuration";

export class ERC721HarmonyContract implements ERC721Contract {
    private readonly contract: HarmonyContract;
    private readonly hmy: Harmony;
    private hmyExtension: HarmonyExtension;

    constructor(address: string) {
        this.hmy = new Harmony(harmonyConfiguration.url, {
            chainType: ChainType.Harmony,
            chainId: harmonyConfiguration.net
        });
        this.initHarmonyExtension();
        this.contract = this.hmyExtension.contracts.createContract(ABI.abi, address);
    }


    private initHarmonyExtension(){
        if ((window as any).onewallet) {
            (window as any).onewallet.network = {
                chain_id: 2,
                chain_url: "https://api.s0.b.hmny.io"
            };
            this.hmyExtension = new HarmonyExtension((window as any).onewallet, {
                chainType: ChainType.Harmony,
                chainId: harmonyConfiguration.net
            });
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
        const owner = "0x0Ce51bd4D72A45E3BF67c374F5Bdf75F741bEB29";
        await this.hmyExtension.wallet.getAccount()
        console.log(this.hmyExtension)
        const minted = await this.contract.methods.mint(to, tokenId).send({from: owner, gas: 6721975, gasPrice: 20000000000});
        console.log(minted)
    }
}
