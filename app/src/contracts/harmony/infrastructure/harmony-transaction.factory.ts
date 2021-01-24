import {HarmonyFactory} from "../domain/harmony.factory";
import { Harmony, HarmonyExtension} from "@harmony-js/core";
import {HarmonyData} from "../domain/harmony-data";
import {ChainType} from "@harmony-js/utils";

export class HarmonyTransactionFactory extends HarmonyFactory{
    private readonly harmony: Harmony;

    constructor(harmonyConfig: HarmonyData) {
        super(harmonyConfig);
        this.harmony = new Harmony(harmonyConfig.url, {
            chainType: ChainType.Harmony,
            chainId: this.harmonyConfig.net,
        })
    }

    async getHarmony(): Promise<Harmony> {
        return this.harmony;
    }


}
