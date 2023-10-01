import { ethers } from "hardhat";

async function main() {
  const voting = await ethers.deployContract("VotingSystem", []);

  await voting.waitForDeployment();

  console.log(`Voting deployed to ${voting.target}`);
  //0x0CBe2d60f2CbE75BE117ffCAeEb453566FA8806B
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
