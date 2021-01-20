const ERC721Mintable = artifacts.require('ERC721Mintable')

contract('ERC721Mintable', (accounts) => {

    const account_one = accounts[0];

    describe('ERC721Mintable Metadata methods test', () => {
        beforeEach(async () => {
            this.contract = await ERC721Mintable.new({ from: account_one });
            await this.contract.mint(account_one, 1, { from: account_one});
        })

        it('should support ERC721Metadata interface', async () => {
            const ERC721_METADATA_INTERFACE_ID = '0x5b5e139f';
            const isSupported = await this.contract.supportsInterface(ERC721_METADATA_INTERFACE_ID);
            assert.equal(isSupported, true, 'Must be supported');
        })

        it('should return the name of the token', async () => {
            const name = await this.contract.name();
            assert.equal('Blits NFT Collection', name, 'Invalid name');
        });

        it('should return the symbol of the token', async () => {
            const symbol = await this.contract.symbol();
            assert.equal('Blits', symbol, 'Invalid symbol');
        });

        it('should return the base URI of the token', async () => {
            const tokenBaseURI = await this.contract.baseURI();
            assert.equal('https://nfts.blits.net/one/', tokenBaseURI, 'Invalid URI');
        });

        it('should set the URI of the token', async () => {
            const tokenURI = await this.contract.tokenURI(1);
            assert.equal('https://nfts.blits.net/one/1', tokenURI, 'Invalid token URI')
        });
    })

})
