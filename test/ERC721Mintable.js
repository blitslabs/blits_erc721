const ERC721Mintable = artifacts.require('ERC721Mintable')
const truffleAssert = require('truffle-assertions');

contract('ERC721Mintable', (accounts) => {
    const account_one = accounts[0]
    const account_two = accounts[1]

    describe('match ERC721 spec', () => {

        beforeEach(async () => {
            this.contract = await ERC721Mintable.new({ from: account_one })
            await this.contract.mint(account_one, 1, { from: account_one})
            await this.contract.mint(account_one, 2, { from: account_one })
            await this.contract.mint(account_one, 3, { from: account_one })
            
        })

        it('should return the total supply', async () => {
            const totalSupply = await this.contract.totalSupply()
            assert.equal(totalSupply, 3, 'Invalid total supply')
        })

        it('should get token balance', async () => {
            const balance = await this.contract.balanceOf(account_one)
            assert.equal(balance, 3, 'Invalid balance')
        })

        it('should return token uri', async () => {
            const tokenURI = 'https://nfts.blits.net/one/1'
            const resURI = await this.contract.tokenURI(1)
            assert.equal(resURI, tokenURI, 'Invalid token URI')
        })

        it('should transfer token from one owner to another', async () => {
            await this.contract.transferFrom(account_one, account_two, 1)
            const account_two_balance = await this.contract.balanceOf(account_two)
            assert.equal(account_two_balance.toString(), '1', 'Invalid token transfer')
        })

    })


    // Moving this test to ERC721Ownable.spec.js
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