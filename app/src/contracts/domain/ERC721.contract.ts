import {Metadata} from "./metadata";

export interface ERC721Contract{
    getMetadata(): Promise<Metadata>;
}
