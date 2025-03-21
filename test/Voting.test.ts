import { ethers } from 'hardhat';
import { expect } from 'chai';
import { SignerWithAddress } from '@nomicfoundation/hardhat-ethers/signers';
import { Voting } from '../typechain-types';

describe("Voting", function () {
  let voting: Voting;
  let owner: SignerWithAddress;
  let addr1: SignerWithAddress;
  let addr2: SignerWithAddress;

  beforeEach(async function () {
    [owner, addr1, addr2] = await ethers.getSigners();

    const Voting = await ethers.getContractFactory("Voting");
    voting = await Voting.deploy(["Proposal 1", "Proposal 2"]);
  });

  describe("Deployment", function () {
    it("Should set the right chairperson", async function () {
      expect(await voting.chairperson()).to.equal(owner.address);
    });

    it("Should set the proposals correctly", async function () {
      const [description, voteCount] = await voting.getProposal(0);
      expect(description).to.equal("Proposal 1");
      expect(voteCount).to.equal(0);
    });
  });

  describe("Voting", function () {
    it("Should allow voting", async function () {
      await voting.connect(addr1).vote(0);
      const [, voteCount] = await voting.getProposal(0);
      expect(voteCount).to.equal(1);
    });

    it("Should not allow double voting", async function () {
      await voting.connect(addr1).vote(0);
      await expect(voting.connect(addr1).vote(1)).to.be.revertedWith(
        "Already voted."
      );
    });
  });
});
