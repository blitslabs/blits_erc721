const ERC721Mintable = artifacts.require('ERC721Mintable')
//const truffleAssert = require('truffle-assertions');

contract('ERC165', (accounts) => {
    const account_one = accounts[0];

    describe('Should support ERC165 interface', () => {
        
        beforeEach(async () => {
            this.contract = await ERC721Mintable.new({ from: account_one })
            await this.contract.mint(account_one, 1, { from: account_one})
        });

        it("should support ERC721ERC165 interface", async () => {
            const ERC721_ENUMERABLE_INTERFACE_ID = "0x80ac58cd";
            const isSupported = await this.contract.supportsInterface(
                ERC721_ENUMERABLE_INTERFACE_ID
            );
            assert.equal(isSupported, true, "Must be supported");
        });

    }) 

})