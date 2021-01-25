export interface HarmonyData {
    ENV: "mainnet" | "testnet" | "local";
    network: 0 | 1 | 2; // 0 local, 1 testnet, 2 mainnet
    net: 1 | 2;
    url: string;
    filterMyAddress: boolean;
}
