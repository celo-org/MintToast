import {
  MAINNET_API_ENDPOINT,
  NETWORK_MODE,
  TESTNET_API_ENDPOINT,
} from "../constant";

export const getEnvConfig = (): {
  apiEndpoint: string;
} => {
  switch (NETWORK_MODE) {
    case "mainnet":
      return {
        apiEndpoint: MAINNET_API_ENDPOINT,
      };
    default:
      return {
        apiEndpoint: TESTNET_API_ENDPOINT,
      };
  }
};
