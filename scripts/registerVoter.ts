import { ethers, network } from "hardhat";
import {
  encryptDataField,
  decryptNodeResponse,
} from "@swisstronik/swisstronik.js";

//@ts-ignore
const sendShieldedTransaction = async (signer, destination, data, value) => {
  const rpclink = network.config.url;
  const [encryptedData] = await encryptDataField(rpclink, data);
  return await signer.sendTransaction({
    from: signer.address,
    to: destination,
    data: encryptedData,
    value,
  });
};

async function main() {
  const contractAddress = "0x0CBe2d60f2CbE75BE117ffCAeEb453566FA8806B";
  const [signer] = await ethers.getSigners();
  const contractFactory = await ethers.getContractFactory("VotingSystem");
  const contract = contractFactory.attach(contractAddress);
  const registerVoterTx = await sendShieldedTransaction(
    signer,
    contractAddress,
    contract.interface.encodeFunctionData("registerVoter", [signer.address]),
    0
  );
  await registerVoterTx.wait();
  console.log("Transaction Receipt: ", registerVoterTx);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
