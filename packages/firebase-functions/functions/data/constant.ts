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

export const CAPTCH_SITEKEY = process.env.NEXT_PUBLIC_CAPTCH_SITEKEY;
export const CAPTCH_SECRETKEY = process.env.CAPTCH_SECRETKEY;

export const TWITTER_API_KEY = process.env.TWITTER_API_KEY;
export const TWITTER_API_SECRET = process.env.TWITTER_API_SECRET;

export const DEK_PRIVATE_KEY = process.env.DEK_PRIVATE_KEY;
export const ISSUER_PRIVATE_KEY = process.env.ISSUER_PRIVATE_KEY;

export const FA_PROXY_ADDRESS = "0x70F9314aF173c246669cFb0EEe79F9Cfd9C34ee3";
export const ESCROW_PROXY_ADDRESS =
  "0xb07E10c5837c282209c6B9B3DE0eDBeF16319a37";
export const ODIS_PAYMENTS_PROXY_ADDRESS =
  "0x645170cdB6B5c1bc80847bb728dBa56C50a20a49";
export const ALFAJORES_CUSD_ADDRESS =
  "0x874069Fa1Eb16D44d622F2e0Ca25eeA172369bC1";
export const ACCOUNTS_PROXY_ADDRESS =
  "0xed7f51A34B4e71fbE69B3091FcF879cD14bD73A9";
