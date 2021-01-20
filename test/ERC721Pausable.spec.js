const ERC721Mintable = artifacts.require('ERC721Mintable')
//const truffleAssert = require('truffle-assertions');

contract('Pausable', (accounts) => {

    const account_one = accounts[0]

    describe('Pausable methods Test', () => {
        beforeEach(async () => {
            this.contract = await ERC721Pausable.new({ from: account_one });
            await this.contract.mint(account_one, 1, { from: account_one});
        })

        it('should update status', async () => {
            isPaused = false;
            status = isPaused;
            isPaused = await this.contract.updateStatus(status);
            assert.equal(isPaused, true, 'Must update status');
        })
    });
})