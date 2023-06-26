import {
  checkSecretEndpoint,
  createToastQREndpoint,
  createToastSecretEndpoint,
  getAccountsFromTwitterHandleEndpoint,
  getAllEventUUIDEndpoint,
  getEventIdEndpoint,
  getOwnerEndpoint,
  getSecretDataEndpoint,
  getTwitterFromAddressEndpoint,
  getUserCollectionEndpoint,
  mintEndpoint,
  registerTwitterEndpoint,
  revokeTwitterEndpoint,
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
  return {
    createToastQREndpoint,
    createToastSecretEndpoint,
    getAllEventUUIDEndpoint,
    getEventIdEndpoint,
    getOwnerEndpoint,
    getSecretDataEndpoint,
    getUserCollectionEndpoint,
    mintEndpoint,
    revokeTwitterEndpoint,
    registerTwitterEndpoint,
    getAccountsFromTwitterHandleEndpoint,
    checkSecretEndpoint,
    getTwitterFromAddressEndpoint,
  };
};
