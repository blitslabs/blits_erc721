const ERC721Mintable = artifacts.require('ERC721Mintable')

contract('Ownable', (accounts) => {
    const account_one = accounts[0]
    const account_two = accounts[1]

    /* Testing the owner function
     * TEST: We should get the same owner
     */
    describe('Match Owner', () => {

        beforeEach(async () => {
            this.contract = await ERC721Mintable.new({ from: account_one })
            await this.contract.mint(account_one, 1, { from: account_one})
        })

        it('should return the same Owner', async () => {
            const onwnable = await this.contract.owner()
            assert.equal(onwnable, 1, 'We should get the same Onwer.')
        })

    })

    /* Testing the onlyOwner modifier: 
     * It's triggered if called by any account other than the owner.
     * TEST: Only the owner should execute this
     */
    describe('have ownership properties', () => {
        beforeEach(async () => {
            this.contract = await ERC721Mintable.new({ from: account_one })
            await this.contract.mint(account_one, 1, { from: account_one})
        })

        it('should fail when minting and sender is not contract owner', async () => {
            let failed = false

            try {
                await this.contract.mint(account_one, 1, { from: account_two })
            } catch(e) {
                failed = true
            }

            assert.equal(failed, true, 'Minting did not fail when msg is not contract owner')
        })

        it('should return contract owner', async () => {
            const owner = await this.contract.owner()
            assert.equal(owner, account_one, 'Incorrect contract owner')
        })

        
    })

})