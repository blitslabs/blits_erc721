import { Metadata } from "./metadata";
import {TokenURI} from "./token-uri";

export interface ERC721Contract {
    getMetadata(): Promise<Metadata>;
    getOwner(): Promise<string>;
    balanceOf(account: string): Promise<number>;
    totalSupply(): Promise<number>;
    getTokens(account: string): Promise<TokenURI[]>
    transfer(from: string, to: string, tokenId: number): Promise<any>;
    mint(to: string, tokenId: number): Promise<any>;
}
