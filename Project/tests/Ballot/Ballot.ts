import { expect } from "chai";
import { ethers } from "hardhat";
// eslint-disable-next-line node/no-missing-import
import { Ballot } from "../../typechain";

const PROPOSALS = ["Proposal 1", "Proposal 2", "Proposal 3"];

function convertStringArrayToBytes32(array: string[]) {
  const bytes32Array = [];
  for (let index = 0; index < array.length; index++) {
    bytes32Array.push(ethers.utils.formatBytes32String(array[index]));
  }
  return bytes32Array;
}

async function giveRightToVote(ballotContract: Ballot, voterAddress: any) {
  const tx = await ballotContract.giveRightToVote(voterAddress);
  await tx.wait();
}

describe("Ballot", function () {
  let ballotContract: Ballot;
  let accounts: any[]; // deployer always accounts[0]

  beforeEach(async function () {
    accounts = await ethers.getSigners();
    const ballotFactory = await ethers.getContractFactory("Ballot");
    ballotContract = await ballotFactory.deploy(
      convertStringArrayToBytes32(PROPOSALS)
    );
    await ballotContract.deployed();
  });

  describe("when the contract is deployed", function () {
    it("has the provided proposals", async function () {
      for (let index = 0; index < PROPOSALS.length; index++) {
        const proposal = await ballotContract.proposals(index);
        expect(ethers.utils.parseBytes32String(proposal.name)).to.eq(
          PROPOSALS[index]
        );
      }
    });

    it("has zero votes for all proposals", async function () {
      for (let index = 0; index < PROPOSALS.length; index++) {
        const proposal = await ballotContract.proposals(index);
        expect(proposal.voteCount.toNumber()).to.eq(0);
      }
    });

    it("sets the deployer address as chairperson", async function () {
      const chairperson = await ballotContract.chairperson();
      expect(chairperson).to.eq(accounts[0].address);
    });

    it("sets the voting weight for the chairperson as 1", async function () {
      const chairpersonVoter = await ballotContract.voters(accounts[0].address);
      expect(chairpersonVoter.weight.toNumber()).to.eq(1);
    });
  });

  describe("when the chairperson interacts with the giveRightToVote function in the contract", function () {
    it("gives right to vote for another address", async function () {
      const voterAddress = accounts[1].address;
      const tx = await ballotContract.giveRightToVote(voterAddress);
      await tx.wait();
      const voter = await ballotContract.voters(voterAddress);
      expect(voter.weight.toNumber()).to.eq(1);
    });

    it("can not give right to vote for someone that has voted", async function () {
      const voterAddress = accounts[1].address;
      await giveRightToVote(ballotContract, voterAddress);
      await ballotContract.connect(accounts[1]).vote(0);
      await expect(
        giveRightToVote(ballotContract, voterAddress)
      ).to.be.revertedWith("The voter already voted.");
    });

    it("can not give right to vote for someone that already has voting rights", async function () {
      const voterAddress = accounts[1].address;
      await giveRightToVote(ballotContract, voterAddress);
      await expect(
        giveRightToVote(ballotContract, voterAddress)
      ).to.be.revertedWith("");
    });
  });

  describe("when the voter interact with the vote function in the contract", function () {
    it("voter with voting rights can vote", async function () {
      const voterAddress = accounts[1].address;
      const tx1 = await ballotContract.giveRightToVote(voterAddress);
      await tx1.wait();
      const tx2 = await ballotContract.connect(accounts[1]).vote(2);
      await tx2.wait();

      const voter = await ballotContract.voters(voterAddress);
      expect(voter.vote.toNumber()).to.eq(2);
      // eslint-disable-next-line no-unused-expressions
      expect(voter.voted).to.be.true;
    });
  });

  describe("when the voter interacts with the delegate function in the contract", function () {
    it("succeeds appropriately on Happy Path", async function () {
      const voterAddress = accounts[0].address;
      const delegateAddress = accounts[1].address;
      console.log(`ADDRESS?:  ${delegateAddress}`);
      // const tx1 = await ballotContract.giveRightToVote(voterAddress);
      // await tx1.wait(); // NOT NEEDED BC SENDER IS CHAIRPORSON
      const tx2 = await ballotContract.giveRightToVote(delegateAddress);
      await tx2.wait();
      const tx3 = await ballotContract.delegate(delegateAddress);
      await tx3.wait();

      const voter = await ballotContract.voters(voterAddress);
      console.log(`VOTER:    ${voter.delegate}`);
      console.log(`VOTER ${voterAddress} DELEGATES TO ${voter.delegate}`);
      expect(voter.delegate).to.equal(delegateAddress);
    });
    it("errors appropriately when sender assigns to self", async function () {
      throw new Error("Not implemented");
    });

    it("errors appropriately when sender has no voting rights", async function () {
      throw new Error("Not implemented");
    });

    it("errors appropriately for a target address that cannot actually vote", async function () {
      throw new Error("Not implemented");
    });
  });

  describe("when the an attacker interact with the giveRightToVote function in the contract", function () {
    // TODO
    it("is not implemented", async function () {
      throw new Error("Not implemented");
    });
  });

  describe("when the an attacker interact with the vote function in the contract", function () {
    it("attacker with no voting right cannot vote ", async function () {
      const attacker = accounts[1];
      await expect(ballotContract.connect(attacker).vote(2)).to.be.revertedWith(
        "Has no right to vote"
      );
    });

    it("attacker cannot vote twice", async function () {
      const attacker = accounts[1];
      const tx1 = await ballotContract.giveRightToVote(attacker.address);
      await tx1.wait();
      const tx2 = await ballotContract.connect(attacker).vote(2);
      await tx2.wait();
      await expect(ballotContract.connect(attacker).vote(2)).to.be.revertedWith(
        "Already voted."
      );
    });

    // ************************************************************
    // ************ Don't know how to expect this case ************
    // ************************************************************
    // it("attacker cannot vote on something that is not in proposals", async function () {
    //   const attacker = accounts[1];
    //   const falseVote = PROPOSALS.length;
    //   const tx1 = await ballotContract.giveRightToVote(attacker.address);
    //   await tx1.wait();
    //   expect(
    //     await ballotContract.connect(attacker).vote(falseVote)
    //   ).to.be.revertedWith("");
    // });
  });

  describe("when the an attacker interact with the delegate function in the contract", function () {
    // TODO
    it("is not implemented", async function () {
      throw new Error("Not implemented");
    });
  });

  describe("when someone interact with the winningProposal function before any votes are cast", function () {
    // TODO
    it("is not implemented", async function () {
      throw new Error("Not implemented");
    });
  });

  describe("when someone interact with the winningProposal function after one vote is cast for the first proposal", function () {
    // TODO
    it("is not implemented", async function () {
      throw new Error("Not implemented");
    });
  });

  describe("when someone interact with the winnerName function before any votes are cast", function () {
    // TODO
    it("is not implemented", async function () {
      throw new Error("Not implemented");
    });
  });

  describe("when someone interact with the winnerName function after one vote is cast for the first proposal", function () {
    // TODO
    it("is not implemented", async function () {
      throw new Error("Not implemented");
    });
  });

  describe("when someone interact with the winningProposal function and winnerName after 5 random votes are cast for the proposals", function () {
    // TODO
    it("is not implemented", async function () {
      throw new Error("Not implemented");
    });
  });
});
