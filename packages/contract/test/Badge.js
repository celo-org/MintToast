const { expect } = require("chai");
const { ethers } = require("hardhat");
const { loadFixture } = require("@nomicfoundation/hardhat-network-helpers");

describe("Badge Test", () => {
    let deployer, user1, user2;
    async function deployBadge() {
        [deployer, user1, user2] = await ethers.getSigners();
        const Badge = await ethers.getContractFactory("Badge");
        let badge = await upgrades.deployProxy(Badge, [
            "ipfs://",
            deployer.address,
        ]);
        await badge.deployed();

        return { badge };
    }

    it("Should be able to create collection", async () => {
        let { badge } = await loadFixture(deployBadge);

        await badge.grantRole(await badge.TOASTMASTER_ROLE(), deployer.address);

        await badge.createCollection(1, "23849u2384bjb");
        expect(await badge.collections(), 1);
        await badge.mint(deployer.address, 0);
        expect(await badge.balanceOf(deployer.address, 0), 1);
    });

    it("Should be able to mint", async () => {
        let { badge } = await loadFixture(deployBadge);

        await badge.grantRole(await badge.TOASTMASTER_ROLE(), deployer.address);

        await badge.createCollection(2, "23849u2384bjb");
        expect(await badge.collections()).to.be.eq(1);

        await badge.mint(user1.address, 0);
        await badge.mint(deployer.address, 0);

        expect(await badge.balanceOf(user1.address, 0)).to.be.eq(1);
        expect(await badge.balanceOf(deployer.address, 0)).to.be.eq(1);
    });
});
