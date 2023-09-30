// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract VotingSystem {
    address private contractOwner;

    struct Candidate {
        address candidateAddress;
        string name;
        uint256 voteCount;
    }

    mapping(address => bool) private registeredVoters;
    mapping(address => bool) private hasVoted;
    mapping(address => Candidate) private candidates; // Mapping of candidate addresses to Candidate structs
    address[] private candidateAddresses; // Array to store candidate addresses
    uint256 private totalVoteCount;
    uint256 private numberOfRegisteredVoters;

    event VoterRegistered(address indexed voter);
    event VoteCast(address indexed voter, address indexed candidate);

    modifier onlyOwner() {
        require(
            msg.sender == contractOwner,
            "Only the contract owner can call this function"
        );
        _;
    }

    modifier onlyRegisteredVoter() {
        require(
            registeredVoters[msg.sender],
            "Only registered voters can interact with this function"
        );
        _;
    }

    constructor() {
        contractOwner = msg.sender;
    }

    function registerVoter(address _voter) public onlyOwner {
        require(!registeredVoters[_voter], "Voter is already registered");
        registeredVoters[_voter] = true;
        numberOfRegisteredVoters++;

        emit VoterRegistered(_voter);
    }

    function addCandidate(
        address _candidateAddress,
        string memory _name
    ) public onlyOwner {
        require(_candidateAddress != address(0), "Invalid candidate address");
        require(bytes(_name).length > 0, "Candidate name cannot be empty");

        for (uint256 i = 0; i < candidateAddresses.length; i++) {
            require(
                keccak256(bytes(candidates[candidateAddresses[i]].name)) !=
                    keccak256(bytes(_name)),
                "Candidate with this name already exists"
            );
        }

        candidates[_candidateAddress] = Candidate(_candidateAddress, _name, 0); //Initialize vote count to zero
        candidateAddresses.push(_candidateAddress);
    }

    function getCandidateCount() public view returns (uint256) {
        return candidateAddresses.length;
    }

    function getCandidateInfo(
        uint256 index
    ) public view returns (address, string memory, uint256) {
        require(index < candidateAddresses.length, "Invalid index");
        address candidateAddress = candidateAddresses[index];
        return (
            candidateAddress,
            candidates[candidateAddress].name,
            candidates[candidateAddress].voteCount
        );
    }

    function vote(address _candidateAddress) public onlyRegisteredVoter {
        require(!hasVoted[msg.sender], "You have already voted");
        require(
            candidates[_candidateAddress].candidateAddress != address(0),
            "Invalid candidate address"
        );

        candidates[_candidateAddress].voteCount++; //Increment the vote count for the selected candidate
        hasVoted[msg.sender] = true;
        totalVoteCount++;

        emit VoteCast(msg.sender, _candidateAddress);
    }

    function getTotalVoteCount() public view returns (uint256) {
        return totalVoteCount;
    }

    function getRegisteredVoters() public view returns (uint256) {
        return numberOfRegisteredVoters;
    }
}
