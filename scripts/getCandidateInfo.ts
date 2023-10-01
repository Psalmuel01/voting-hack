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
  const contractAddress = "0x0CBe2d60f2CbE75BE117ffCAeEb453566FA8806B";
  const [signer] = await ethers.getSigners();
  const contractFactory = await ethers.getContractFactory("VotingSystem");
  const contract = contractFactory.attach(contractAddress);
  const functionName = "getCandidateInfo";
  //  add at least a candidate before calling this function, remember index starts from zero
  const responseMessage = await sendShieldedQuery(
    signer.provider,
    contractAddress,
    contract.interface.encodeFunctionData(functionName, [0])
  );
  console.log(
    "Candidate Info:",
    contract.interface.decodeFunctionResult(functionName, responseMessage)[0],
    contract.interface.decodeFunctionResult(functionName, responseMessage)[1],
    contract.interface.decodeFunctionResult(functionName, responseMessage)[2]
  );
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
