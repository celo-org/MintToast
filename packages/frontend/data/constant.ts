import { getEnvConfig } from "./utils/getEnvConfig";

export const NETWORK_MODE = process.env.NEXT_PUBLIC_NETWORK_MODE || "testnet";

export const TESTNET_SITE_URL = "https://minttoast-testnet.netlify.app";
export const MAINNET_SITE_URL = "http://minttoast.xyz";
export const LOCAL_SITE_URL = "http://localhost:3000/";

export const TESTNET_API_ENDPOINT = "-ehg6drsqxq-uc.a.run.app";
export const MAINNET_API_ENDPOINT = "-gf4tpo3gda-uc.a.run.app";
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

export const createToastQREndpoint = NETWORK_MODE == "local" ? "" : "https://createtoastqr" + API_ENDPOINT;
export const createToastSecretEndpoint = NETWORK_MODE == "local" ? "" : "https://createtoastsecret" + API_ENDPOINT;
export const getAllEventUUIDEndpoint = NETWORK_MODE == "local" ? "" : "https://getalleventuuid" + API_ENDPOINT;
export const getEventIdEndpoint = NETWORK_MODE == "local" ? "" : "https://geteventid" + API_ENDPOINT;
export const getOwnerEndpoint = NETWORK_MODE == "local" ? "" : "https://getowner" + API_ENDPOINT;
export const getSecretDataEndpoint = NETWORK_MODE == "local" ? "" : "https://getsecretdata" + API_ENDPOINT;
export const getUserCollectionEndpoint = NETWORK_MODE == "local" ? "" : "https://getusercollection" + API_ENDPOINT;
export const mintEndpoint = NETWORK_MODE == "local" ? "" : "https://mint" + API_ENDPOINT;
export const revokeTwitterEndpoint = NETWORK_MODE == "local" ? "" : "https://revoketwitter" + API_ENDPOINT;
export const registerTwitterEndpoint = NETWORK_MODE == "local" ? "" : "https://registertwitter" + API_ENDPOINT;
export const getAccountsFromTwitterHandleEndpoint = NETWORK_MODE == "local" ? "" : "https://getaccountsfromtwitterhandle" + API_ENDPOINT;
export const checkSecretEndpoint = NETWORK_MODE == "local" ? "" : "https://checksecret" + API_ENDPOINT;
export const getTwitterFromAddressEndpoint = NETWORK_MODE == "local" ? "" : "https://" + API_ENDPOINT;
export const checkWhitelistEndpoint = NETWORK_MODE == "local" ? "" : "https://checkwhitelist" + API_ENDPOINT;