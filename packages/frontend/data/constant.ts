import { getEnvConfig } from "./utils/getEnvConfig";

export const NETWORK_MODE = process.env.NEXT_PUBLIC_NETWORK_MODE || "testnet";

export const TESTNET_API_ENDPOINT = "https://localhost:3001/";
export const MAINNET_API_ENDPOINT = "https://localhost:3001/";

export const TESTNET_RPC_ENDPOINT = "https://alfajores-forno.celo-testnet.org";
export const MAINNET_RPC_ENDPOINT = "https://forno.celo.org";

export const TESTNET_TOASTMASTER_PK = process.env.TESTNET_TOASTMASTER_PK ?? "";
export const MAINNET_TOASTMASTER_PK = process.env.MAINNET_TOASTMASTER_PK ?? "";

export const WEBSITE_URL = "https://mint-toast.netlify.app";

export const TESTNET_GRAPHQL_API =
  "https://api.studio.thegraph.com/query/44292/mint-toast/v0.0.2";

export const MAINNET_GRAPHQL_API =
  "https://api.studio.thegraph.com/query/44345/minttoast/v0.0.4";

export const TESTNET_CONTRACT_ADDRESS =
  "0xE5316457883f99539118dC77fEC28DCd99f9Ae08";
export const MAINNET_CONTRACT_ADDRESS =
  "0x2fe99fa6d6D94eBcA1A9E61Cd812A189D4Bb6ADA";

export const API_ENDPOINT = getEnvConfig().apiEndpoint;
export const RPC_ENDPOINT = getEnvConfig().rpcEndpoint;
export const TOASTMASTER_PK = getEnvConfig().toastMasterPK;
export const CONTRACT_ADDRESS = getEnvConfig().contractAddress;
export const GRAPHQL_API = getEnvConfig().graphqlApi;

export const IPFS_PROJECT_ID = process.env.IPFS_PROJECT_ID;
export const IPFS_API_KEY = process.env.IPFS_API_KEY;
