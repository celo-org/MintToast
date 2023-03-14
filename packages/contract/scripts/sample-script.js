// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
const hre = require("hardhat");

// TransparentUpgradeableProxy: 0xF2758A600864737360409045A68f8Dd0926Fa276
// ProxyAdmin: 0x9b66d55D0a737E0f9d08F2d56436D9A6D512e4bf
// Badge: 0xE74a27F2DA19F6C727063607339E425fB6Fb7AAe

async function main() {
    let [deployer] = await ethers.getSigners();
    // Deployment
    // console.log(`Deployer: ${deployer.address}`);
    // let Badge = await ethers.getContractFactory("Badge");
    // let badge = await upgrades.deployProxy(Badge, [
    //     "https://www.google.com",
    //     deployer.address,
    // ]);
    // await badge.deployed();
    // console.log(`Badge deployed at: ${badge.address}`);
    // Assign Role
    const assignRoleTx = await deployer.sendTransaction({
        to: "0xF2758A600864737360409045A68f8Dd0926Fa276", // TransparentUpgradeableProxy
        data: "0x2f2ff15de3eed2db5971f140eb8f3ca9e5950853a1c26a7b2198b560d28148f332bd8a100000000000000000000000004f4c70c011b065dc45a7a13cb72e645c6a50dde3",
    });
    console.log(await assignRoleTx.wait());
    // Mint Badge
    const mintTx = await deployer.sendTransaction({
        to: "0xF2758A600864737360409045A68f8Dd0926Fa276", // TransparentUpgradeableProxy
        data: "0x156e29f60000000000000000000000004f4c70c011b065dc45a7a13cb72e645c6a50dde300000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000001",
    });
    console.log(await mintTx.wait());
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
