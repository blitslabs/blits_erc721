import {HarmonyData} from "../domain/harmony-data";
let network, net, url

switch(process.env.ONE_NETWORK){
    case 'local': {
        network = 0;
        net = 2;
        url = process.env.LOCAL_0_URL
        break;
    }
    case 'testnet': {
        network = 1;
        net = 2;
        url = process.env.TESTNET_0_URL
        break;
    }
    case 'mainnet': {
        network = 2;
        net = 1;
        url = process.env.MAINNET_0_URL
        break;
    }
}

const harmonyConfiguration: HarmonyData = {
    ENV: process.env.ONE_NETWORK as 'local' | 'testnet' | 'mainnet',
    network: network, // 0 local, 1 testnet, 2 mainnet
    net: net,
    url: url,
    filterMyAddress: true,
};

export default harmonyConfiguration;
