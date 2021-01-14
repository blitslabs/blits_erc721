const ERC721Mintable = artifacts.require('ERC721Mintable')

contract('ERC721Mintable', (accounts) => {
    const account_one = accounts[0]
    const account_two = accounts[1]
//ERC721Enumerable ERC721Metadata ERC721Mintable
    describe('ERC721Mintable Enumerable methods test', () => {

        beforeEach(async () => {
            this.contract = await ERC721Mintable.new({ from: account_one });
            await this.contract.mint(account_one, 1, { from: account_one});
            await this.contract.mint(account_one, 2, { from: account_one });
            await this.contract.mint(account_one, 3, { from: account_one });
        });

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

        it('should return token uri', async () => {

        })

        it('should transfer token from one owner to another', async () => {

        })

    })
})
