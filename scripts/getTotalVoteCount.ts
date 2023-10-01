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
  const functionName = "getTotalVoteCount";
  const responseMessage = await sendShieldedQuery(
    signer.provider,
    contractAddress,
    contract.interface.encodeFunctionData(functionName)
  );
  console.log(
    "Total vote count:",
    contract.interface.decodeFunctionResult(functionName, responseMessage)[0]
  );
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
