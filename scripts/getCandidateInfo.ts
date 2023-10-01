import { ethers, network } from "hardhat";
import {
  encryptDataField,
  decryptNodeResponse,
} from "@swisstronik/swisstronik.js";

//@ts-ignore
const sendShieldedQuery = async (provider, destination, data) => {
  const rpclink = network.config.url;
  const [encryptedData, usedEncryptedKey] = await encryptDataField(
    rpclink,
    data
  );
  const response = await provider.call({
    to: destination,
    data: encryptedData,
  });
  return await decryptNodeResponse(rpclink, response, usedEncryptedKey);
};

async function main() {
  const contractAddress = "0x187c16e7ae4FE322886B13672fD63284bD4B938e";
  const [signer] = await ethers.getSigners();
  const contractFactory = await ethers.getContractFactory("VotingSystem");
  const contract = contractFactory.attach(contractAddress);
  const functionName = "getCandidateInfo";
  const responseMessage = await sendShieldedQuery(
    signer.provider,
    contractAddress,
    contract.interface.encodeFunctionData(functionName, [0])
  );
  console.log(
    "Candidate Info:",
    contract.interface.decodeFunctionResult(functionName, responseMessage)[0],
    contract.interface.decodeFunctionResult(functionName, responseMessage)[1],
    contract.interface.decodeFunctionResult(functionName, responseMessage)[2],
  );
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
