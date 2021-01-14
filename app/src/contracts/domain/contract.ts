import {Metadata} from "./metadata";

export interface Contract{
    getMetadata(): Promise<Metadata>;
}
