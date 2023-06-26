import { getEnvConfig } from "./utils/getEnvConfig";

export const NETWORK_MODE = process.env.NEXT_PUBLIC_NETWORK_MODE || "testnet";

export const TESTNET_SITE_URL = "https://minttoast-testnet.netlify.app";
export const MAINNET_SITE_URL = "http://minttoast.xyz";
export const LOCAL_SITE_URL = "http://localhost:3000/";

export const TESTNET_API_ENDPOINT = "http://157.245.126.16:7000/api";
export const MAINNET_API_ENDPOINT = "http://157.245.126.16:7000/api";
export const LOCAL_API_ENDPOINT = "http://localhost:8001/api";

export const TESTNET_CHAINID = 44787;
export const MAINNET_CHAINID = 42220;

export const LOCAL_FIREBASE_FUNCTION_ENDPOINT =
  "http://127.0.0.1:5001/mint-toast/us-central1";
export const TESTNET_FIREBASE_FUNCTION_ENDPOINT = "";

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

export const SITE_URL = getEnvConfig().siteUrl;
export const API_ENDPOINT = getEnvConfig().apiEndpoint;
export const RPC_ENDPOINT = getEnvConfig().rpcEndpoint;
export const TOASTMASTER_PK = getEnvConfig().toastMasterPK;
export const CONTRACT_ADDRESS = getEnvConfig().contractAddress;
export const GRAPHQL_API = getEnvConfig().graphqlApi;
export const NETWORK_NAME = getEnvConfig().networkName;
export const CHAINID = getEnvConfig().chainId;

export const IPFS_PROJECT_ID = process.env.IPFS_PROJECT_ID;
export const IPFS_API_KEY = process.env.IPFS_API_KEY;

export const WHITELISTED_ADDRESS = [
  "0xe1061b397cc3c381e95a411967e3f053a7c50e70",
  "0x9a15987f556cc9607008bec7cb5477f0375f4c3c",
  "0x04288bd27f440c479f239dcf8872e082d6731840",
  "0x3a3d91ea199f98a9931ca99fc2b13bd9276961fb",
];

export const CAPTCH_SITEKEY = process.env.NEXT_PUBLIC_CAPTCH_SITEKEY;
export const CAPTCH_SECRETKEY = process.env.CAPTCH_SECRETKEY;

export const createToastQREndpoint = API_ENDPOINT + "/create-toast-qr";
export const createToastSecretEndpoint = API_ENDPOINT + "/create-toast-secret";
export const getAllEventUUIDEndpoint = API_ENDPOINT + "/get-all-event-uuid";
export const getEventIdEndpoint = API_ENDPOINT + "/get-event-id";
export const getOwnerEndpoint = API_ENDPOINT + "/get-owner";
export const getSecretDataEndpoint = API_ENDPOINT + "/get-secret-data";
export const getUserCollectionEndpoint = API_ENDPOINT + "/get-user-collection";
export const mintEndpoint = API_ENDPOINT + "/mint";
export const registerTwitterEndpoint = API_ENDPOINT + "/register-twitter";
export const revokeTwitterEndpoint = API_ENDPOINT + "/revoke-twitter";
export const checkSecretEndpoint = API_ENDPOINT + "/check-secret";
export const getAccountsFromTwitterHandleEndpoint =
  API_ENDPOINT + "/get-accounts-from-twitter";
export const getTwitterFromAddressEndpoint =
  API_ENDPOINT + "/get-twitter-from-address";
