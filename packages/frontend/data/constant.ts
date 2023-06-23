import { getEnvConfig } from "./utils/getEnvConfig";

export const NETWORK_MODE = process.env.NEXT_PUBLIC_NETWORK_MODE || "testnet";

export const TESTNET_API_ENDPOINT = "https://minttoast-testnet.netlify.app";
export const MAINNET_API_ENDPOINT = "http://minttoast.xyz";
export const LOCAL_API_ENDPOINT = "http://localhost:3000";

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
  "0x04288bD27F440C479f239DCf8872e082D6731840",
  "0x3a3d91ea199f98a9931ca99fc2b13bd9276961fb",
];

export const CAPTCH_SITEKEY = process.env.NEXT_PUBLIC_CAPTCH_SITEKEY;
export const CAPTCH_SECRETKEY = process.env.CAPTCH_SECRETKEY;

export const createToastQREndpointMainnet =
  "https://createtoastqr-gf4tpo3gda-uc.a.run.app";
export const createToastQREndpointTestnet =
  "https://createtoastqr-ehg6drsqxq-uc.a.run.app";
export const createToastQREndpointLocal =
  "http://localhost:5000/mint-toast/us-central1/createToastQR";

export const createToastSecretEndpointMainnet =
  "https://createtoastsecret-gf4tpo3gda-uc.a.run.app";
export const createToastSecretEndpointTestnet =
  "https://createtoastsecret-ehg6drsqxq-uc.a.run.app";
export const createToastSecretEndpointLocal =
  "http://localhost:5000/mint-toast/us-central1/createToastSecret";

export const getAllEventUUIDEndpointMainnet =
  "https://getalleventuuid-gf4tpo3gda-uc.a.run.app";
export const getAllEventUUIDEndpointTestnet =
  "https://getalleventuuid-ehg6drsqxq-uc.a.run.app";
export const getAllEventUUIDEndpointLocal =
  "http://localhost:5000/mint-toast/us-central1/getAllEventUUID";

export const getEventIdEndpointMainnet =
  "https://geteventid-gf4tpo3gda-uc.a.run.app";
export const getEventIdEndpointTestnet =
  "https://geteventid-ehg6drsqxq-uc.a.run.app";
export const getEventIdEndpointLocal =
  "http://localhost:5000/mint-toast/us-central1/getEventId";

export const getOwnerEndpointMainnet =
  "https://getowner-gf4tpo3gda-uc.a.run.app";
export const getOwnerEndpointTestnet =
  "https://getowner-ehg6drsqxq-uc.a.run.app";
export const getOwnerEndpointLocal =
  "http://localhost:5000/mint-toast/us-central1/getOwner";

export const getSecretDataEndpointMainnet =
  "https://getsecretdata-gf4tpo3gda-uc.a.run.app";
export const getSecretDataEndpointTestnet =
  "https://getsecretdata-ehg6drsqxq-uc.a.run.app";
export const getSecretDataEndpointLocal =
  "http://localhost:5000/mint-toast/us-central1/getSecretData";

export const getUserCollectionEndpointMainnet =
  "https://getusercollection-gf4tpo3gda-uc.a.run.app";
export const getUserCollectionEndpointTestnet =
  "https://getusercollection-ehg6drsqxq-uc.a.run.app";
export const getUserCollectionEndpointLocal =
  "http://localhost:5000/mint-toast/us-central1/getUserCollection";

export const mintEndpointMainnet = "https://mint-gf4tpo3gda-uc.a.run.app";
export const mintEndpointTestnet = "https://mint-ehg6drsqxq-uc.a.run.app";
export const mintEndpointLocal =
  "http://localhost:5000/mint-toast/us-central1/mint";
