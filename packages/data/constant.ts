import { getEnvConfig } from "utils/getEnvConfig";

export const NETWORK_MODE =
  process.env.NEXT_PUBLIC_LENS_NETWORK_MODE || "testnet";

export const TESTNET_API_ENDPOINT = "https://localhost:3001/";
export const MAINNET_API_ENDPOINT = "https://localhost:3001/";

export const API_ENDPOINT = getEnvConfig().apiEndpoint;
