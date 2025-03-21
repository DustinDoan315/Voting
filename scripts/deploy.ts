import { ethers } from 'hardhat';

async function main() {
  const proposals = ["Proposal 1", "Proposal 2", "Proposal 3"];

  const Voting = await ethers.getContractFactory("Voting");
  const voting = await Voting.deploy(proposals);

  await voting.waitForDeployment();

  console.log("Voting contract deployed to:", await voting.getAddress());
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
