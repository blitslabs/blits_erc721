# Blits NFT Collection

# Install
This respository contains Smart Contract code in Solidity (using Truffle), tests (also using Truffle).
To install, download or clone the repo, then:
```
npm install
truffle compile
```

# Tests
To run truffle tests:
```
npm install
truffle test

# Deploy
To deploy the contracts
```
truffle compile
truffle migrate --network rinkeby --reset
truffle migrate --network one --reset
```

# .env file
```
ETH_CHAIN_ID='4'
ETH_CHAIN_NAME='rinkeby'
ETH_PUBLIC_KEY='<ETH_PUBLIC_KEY>'
ETH_PRIVATE_KEY='<ETH_PRIVATE_KEY>'
HTTP_PROVIDER='<ETH_HTTP_PROVIDER>'
CONTRACT_ADDRESS='<ERC721_CONTRACT_ADDRESS>'

ONE_NETWORK='mainnet'
HARMONY_PROVIDER='<ONE_HTTP_PROVIDER>'
HARMONY_CHECKSUM_ADDRESS='<HARMONY_PUBLIC_KEY_CHECKSUM>'
HARMONY_PRIVATE_KEY='<HARMONY_PRIVATE_KEY>'
HARMONY_MNEMONIC='<HARMONY_MNEMONIC>'
HARMONY_CONTRACT='<ERC721_CONTRACT_ADDRESS_HARMONY>'
```

# Mint Tokens
To mint new tokens create a .env file with the details described above. Then, modify the `tokenId` variable in `scripts/mint.js` or `scripts/mint_one.js` with the corresponding ID you want to use. Finally, run the following command:

`node scripts/mint.js`
