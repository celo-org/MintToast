// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
const hre = require("hardhat");

// TransparentUpgradeableProxy: 0x1Ae49b184BFBA721Cc49f7Ee4AF0960fD368d917

async function main() {
    let [deployer] = await ethers.getSigners();

    console.log(`Deployer: ${deployer.address}`);

    let BadgeV2 = await ethers.getContractFactory("BadgeV2");
    console.log("Upgrading Badge...");
    let badge = await upgrades.upgradeProxy(
        "0x1Ae49b184BFBA721Cc49f7Ee4AF0960fD368d917",
        BadgeV2
    );

    console.log(`Badge Upgraded!`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
