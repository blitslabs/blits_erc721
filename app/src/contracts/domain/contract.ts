import {Metadata} from "./metadata";

export class Contract{
    private metadata: Metadata;

    constructor() {
        this.metadata = {
            name: 'AAA',
            symbol: 'BBB'
        }
    }

    public getMetadata(): Metadata{
        return this.metadata;
    }
}
