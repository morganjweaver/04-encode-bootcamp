import { Contract, ethers } from "ethers";
import "dotenv/config";
import * as ballotJson from "../../artifacts/contracts/Ballot.sol/Ballot.json";
// eslint-disable-next-line node/no-missing-import
import { Ballot } from "../../typechain";
// eslint-disable-next-line node/no-missing-import
import { checkBalance, getSigner } from "../../helpers/utils";

async function main() {
  const signer = getSigner();

  const hasSufficientBalance = await checkBalance(signer);
  if (!hasSufficientBalance) {
    return;
  }
  if (process.argv.length < 3) throw new Error("Ballot address missing");
  const ballotAddress = process.argv[2];
  console.log(
    `Attaching ballot contract interface to address ${ballotAddress}`
  );
  const ballotContract: Ballot = new Contract(
    ballotAddress,
    ballotJson.abi,
    signer
  ) as Ballot;

  const winner = ethers.utils.parseBytes32String(
    await ballotContract.winnerName()
  );
  console.log(`The winning proposal is ${winner}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
