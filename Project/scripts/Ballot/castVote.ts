import { Contract, ethers } from "ethers";
import "dotenv/config";
import * as ballotJson from "../../artifacts/contracts/Ballot.sol/Ballot.json";
// eslint-disable-next-line node/no-missing-import
import { Ballot } from "../../typechain";
// eslint-disable-next-line node/no-missing-import
import { getSigner, checkBalance } from "../../helpers/utils"; utils from "../../helpers/utils";

async function main() {
  const signer = getSigner();
  if (!checkBalance(signer)) {
    return;
  }
  if (process.argv.length < 3) throw new Error("Ballot address missing");
  const ballotAddress = process.argv[2];
  if (process.argv.length < 4) throw new Error("Proposal number is missing");
  const proposalNumber = process.argv[3];
  console.log(
    `Attaching ballot contract interface to address ${ballotAddress}`
  );
  const ballotContract: Ballot = new Contract(
    ballotAddress,
    ballotJson.abi,
    signer
  ) as Ballot;
  const canVote =
    !(await ballotContract.voters(signer.address)).voted &&
    Number((await ballotContract.voters(signer.address)).weight) > 0;
  if (!canVote) throw new Error("Caller cannot vote!");
  const tx = await ballotContract.vote(proposalNumber);
  console.log("Awaiting confirmations");
  await tx.wait();
  console.log(`Transaction completed. Hash: ${tx.hash}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
