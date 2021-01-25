import {ExtensionInterface, Harmony, HarmonyExtension} from "@harmony-js/core";
import {waitForInjected} from "../../shared/domain/time-functions";
import {ChainType} from "@harmony-js/utils";
import {HarmonyFactory} from "../domain/harmony.factory";

export class HarmonyExtensionFactory extends HarmonyFactory{
    private extension: HarmonyExtension;

    async getHarmony(): Promise<HarmonyExtension> {
        if (this.extension) {
            return this.extension;
        }
        return this.createExtension();
    }

    private async createExtension(): Promise<HarmonyExtension> {
        const harmony: ExtensionInterface = await waitForInjected("onewallet", 1);
        harmony.network.chain_url = this.harmonyConfig.url;
        return new HarmonyExtension(harmony, {
            chainType: ChainType.Harmony,
            chainId: this.harmonyConfig.net,
        });
    }
}
