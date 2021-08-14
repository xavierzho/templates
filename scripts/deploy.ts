// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
// const hre = require("hardhat");

//@ts-ignore
import {ethers, run} from "hardhat";
import fs from "fs";

interface abiFile {
    contractName: string
    address: string
    abi: Array<any>

}

async function main() {
    // Hardhat always runs the compile task when running scripts with its command
    // line interface.
    //
    // If this script is run directly using `node` you may want to call compile
    // manually to make sure everything is compiled
    // await run('compile');
    const [deployer] = await ethers.getSigners();
    console.log(`deploying contracts with the account:${deployer.address}`)
    // We get the contract to deploy
    const Greeter = await ethers.getContractFactory("Greeter");
    const greeter = await Greeter.deploy("Hello, Hardhat!");

    await greeter.deployed();
    // const setTx = await greeter.setGreeting("Halo ,moda!")
    // console.log(await setTx.wait())
    const data: abiFile = {
        address: greeter.address,
        contractName: greeter.name,
        abi: JSON.parse(greeter.interface.format("json").toString())
    }
    fs.writeFileSync("abis/greeter.json", JSON.stringify(data))
    // console.log("Greeter deployed Transaction:", greeter.deployTransaction);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
