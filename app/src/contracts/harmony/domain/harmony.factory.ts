import { Contract as HarmonyContract } from "@harmony-js/contract/dist/contract";
import {ContractOptions} from "@harmony-js/contract/src/utils/options";
import {Harmony, HarmonyExtension} from "@harmony-js/core";
import {HarmonyData} from "./harmony-data";

export abstract class HarmonyFactory{
    constructor(protected readonly harmonyConfig: HarmonyData) {
    }

    private contracts: { [address: string]: HarmonyContract } = {};
    public async getHarmonyContract(abi: any[], address?: string, options?: ContractOptions): Promise<HarmonyContract>{
        if (!this.contracts[address]) {
            this.contracts[address] = (
                await this.getHarmony()
            ).contracts.createContract(abi, address, options);
        }
        return this.contracts[address];
    }

    abstract getHarmony(): Promise<Harmony | HarmonyExtension>;
}
