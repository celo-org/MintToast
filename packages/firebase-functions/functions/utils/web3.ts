import { ethers, providers } from "ethers";
import {
  CONTRACT_ADDRESS,
  RPC_ENDPOINT,
  TOASTMASTER_PK,
} from "../data/constant";
import * as ABI from "./contract-abi.json";

export const getProvider = () => {
  const provider = new providers.JsonRpcProvider(RPC_ENDPOINT);
  return provider;
};

export const getWeb3Client = () => {
  const provider = getProvider();
  const wallet = new ethers.Wallet(TOASTMASTER_PK, provider);
  return wallet;
};

export const getContract = () => {
  const wallet = getWeb3Client(); // also called signer
  const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, wallet);
  return contract;
};

export const verifySignature = async (
  message: string,
  signature: string,
  address: string
): Promise<boolean> => {
  const recoveredAddress = ethers.utils.verifyMessage(message, signature);
  if (recoveredAddress !== address) {
    return false;
  }
  return true;
};
