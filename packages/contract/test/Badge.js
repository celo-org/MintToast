const { expect } = require("chai");
const { ethers } = require("hardhat");
const {
    time,
    takeSnapshot,
} = require("@nomicfoundation/hardhat-network-helpers");
const { utils, constants } = ethers;

const BASE_URI = "ipfs://";
const TOASTMASTER_ROLE = utils.keccak256(utils.toUtf8Bytes("TOASTMASTER_ROLE"));
const DEFAULT_ADMIN_ROLE = constants.HashZero;
const NOW = Math.round(Date.now() / 1000);
const NEXT_CENTURY = Math.round(NOW + 24 * 60 * 60 * 365 * 100);

async function deployBadge(defaultAdmin) {
    const Badge = await ethers.getContractFactory("BadgeV3");
    let badge = await upgrades.deployProxy(Badge, [
        // BASE_URI,
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

    beforeEach(async () => {
        [defaultAdmin, toastmaster, user1, user2] = await ethers.getSigners();
    });

    describe("Initialization", () => {
        let badge;

        beforeEach(async () => {
            ({ badge } = await deployBadge(defaultAdmin));
        });

        it("initialize should not be callable", async () => {
            await expect(
                badge.initialize(defaultAdmin.address)
            ).to.be.revertedWith(
                "Initializable: contract is already initialized"
            );
            await expect(
                badge.connect(toastmaster).initialize(defaultAdmin.address)
            ).to.be.revertedWith(
                "Initializable: contract is already initialized"
            );
            await expect(
                badge.connect(user1).initialize(defaultAdmin.address)
            ).to.be.revertedWith(
                "Initializable: contract is already initialized"
            );
        });

        it('Base URI should be equal to ""', async () => {
            expect(await badge.uri(0)).to.be.eq("");
        });

        it("Deployer should have DEFAULT_ADMIN_ROLE", async () => {
            expect(
                await badge.hasRole(DEFAULT_ADMIN_ROLE, defaultAdmin.address)
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
            ).to.be.eq(DEFAULT_ADMIN_ROLE);
        });

        it("DEFAULT_ADMIN_ROLE should be role admin of TOASTMASTER_ROLE", async () => {
            expect(await badge.getRoleAdmin(TOASTMASTER_ROLE)).to.be.eq(
                DEFAULT_ADMIN_ROLE
            );
        });
    });

    describe("Admin Interaction", () => {
        let badge;

        before(async () => {
            ({ badge } = await deployBadge(defaultAdmin));
        });

        it("DEFAULT_ADMIN should be able to assign TOASTMASTER_ROLE", async () => {
            await expect(
                badge
                    .connect(defaultAdmin)
                    .grantRole(TOASTMASTER_ROLE, toastmaster.address)
            )
                .to.emit(badge, "RoleGranted")
                .withArgs(
                    TOASTMASTER_ROLE,
                    toastmaster.address,
                    defaultAdmin.address
                );
            expect(await badge.hasRole(TOASTMASTER_ROLE, toastmaster.address))
                .to.be.true;
        });

        it("DEFAULT_ADMIN should be able to revoke TOASTMASTER_ROLE", async () => {
            await expect(
                badge
                    .connect(defaultAdmin)
                    .revokeRole(TOASTMASTER_ROLE, toastmaster.address)
            )
                .to.emit(badge, "RoleRevoked")
                .withArgs(
                    TOASTMASTER_ROLE,
                    toastmaster.address,
                    defaultAdmin.address
                );
            expect(await badge.hasRole(TOASTMASTER_ROLE, toastmaster.address))
                .to.be.false;
        });

        it("DEFAULT_ADMIN_ROLE should be able to pause protocol", async () => {
            await expect(badge.pause())
                .to.emit(badge, "Paused")
                .withArgs(defaultAdmin.address);
            expect(await badge.paused()).to.be.true;
        });

        it("DEFAULT_ADMIN_ROLE should be able to unpause protocol", async () => {
            await expect(badge.unpause())
                .to.emit(badge, "Unpaused")
                .withArgs(defaultAdmin.address);
            expect(await badge.paused()).to.be.false;
        });

        it("DEFAULT_ADMIN_ROLE should not be able to create collection", async () => {
            await expect(
                badge.createSeries(10, "something", 0, NEXT_CENTURY)
            ).to.be.revertedWith(
                `AccessControl: account ${defaultAdmin.address.toLowerCase()} is missing role ${TOASTMASTER_ROLE}`
            );
        });

        it("DEFAULT_ADMIN_ROLE should be able to assign DEFAULT_ADMIN_ROLE", async () => {
            await expect(badge.grantRole(DEFAULT_ADMIN_ROLE, user1.address))
                .to.emit(badge, "RoleGranted")
                .withArgs(
                    DEFAULT_ADMIN_ROLE,
                    user1.address,
                    defaultAdmin.address
                );
            expect(await badge.hasRole(DEFAULT_ADMIN_ROLE, user1.address)).to.be
                .true;
        });

        it("DEFAULT_ADMIN_ROLE should be able to revoke DEFAULT_ADMIN_ROLE", async () => {
            await expect(badge.revokeRole(DEFAULT_ADMIN_ROLE, user1.address))
                .to.emit(badge, "RoleRevoked")
                .withArgs(
                    DEFAULT_ADMIN_ROLE,
                    user1.address,
                    defaultAdmin.address
                );
            expect(await badge.hasRole(DEFAULT_ADMIN_ROLE, user1.address)).to.be
                .false;
        });
    });

    describe("Toast Masters Interaction", () => {
        let badge;

        beforeEach(async () => {
            ({ badge } = await deployBadge(defaultAdmin));
            await expect(badge.grantRole(TOASTMASTER_ROLE, toastmaster.address))
                .to.emit(badge, "RoleGranted")
                .withArgs(
                    TOASTMASTER_ROLE,
                    toastmaster.address,
                    defaultAdmin.address
                );
            expect(await badge.hasRole(TOASTMASTER_ROLE, toastmaster.address))
                .to.be.true;
        });

        it("TOASTMASTER_ROLE should be able to Create Collection (Time Unbounded)", async () => {
            await expect(
                badge
                    .connect(toastmaster)
                    .createSeries(
                        10,
                        "QmRu2kD6ucZeKQBcgJXFbJpUmwV16AXfMKdHqEgFttD4LR",
                        0,
                        NEXT_CENTURY
                    )
            )
                .to.emit(badge, "SeriesCreated")
                .withArgs(toastmaster.address, 0, 10);
            expect(await badge.countOfSeries()).to.be.eq(1);
            expect(await badge.totalSupply(0)).to.be.eq(10);
            expect(await badge.currentSupply(0)).to.be.eq(0);
        });

        it("TOASTMASTER_ROLE should be able to Create Collection (Time Bounded)", async () => {
            await expect(
                badge
                    .connect(toastmaster)
                    .createSeries(
                        10,
                        "QmRu2kD6ucZeKQBcgJXFbJpUmwV16AXfMKdHqEgFttD4LR",
                        NOW,
                        NOW + 24 * 60 * 60
                    )
            )
                .to.emit(badge, "SeriesCreated")
                .withArgs(toastmaster.address, 0, 10);
            expect(await badge.countOfSeries()).to.be.eq(1);
            expect(await badge.totalSupply(0)).to.be.eq(10);
            expect(await badge.currentSupply(0)).to.be.eq(0);
        });

        it("TOASTMASTER_ROLE should be able to mint (Time Unbounded)", async () => {
            await badge
                .connect(toastmaster)
                .createSeries(
                    10,
                    "QmRu2kD6ucZeKQBcgJXFbJpUmwV16AXfMKdHqEgFttD4LR",
                    0,
                    NEXT_CENTURY
                );

            await expect(
                badge.connect(toastmaster).mint(toastmaster.address, 0)
            )
                .to.emit(badge, "TransferSingle")
                .withArgs(
                    toastmaster.address,
                    constants.AddressZero,
                    toastmaster.address,
                    0,
                    1
                );
            expect(await badge.currentSupply(0)).to.be.eq(1);
        });

        it("TOASTMASTER_ROLE should be able to mint (Time Bounded) before mintEnd and after mintStart", async () => {
            await badge
                .connect(toastmaster)
                .createSeries(
                    10,
                    "QmRu2kD6ucZeKQBcgJXFbJpUmwV16AXfMKdHqEgFttD4LR",
                    NOW,
                    NOW + 24 * 60 * 60
                );
            time.increaseTo(NOW + 12 * 60 * 60);
            await expect(
                badge.connect(toastmaster).mint(toastmaster.address, 0)
            )
                .to.emit(badge, "TransferSingle")
                .withArgs(
                    toastmaster.address,
                    constants.AddressZero,
                    toastmaster.address,
                    0,
                    1
                );
            expect(await badge.currentSupply(0)).to.be.eq(1);
        });

        it("TOASTMASTER_ROLE should not be able to mint more than once", async () => {
            await badge
                .connect(toastmaster)
                .createSeries(
                    10,
                    "QmRu2kD6ucZeKQBcgJXFbJpUmwV16AXfMKdHqEgFttD4LR",
                    NOW,
                    NOW + 24 * 60 * 60
                );
            await badge.connect(toastmaster).mint(toastmaster.address, 0);
            await expect(
                badge.connect(toastmaster).mint(toastmaster.address, 0)
            ).to.be.revertedWith("Only One NFT per Wallet");
            expect(await badge.currentSupply(0)).to.be.eq(1);
        });

        it("TOASTMASTER_ROLE should be able to batch mint", async () => {
            await badge
                .connect(toastmaster)
                .createSeries(
                    10,
                    "QmRu2kD6ucZeKQBcgJXFbJpUmwV16AXfMKdHqEgFttD4LR",
                    NOW,
                    NOW + 24 * 60 * 60
                );
            await expect(
                badge.connect(toastmaster).mintBatch(user1.address, [0], [1])
            )
                .to.emit(badge, "TransferBatch")
                .withArgs(
                    toastmaster.address,
                    constants.AddressZero,
                    user1.address,
                    [0],
                    [1]
                );
            expect(await badge.balanceOf(user1.address, 0)).to.be.eq(1);
            expect(await badge.currentSupply(0)).to.be.eq(1);
        });

        it("TOASTMASTER_ROLE should not be able to mint (Time Bounded) after mintEnd", async () => {
            await badge
                .connect(toastmaster)
                .createSeries(
                    10,
                    "QmRu2kD6ucZeKQBcgJXFbJpUmwV16AXfMKdHqEgFttD4LR",
                    NOW,
                    NOW + 24 * 60 * 60
                );

            await time.increaseTo(NOW + 25 * 60 * 60);
            await expect(
                badge.connect(toastmaster).mint(toastmaster.address, 0)
            ).to.be.revertedWith("Minting has ended");
            expect(await badge.currentSupply(0)).to.be.eq(0);
        });

        it("TOASTMASTER_ROLE should not able to assign TOASTMASTER_ROLE to others", async () => {
            await expect(
                badge
                    .connect(toastmaster)
                    .grantRole(TOASTMASTER_ROLE, user1.address)
            ).to.be.revertedWith(
                `AccessControl: account ${toastmaster.address.toLowerCase()} is missing role ${DEFAULT_ADMIN_ROLE}`
            );
        });

        it("TOASTMASTER_ROLE should not be able to revoke other toastmasters", async () => {
            await expect(
                badge
                    .connect(toastmaster)
                    .revokeRole(TOASTMASTER_ROLE, user1.address)
            ).to.be.revertedWith(
                `AccessControl: account ${toastmaster.address.toLowerCase()} is missing role ${DEFAULT_ADMIN_ROLE}`
            );
        });

        it("TOASTMASTER_ROLE should not be able to transfer badge to another user", async () => {
            await expect(
                badge
                    .connect(toastmaster)
                    .safeTransferFrom(
                        toastmaster.address,
                        user1.address,
                        0,
                        1,
                        "0x"
                    )
            ).to.be.revertedWithCustomError(badge, "NonTransferrableToken");
        });

        describe("Protocol Paused", () => {
            beforeEach(async () => {
                await expect(badge.pause())
                    .to.emit(badge, "Paused")
                    .withArgs(defaultAdmin.address);
                expect(await badge.paused()).to.be.true;
            });

            it("TOASTMASTER_ROLE should not be able to create collections when protocol is paused", async () => {
                await expect(
                    badge
                        .connect(toastmaster)
                        .createSeries(
                            10,
                            "QmRu2kD6ucZeKQBcgJXFbJpUmwV16AXfMKdHqEgFttD4LR",
                            0,
                            NEXT_CENTURY
                        )
                ).to.be.revertedWith("Pausable: paused");
            });

            it("TOASTMASTER_ROLE should not be able to mint when protocol is paused", async () => {
                await expect(
                    badge.connect(toastmaster).mint(toastmaster.address, 0)
                ).to.be.revertedWith("Pausable: paused");
            });

            it("TOASTMASTER_ROLE should not be able to batch mint protocol is paused", async () => {
                await expect(
                    badge
                        .connect(toastmaster)
                        .mintBatch(toastmaster.address, [0], [1])
                ).to.be.revertedWith("Pausable: paused");
            });

            it("TOASTMASTER_ROLE should not be able to unpause protocol", async () => {
                await expect(
                    badge.connect(toastmaster).unpause()
                ).to.be.revertedWith(
                    `AccessControl: account ${toastmaster.address.toLowerCase()} is missing role ${DEFAULT_ADMIN_ROLE}`
                );
            });

            it("TOASTMASTER_ROLE should not be able to transfer badge to another user when protocol is paused", async () => {
                await expect(
                    badge
                        .connect(toastmaster)
                        .safeTransferFrom(
                            toastmaster.address,
                            user1.address,
                            0,
                            1,
                            "0x"
                        )
                ).to.be.revertedWithCustomError(badge, "NonTransferrableToken");
            });
        });
    });

    describe("User Interactions", () => {
        before(async () => {
            ({ badge } = await deployBadge(defaultAdmin));
            await expect(badge.grantRole(TOASTMASTER_ROLE, toastmaster.address))
                .to.emit(badge, "RoleGranted")
                .withArgs(
                    TOASTMASTER_ROLE,
                    toastmaster.address,
                    defaultAdmin.address
                );
            expect(await badge.hasRole(TOASTMASTER_ROLE, toastmaster.address))
                .to.be.true;

            await expect(
                badge
                    .connect(toastmaster)
                    .createSeries(
                        10,
                        "QmRu2kD6ucZeKQBcgJXFbJpUmwV16AXfMKdHqEgFttD4LR",
                        0,
                        NEXT_CENTURY
                    )
            )
                .to.emit(badge, "SeriesCreated")
                .withArgs(toastmaster.address, 0, 10);
            expect(await badge.countOfSeries()).to.be.eq(1);
            expect(await badge.currentSupply(0)).to.be.eq(0);
            expect(await badge.totalSupply(0)).to.be.eq(10);
        });

        it("User should not be able to Create Collection", async () => {
            await expect(
                badge
                    .connect(user1)
                    .createSeries(
                        10,
                        "QmRu2kD6ucZeKQBcgJXFbJpUmwV16AXfMKdHqEgFttD4LR",
                        0,
                        NEXT_CENTURY
                    )
            ).to.be.revertedWith(
                `AccessControl: account ${user1.address.toLowerCase()} is missing role ${TOASTMASTER_ROLE}`
            );
            expect(await badge.countOfSeries()).to.be.eq(1);
            expect(await badge.totalSupply(0)).to.be.eq(10);
            expect(await badge.currentSupply(0)).to.be.eq(0);
        });

        it("User should not be able to mint", async () => {
            await expect(
                badge.connect(user1).mint(user1.address, 0)
            ).to.be.revertedWith(
                `AccessControl: account ${user1.address.toLowerCase()} is missing role ${TOASTMASTER_ROLE}`
            );
            expect(await badge.currentSupply(0)).to.be.eq(0);
            expect(await badge.balanceOf(user1.address, 0)).to.be.eq(0);
        });

        it("User should not be able to batch mint", async () => {
            await expect(
                badge.connect(user1).mintBatch(user1.address, [0], [1])
            ).to.be.revertedWith(
                `AccessControl: account ${user1.address.toLowerCase()} is missing role ${TOASTMASTER_ROLE}`
            );
            expect(await badge.balanceOf(user1.address, 0)).to.be.eq(0);
            expect(await badge.currentSupply(0)).to.be.eq(0);
        });

        it("User should not able to assign TOASTMASTER_ROLE to others", async () => {
            await expect(
                badge.connect(user1).grantRole(TOASTMASTER_ROLE, user1.address)
            ).to.be.revertedWith(
                `AccessControl: account ${user1.address.toLowerCase()} is missing role ${DEFAULT_ADMIN_ROLE}`
            );
        });

        it("User should not be able to revoke other toastmasters", async () => {
            await expect(
                badge.connect(user1).revokeRole(TOASTMASTER_ROLE, user1.address)
            ).to.be.revertedWith(
                `AccessControl: account ${user1.address.toLowerCase()} is missing role ${DEFAULT_ADMIN_ROLE}`
            );
        });

        it("User should not be able to transfer badge to another user", async () => {
            await expect(badge.connect(toastmaster).mint(user1.address, 0))
                .to.emit(badge, "TransferSingle")
                .withArgs(
                    toastmaster.address,
                    constants.AddressZero,
                    user1.address,
                    0,
                    1
                );
            expect(await badge.balanceOf(user1.address, 0)).to.be.eq(1);
            expect(await badge.currentSupply(0)).to.be.eq(1);
            await expect(
                badge
                    .connect(user1)
                    .safeTransferFrom(user1.address, user2.address, 0, 1, "0x")
            ).to.be.revertedWithCustomError(badge, "NonTransferrableToken");
        });

        describe("Protocol Paused", () => {
            before(async () => {
                await expect(badge.pause())
                    .to.emit(badge, "Paused")
                    .withArgs(defaultAdmin.address);
                expect(await badge.paused()).to.be.true;
            });

            it("User should not be able to create collections when protocol is paused", async () => {
                await expect(
                    badge
                        .connect(user1)
                        .createSeries(
                            10,
                            "QmRu2kD6ucZeKQBcgJXFbJpUmwV16AXfMKdHqEgFttD4LR",
                            0,
                            NEXT_CENTURY
                        )
                ).to.be.revertedWith("Pausable: paused");
            });

            it("User should not be able to mint when protocol is paused", async () => {
                await expect(
                    badge.connect(user1).mint(user1.address, 0)
                ).to.be.revertedWith("Pausable: paused");
            });

            it("User should not be able to batch mint protocol is paused", async () => {
                await expect(
                    badge.connect(user1).mintBatch(user1.address, [0], [1])
                ).to.be.revertedWith("Pausable: paused");
            });

            it("User should not be able to unpause protocol", async () => {
                await expect(badge.connect(user1).unpause()).to.be.revertedWith(
                    `AccessControl: account ${user1.address.toLowerCase()} is missing role ${DEFAULT_ADMIN_ROLE}`
                );
            });

            it("User should not be able to transfer badge to another user when protocol is paused", async () => {
                await expect(
                    badge
                        .connect(user1)
                        .safeTransferFrom(
                            user1.address,
                            user2.address,
                            0,
                            1,
                            "0x"
                        )
                ).to.be.revertedWithCustomError(badge, "NonTransferrableToken");
            });
        });
    });
});
