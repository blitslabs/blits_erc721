export class NotOwnerException extends Error{
    constructor() {
        super("Mint can only be executed by the contract owner");
    }
}
