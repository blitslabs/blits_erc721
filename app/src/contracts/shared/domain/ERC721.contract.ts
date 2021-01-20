import { Metadata } from "./metadata";

export interface ERC721Contract {
  getMetadata(): Promise<Metadata>;
  getOwner(): Promise<string>;
  mint(to: string, tokenId: number): Promise<any>;
}
