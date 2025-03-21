// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract Voting {
    struct Proposal {
        string description;
        uint256 voteCount;
    }

    struct Voter {
        bool hasVoted;
        uint256 votedProposalId;
    }

    address public chairperson;
    mapping(address => Voter) public voters;
    Proposal[] public proposals;

    event ProposalCreated(uint256 proposalId, string description);
    event Voted(address voter, uint256 proposalId);

    constructor(string[] memory proposalDescriptions) {
        chairperson = msg.sender;

        for (uint i = 0; i < proposalDescriptions.length; i++) {
            proposals.push(
                Proposal({description: proposalDescriptions[i], voteCount: 0})
            );
        }
    }

    function vote(uint256 proposalId) external {
        Voter storage sender = voters[msg.sender];
        require(!sender.hasVoted, "Already voted.");
        require(proposalId < proposals.length, "Invalid proposal.");

        sender.hasVoted = true;
        sender.votedProposalId = proposalId;
        proposals[proposalId].voteCount++;

        emit Voted(msg.sender, proposalId);
    }

    function getProposalCount() external view returns (uint256) {
        return proposals.length;
    }

    function getProposal(
        uint256 proposalId
    ) external view returns (string memory, uint256) {
        require(proposalId < proposals.length, "Invalid proposal.");
        return (
            proposals[proposalId].description,
            proposals[proposalId].voteCount
        );
    }
}
