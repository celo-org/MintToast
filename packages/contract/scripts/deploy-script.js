// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
const hre = require("hardhat");

// TransparentUpgradeableProxy: 0x1Ae49b184BFBA721Cc49f7Ee4AF0960fD368d917
// TransparentUpgradeableProxy (testnet): 0x7b3F9c26117e38881Ccf647c644891F16b311Dd3

async function main() {
    let [deployer] = await ethers.getSigners();

    console.log(`Deployer: ${deployer.address}`);

    let Badge = await ethers.getContractFactory("Badge");
    let badge = await upgrades.deployProxy(Badge, [
        "ipfs://",
        deployer.address,
    ]);

    await badge.deployed();
    console.log(`Badge deployed at: ${badge.address}`);

    // Assign Role
    await badge.grantRole(badge.TOASTMASTER_ROLE(), deployer.address);

    // Create Collection
    // await badge.createCollection(0, 1, "23849u2384bjb");

    // const createCollectionTx = await deployer.sendTransaction({
    //     to: badge.address, // TransparentUpgradeableProxy
    //     data: "0x0175c0f70000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000a0000000000000000000000000000000000000000000000000000000000000060000000000000000000000000000000000000000000000000000000000000000f627133323839667564666e776665770000000000000000000000000000000000",
    // });

    // console.log(await createCollectionTx.wait());
    // await badge.mint(deployer.address, 0, 2);

    // const mintTx = await deployer.sendTransaction({
    //     to: badge.address,
    //     data: "0x156e29f6000000000000000000000000f2758a600864737360409045a68f8dd0926fa27600000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000001",
    // });

    // console.log(await mintTx.wait());

    // console.log(await badge.uri(0));
    // console.log(await badge.balanceOf(deployer.address, 0));
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
