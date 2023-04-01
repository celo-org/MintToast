const { expect } = require("chai");
const { ethers } = require("hardhat");
const { utils, constants } = ethers;

const BASE_URI = "ipfs://";

async function deployBadge(defaultAdmin) {
    const Badge = await ethers.getContractFactory("Badge");
    let badge = await upgrades.deployProxy(Badge, [
        BASE_URI,
        defaultAdmin.address,
    ]);
    await badge.deployed();

    let proxyAdmin = await upgrades.erc1967.getAdminAddress(badge.address);
    let badgeImplementation = await upgrades.erc1967.getImplementationAddress(
        badge.address
    );

    return { badge, badgeImplementation, proxyAdmin };
}

describe("Badge Test", () => {
    let defaultAdmin, toastmaster, user1, user2;
    let TOASTMASTER_ROLE = utils.keccak256(
        utils.toUtf8Bytes("TOASTMASTER_ROLE")
    );

    beforeEach(async () => {
        [defaultAdmin, toastmaster, user1, user2] = await ethers.getSigners();
    });

    describe("Initialization", () => {
        let badge;

        beforeEach(async () => {
            ({ badge } = await deployBadge(defaultAdmin));
        });

        it('Base URI should be equal to ""', async () => {
            expect(await badge.uri(0)).to.be.eq("");
        });

        it("Deployer should have DEFAULT_ADMIN_ROLE", async () => {
            expect(
                await badge.hasRole(constants.HashZero, defaultAdmin.address)
            ).to.be.true;
        });

        it("Protocol should be in UNPAUSED state", async () => {
            expect(await badge.paused()).to.be.false;
        });

        it("TOASTMASTER_ROLE should be keccak of TOASTMASTER_ROLE", async () => {
            expect(
                await badge.connect(defaultAdmin).TOASTMASTER_ROLE()
            ).to.be.eq(TOASTMASTER_ROLE);
        });

        it("DEFAULT_ADMIN_ROLE should be bytes 0", async () => {
            expect(
                await badge.connect(defaultAdmin).DEFAULT_ADMIN_ROLE()
            ).to.be.eq(constants.HashZero);
        });
    });

    describe("Admin Interaction", () => {
        let badge, badgeImplementation, proxyAdmin;

        before(async () => {
            ({ badge, badgeImplementation, proxyAdmin } = await deployBadge(
                defaultAdmin
            ));
        });

        it("DEFAULT_ADMIN should be able to assign TOASTMASTER_ROLE", async () => {
            await badge
                .connect(defaultAdmin)
                .grantRole(TOASTMASTER_ROLE, toastmaster.address);
            expect(await badge.hasRole(TOASTMASTER_ROLE, toastmaster.address))
                .to.be.true;
        });

        it("DEFAULT_ADMIN_ROLE should be able to pause protocol", async () => {
            await badge.pause();
            expect(await badge.paused()).to.be.true;
        });
        it("DEFAULT_ADMIN_ROLE should be able to unpause protocol", async () => {
            await badge.unpause();
            expect(await badge.paused()).to.be.false;
        });
    });

    describe("Toast Masters Interaction", () => {});

    describe("User Interactions", () => {});

    describe("Performing Upgrades", () => {});
});
