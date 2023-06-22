import {
  NETWORK_MODE,
  createToastQREndpointLocal,
  createToastQREndpointMainnet,
  createToastQREndpointTestnet,
  createToastSecretEndpointLocal,
  createToastSecretEndpointMainnet,
  createToastSecretEndpointTestnet,
  getAccountsFromTwitterHandleEndpointLocal,
  getAccountsFromTwitterHandleEndpointMainnet,
  getAccountsFromTwitterHandleEndpointTestnet,
  getAllEventUUIDEndpointLocal,
  getAllEventUUIDEndpointMainnet,
  getAllEventUUIDEndpointTestnet,
  getEventIdEndpointLocal,
  getEventIdEndpointMainnet,
  getEventIdEndpointTestnet,
  getOwnerEndpointLocal,
  getOwnerEndpointMainnet,
  getOwnerEndpointTestnet,
  getSecretDataEndpointLocal,
  getSecretDataEndpointMainnet,
  getSecretDataEndpointTestnet,
  getUserCollectionEndpointLocal,
  getUserCollectionEndpointMainnet,
  getUserCollectionEndpointTestnet,
  mintEndpointLocal,
  mintEndpointMainnet,
  mintEndpointTestnet,
  registerTwitterEndpointLocal,
  registerTwitterEndpointMainnet,
  registerTwitterEndpointTestnet,
  revokeTwitterEndpointLocal,
  revokeTwitterEndpointMainnet,
  revokeTwitterEndpointTestnet,
} from "@/data/constant";
import { IPFSDataProps } from "./props";

export const formatIpfsData = (data: any): IPFSDataProps => {
  const totalToastSupply = getAttr(
    "total_toast_supply",
    data["attributes"] as Array<any>
  );
  const websiteLink = getAttr("website_link", data["attributes"] as Array<any>);
  const communityName =
    getAttr("community_name", data["attributes"] as Array<any>) ?? "";
  const createdBy =
    getAttr("created_by", data["attributes"] as Array<any>) ?? "";
  const imageHash =
    getAttr("image_hash", data["attributes"] as Array<any>) ?? "";
  const startDate =
    getAttr("start_date", data["attributes"] as Array<any>) ?? "";
  const endDate = getAttr("end_date", data["attributes"] as Array<any>) ?? "";
  const formattedStartDate = new Date(startDate).toLocaleDateString();
  const formattedEndDate = new Date(endDate).toLocaleDateString();
  const email = getAttr("email", data["attributes"] as Array<any>) ?? "";

  const ipfsData: IPFSDataProps = {
    name: data["name"],
    description: data["description"],
    totalToastSupply: totalToastSupply,
    websiteLink: websiteLink,
    communityName: communityName,
    createdBy: createdBy,
    imageHash: imageHash,
    startDate: startDate,
    endDate: endDate,
    email: email,
    formattedStartDate: formattedStartDate,
    formattedEndDate: formattedEndDate,
  };
  return ipfsData;
};

const getAttr = (key: string, list: Array<any>) => {
  const item = list.find((attr) => attr["trait_type"] === key);
  if (item) {
    const res = item["value"];
    return res;
  } else {
    return null;
  }
};

export const getApiEndpoint = () => {
  switch (NETWORK_MODE) {
    case "mainnet":
      return {
        createToastQREndpoint: createToastQREndpointMainnet,
        createToastSecretEndpoint: createToastSecretEndpointMainnet,
        getAllEventUUIDEndpoint: getAllEventUUIDEndpointMainnet,
        getEventIdEndpoint: getEventIdEndpointMainnet,
        getOwnerEndpoint: getOwnerEndpointMainnet,
        getSecretDataEndpoint: getSecretDataEndpointMainnet,
        getUserCollectionEndpoint: getUserCollectionEndpointMainnet,
        mintEndpoint: mintEndpointMainnet,
        revokeTwitter: revokeTwitterEndpointMainnet,
        registerTwitter: registerTwitterEndpointMainnet,
        getAccountsFromTwitterHandle:
          getAccountsFromTwitterHandleEndpointMainnet,
      };
    case "testnet":
      return {
        createToastQREndpoint: createToastQREndpointTestnet,
        createToastSecretEndpoint: createToastSecretEndpointTestnet,
        getAllEventUUIDEndpoint: getAllEventUUIDEndpointTestnet,
        getEventIdEndpoint: getEventIdEndpointTestnet,
        getOwnerEndpoint: getOwnerEndpointTestnet,
        getSecretDataEndpoint: getSecretDataEndpointTestnet,
        getUserCollectionEndpoint: getUserCollectionEndpointTestnet,
        mintEndpoint: mintEndpointTestnet,
        revokeTwitter: revokeTwitterEndpointTestnet,
        registerTwitter: registerTwitterEndpointTestnet,
        getAccountsFromTwitterHandle:
          getAccountsFromTwitterHandleEndpointTestnet,
      };
    case "local":
      return {
        createToastQREndpoint: createToastQREndpointLocal,
        createToastSecretEndpoint: createToastSecretEndpointLocal,
        getAllEventUUIDEndpoint: getAllEventUUIDEndpointLocal,
        getEventIdEndpoint: getEventIdEndpointLocal,
        getOwnerEndpoint: getOwnerEndpointLocal,
        getSecretDataEndpoint: getSecretDataEndpointLocal,
        getUserCollectionEndpoint: getUserCollectionEndpointLocal,
        mintEndpoint: mintEndpointLocal,
        revokeTwitter: revokeTwitterEndpointLocal,
        registerTwitter: registerTwitterEndpointLocal,
        getAccountsFromTwitterHandle: getAccountsFromTwitterHandleEndpointLocal,
      };
    default:
      return {
        createToastQREndpoint: createToastQREndpointLocal,
        createToastSecretEndpoint: createToastSecretEndpointLocal,
        getAllEventUUIDEndpoint: getAllEventUUIDEndpointLocal,
        getEventIdEndpoint: getEventIdEndpointLocal,
        getOwnerEndpoint: getOwnerEndpointLocal,
        getSecretDataEndpoint: getSecretDataEndpointLocal,
        getUserCollectionEndpoint: getUserCollectionEndpointLocal,
        mintEndpoint: mintEndpointLocal,
        revokeTwitter: revokeTwitterEndpointLocal,
        registerTwitter: registerTwitterEndpointLocal,
        getAccountsFromTwitterHandle: getAccountsFromTwitterHandleEndpointLocal,
      };
  }
};
