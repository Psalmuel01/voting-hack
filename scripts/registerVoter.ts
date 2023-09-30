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
  const contractAddress = "0x187c16e7ae4FE322886B13672fD63284bD4B938e";
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
