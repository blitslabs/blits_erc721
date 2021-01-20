import { ExtensionInterface, HarmonyExtension } from "@harmony-js/core";
import { waitForInjected } from "../../shared/domain/time-functions";
import { ChainType } from "@harmony-js/utils";
import harmonyConfiguration from "./harmony-configuration";
import { Contract as HarmonyContract } from "@harmony-js/contract/dist/contract";
import { ContractOptions } from "@harmony-js/contract/src/utils/options";

let extension: HarmonyExtension;
let contracts: { [address: string]: HarmonyContract } = {};

export async function getHarmonyContract(
    abi: any[],
    address?: string,
    options?: ContractOptions
): Promise<HarmonyContract> {
    if (!contracts[address]) {
        contracts[address] = (
            await getHarmonyExtension()
        ).contracts.createContract(abi, address, options);
    }
    return contracts[address];
}

async function createExtension(): Promise<HarmonyExtension> {
    const harmony: ExtensionInterface = await waitForInjected("onewallet", 1);
    harmony.network.chain_url = harmonyConfiguration.url;
    return new HarmonyExtension(harmony, {
        chainType: ChainType.Harmony,
        chainId: harmonyConfiguration.net,
    });
}

export async function getHarmonyExtension(): Promise<HarmonyExtension> {
    if (extension) {
        return extension;
    }
    return createExtension();
}
