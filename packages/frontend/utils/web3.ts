import {
  CONTRACT_ADDRESS,
  RPC_ENDPOINT,
  TOASTMASTER_PK,
} from "@/data/constant";
import { ethers } from "ethers";
import ABI from "../utils/contract-abi.json";

export const getProvider = () => {
  const provider = new ethers.providers.JsonRpcProvider(RPC_ENDPOINT);
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
