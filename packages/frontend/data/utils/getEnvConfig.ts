import {
  LOCAL_API_ENDPOINT,
  LOCAL_SITE_URL,
  MAINNET_API_ENDPOINT,
  MAINNET_CHAINID,
  MAINNET_CONTRACT_ADDRESS,
  MAINNET_GRAPHQL_API,
  MAINNET_RPC_ENDPOINT,
  MAINNET_SITE_URL,
  MAINNET_TOASTMASTER_PK,
  NETWORK_MODE,
  TESTNET_API_ENDPOINT,
  TESTNET_CHAINID,
  TESTNET_CONTRACT_ADDRESS,
  TESTNET_GRAPHQL_API,
  TESTNET_RPC_ENDPOINT,
  TESTNET_SITE_URL,
  TESTNET_TOASTMASTER_PK,
} from "../constant";

export const getEnvConfig = (): {
  siteUrl: string;
  apiEndpoint: string;
  rpcEndpoint: string;
  toastMasterPK: string;
  contractAddress: string;
  graphqlApi: string;
  networkName: string;
  chainId: number;
} => {
  switch (NETWORK_MODE) {
    case "mainnet":
      return {
        siteUrl: MAINNET_SITE_URL,
        apiEndpoint: MAINNET_API_ENDPOINT,
        rpcEndpoint: MAINNET_RPC_ENDPOINT,
        toastMasterPK: MAINNET_TOASTMASTER_PK,
        contractAddress: MAINNET_CONTRACT_ADDRESS,
        graphqlApi: MAINNET_GRAPHQL_API,
        networkName: "celo",
        chainId: MAINNET_CHAINID,
      };
    case "local":
      return {
        siteUrl: LOCAL_SITE_URL,
        apiEndpoint: LOCAL_API_ENDPOINT,
        rpcEndpoint: TESTNET_RPC_ENDPOINT,
        toastMasterPK: TESTNET_TOASTMASTER_PK,
        contractAddress: TESTNET_CONTRACT_ADDRESS,
        graphqlApi: TESTNET_GRAPHQL_API,
        networkName: "alfajores",
        chainId: TESTNET_CHAINID,
      };
    default:
      return {
        siteUrl: TESTNET_SITE_URL,
        apiEndpoint: TESTNET_API_ENDPOINT,
        rpcEndpoint: TESTNET_RPC_ENDPOINT,
        toastMasterPK: TESTNET_TOASTMASTER_PK,
        contractAddress: TESTNET_CONTRACT_ADDRESS,
        graphqlApi: TESTNET_GRAPHQL_API,
        networkName: "alfajores",
        chainId: TESTNET_CHAINID,
      };
  }
};
