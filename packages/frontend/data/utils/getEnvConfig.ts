import {
  MAINNET_API_ENDPOINT,
  MAINNET_CONTRACT_ADDRESS,
  MAINNET_RPC_ENDPOINT,
  MAINNET_TOASTMASTER_PK,
  NETWORK_MODE,
  TESTNET_API_ENDPOINT,
  TESTNET_CONTRACT_ADDRESS,
  TESTNET_RPC_ENDPOINT,
  TESTNET_TOASTMASTER_PK,
} from "../constant";

export const getEnvConfig = (): {
  apiEndpoint: string;
  rpcEndpoint: string;
  toastMasterPK: string;
  contractAddress: string;
} => {
  switch (NETWORK_MODE) {
    case "mainnet":
      return {
        apiEndpoint: MAINNET_API_ENDPOINT,
        rpcEndpoint: MAINNET_RPC_ENDPOINT,
        toastMasterPK: MAINNET_TOASTMASTER_PK,
        contractAddress: MAINNET_CONTRACT_ADDRESS,
      };
    default:
      return {
        apiEndpoint: TESTNET_API_ENDPOINT,
        rpcEndpoint: TESTNET_RPC_ENDPOINT,
        toastMasterPK: TESTNET_TOASTMASTER_PK,
        contractAddress: TESTNET_CONTRACT_ADDRESS,
      };
  }
};
