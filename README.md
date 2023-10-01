# Voting System Smart Contract

This Solidity smart contract implements a basic voting system. It allows the registration of voters and candidates, as well as the casting of votes for registered candidates.

## Contract Overview

The contract defines the `VotingSystem` contract, which contains functions for:

- Registering voters (`registerVoter`)
- Adding candidates (`addCandidate`)
- Retrieving candidate information (`getCandidateCount` and `getCandidateInfo`)
- Casting votes (`vote`)
- Retrieving voting statistics (`getTotalVoteCount` and `getRegisteredVoters`)

## Getting Started

### Prerequisites

- [Hardhat](https://hardhat.org/) for compiling, testing, and deploying smart contracts.
- [Swisstronik](https://swisstronik.gitbook.io/swisstronik-docs/build-on-swisstronik/contract-deployment-hardhat) for interacting with the deployed contract.

### Deployment

1. Install dependencies using npm:

   npm install

2. Compile the contract using Hardhat:

   npx hardhat compile

3. Deploy the compiled contract to an Ethereum-compatible blockchain using Hardhat, in this case, **Swisstronik**. Make sure to configure your Hardhat network settings appropriately.

   npx hardhat run scripts/deploy.js --network swisstronik

### Interacting with the Contract

After deployment, you can interact with the contract using Swisstronik:

1. **Registering Voters**: Use the `registerVoter` function to register voters.

2. **Adding Candidates**: Use the `addCandidate` function to add candidates.

3. **Casting Votes**: Voters can cast their votes using the `vote` function.

4. **Retrieving Candidate Information**: Use the `getCandidateCount` and `getCandidateInfo` functions to retrieve candidate information.

5. **Retrieving Voting Statistics**: Use the `getTotalVoteCount` and `getRegisteredVoters` functions to get voting statistics.

## Deployed Contract Address

The contract has been deployed to the following address on the Ethereum network: **0x187c16e7ae4FE322886B13672fD63284bD4B938e**
