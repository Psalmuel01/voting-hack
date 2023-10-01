import { ethers } from "hardhat";

async function main() {
  const voting = await ethers.deployContract("VotingSystem", []);

  await voting.waitForDeployment();

  console.log(`Voting deployed to ${voting.target}`);
  //0x187c16e7ae4FE322886B13672fD63284bD4B938e
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
