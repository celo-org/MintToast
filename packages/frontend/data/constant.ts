import { getEnvConfig } from "./utils/getEnvConfig";

export const NETWORK_MODE =
  process.env.NEXT_PUBLIC_LENS_NETWORK_MODE || "testnet";

export const TESTNET_API_ENDPOINT = "https://localhost:3001/";
export const MAINNET_API_ENDPOINT = "https://localhost:3001/";

export const TESTNET_RPC_ENDPOINT = "https://alfajores-forno.celo-testnet.org";
export const MAINNET_RPC_ENDPOINT = "https://forno.celo.org";

export const TESTNET_TOASTMASTER_PK = process.env.TESTNET_TOASTMASTER_PK ?? "";
export const MAINNET_TOASTMASTER_PK = process.env.MAINNET_TOASTMASTER_PK ?? "";

export const WEBSITE_URL = "https://mint-toast.netlify.app";

export const TESTNET_CONTRACT_ADDRESS =
  "0xE5316457883f99539118dC77fEC28DCd99f9Ae08";
export const MAINNET_CONTRACT_ADDRESS = "";

export const API_ENDPOINT = getEnvConfig().apiEndpoint;
export const RPC_ENDPOINT = getEnvConfig().rpcEndpoint;
export const TOASTMASTER_PK = getEnvConfig().toastMasterPK;
export const CONTRACT_ADDRESS = getEnvConfig().contractAddress;
