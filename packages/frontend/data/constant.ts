import { getEnvConfig } from "./utils/getEnvConfig";

export const NETWORK_MODE = process.env.NEXT_PUBLIC_NETWORK_MODE || "testnet";

export const TESTNET_API_ENDPOINT = "https://minttoast-testnet.netlify.app";
export const MAINNET_API_ENDPOINT = "http://minttoast.xyz";
export const LOCAL_API_ENDPOINT = "http://localhost:3000";

export const TESTNET_RPC_ENDPOINT = "https://alfajores-forno.celo-testnet.org";
export const MAINNET_RPC_ENDPOINT = "https://forno.celo.org";

export const TESTNET_TOASTMASTER_PK = process.env.TESTNET_TOASTMASTER_PK ?? "";
export const MAINNET_TOASTMASTER_PK = process.env.MAINNET_TOASTMASTER_PK ?? "";

export const WEBSITE_URL = "https://minttoast.xyz";

export const TESTNET_GRAPHQL_API =
  "https://api.studio.thegraph.com/query/44345/minttoast-testnet/v0.1.0";

export const MAINNET_GRAPHQL_API =
  "https://api.studio.thegraph.com/query/44345/minttoast/v0.1.0";

export const TESTNET_CONTRACT_ADDRESS =
  "0x36Eef317F736FC5d7D0CAAe80a1bD7aD1D93B874";
export const MAINNET_CONTRACT_ADDRESS =
  "0x6145602B5AA5646f54cd551097C74A189839D326";

export const API_ENDPOINT = getEnvConfig().apiEndpoint;
export const RPC_ENDPOINT = getEnvConfig().rpcEndpoint;
export const TOASTMASTER_PK = getEnvConfig().toastMasterPK;
export const CONTRACT_ADDRESS = getEnvConfig().contractAddress;
export const GRAPHQL_API = getEnvConfig().graphqlApi;

export const IPFS_PROJECT_ID = process.env.IPFS_PROJECT_ID;
export const IPFS_API_KEY = process.env.IPFS_API_KEY;

export const WHITELISTED_ADDRESS = [
  "0xE1061b397cC3C381E95a411967e3F053A7c50E70",
  "0x9A15987F556cC9607008bec7cb5477f0375F4C3c",
];

export const CAPTCH_SITEKEY = process.env.NEXT_PUBLIC_CAPTCH_SITEKEY;
export const CAPTCH_SECRETKEY = process.env.CAPTCH_SECRETKEY;
