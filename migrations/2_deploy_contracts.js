const ERC721Mintable = artifacts.require('./ERC721Mintable.sol');

module.exports = function(deployer) {
    deployer.deploy(ERC721Mintable)
}