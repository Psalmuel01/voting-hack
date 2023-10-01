import { ethers } from "hardhat";

async function main() {
  const votingAddress = "0xF3b23b373dc8854cC2936F4Ab4b8E782011cCf87";
  const votingContract = await ethers.getContractAt(
    "VotingSystem",
    votingAddress
  );

  const [owner, voter1, voter2, voter3, candidate1, candidate2] =
    await ethers.getSigners();

  const addresses = [
    owner.address,
    voter1.address,
    voter2.address,
    voter3.address,
    candidate1.address,
    candidate2.address,
  ];

  // const voter1Signer = await ethers.getImpersonatedSigner(address);

  // const registerVoter = await votingContract.registerVoter(addresses[3]);
  // const addCandidate = await votingContract.addCandidate(addresses[5], "Bol");
  // const vote = await votingContract.connect(voter3).vote(addresses[5]);
  const candidateCount = await votingContract.getCandidateCount();
  const candidateInfo1 = await votingContract.getCandidateInfo(0);
  const candidateInfo2 = await votingContract.getCandidateInfo(2);
  const candidateInfo3 = await votingContract.getCandidateInfo(3);
  const totalVoteCount = await votingContract.getTotalVoteCount();
  const registeredVoters = await votingContract.getRegisteredVoters();

  console.log({
    candidateCount,
    candidateInfo1,
    candidateInfo2,
    candidateInfo3,
    totalVoteCount,
    registeredVoters,
  });
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
