const ERC721Mintable = artifacts.require("ERC721Mintable");

contract("ERC721Mintable", (accounts) => {
  const account_one = accounts[0];
  let contract;

  describe("ERC721", () => {
    beforeEach(async () => {
      contract = await ERC721Mintable.new({ from: account_one });
    });

    it("should return metada", async () => {
      const name = await contract.name();
      const symbol = await contract.symbol();
      assert.equal("Blits NFT Collection", name, "Invalid name");
      assert.equal("Blits", symbol, "Invalid name");
    });
  });
});
