const ERC721Mintable = artifacts.require('ERC721Mintable')

contract('ERC721Mintable', (accounts) => {
    const account_one = accounts[0]

    describe('ERC721Mintable Enumerable methods test', () => {

        beforeEach(async () => {
            this.contract = await ERC721Mintable.new({ from: account_one });
            await this.contract.mint(account_one, 1, { from: account_one});
            await this.contract.mint(account_one, 2, { from: account_one });
            await this.contract.mint(account_one, 3, { from: account_one });
        });

        it('should support ERC721Enumerable interface', async () => {
            const ERC721_ENUMERABLE_INTERFACE_ID = '0x780e9d63';
            const isSupported = await this.contract.supportsInterface(ERC721_ENUMERABLE_INTERFACE_ID);
            assert.equal(isSupported, true, 'Must be supported');
        })

        it('should return the total amount of tokens stored by the contract', async () => {
            const totalSupply = await this.contract.totalSupply();
            assert.equal(totalSupply, 3, 'Invalid total supply');
        })

        it('should return the token ID at the given index of the specified owner', async () => {
            const owner = account_one;
            let index = 0;
            let tokenId = await this.contract.tokenOfOwnerByIndex(owner, index);
            assert.equal(tokenId, 1, 'Invalid tokenId');
            index = 1;
            tokenId = await this.contract.tokenOfOwnerByIndex(owner, index);
            assert.equal(tokenId, 2, 'Invalid tokenId');
            index = 2;
            tokenId = await this.contract.tokenOfOwnerByIndex(owner, index);
            assert.equal(tokenId, 3, 'Invalid tokenId');
        })

        it('should return the token ID at the given index of all tokens in this contract', async () => {
            let index = 0;
            let tokenId = await this.contract.tokenByIndex(index);
            assert.equal(tokenId, 1, 'Invalid tokenId');
        })
    })
})
