import { IPFSDataProps } from "./props";

export const formatIpfsData = (data: any): IPFSDataProps => {
  var totalToastSupply = getAttr(
    "total_toast_supply",
    data["attributes"] as Array<any>
  );
  var websiteLink = getAttr("website_link", data["attributes"] as Array<any>);
  var communityName = getAttr(
    "community_name",
    data["attributes"] as Array<any>
  );
  var createdBy = getAttr("created_by", data["attributes"] as Array<any>);
  var imageHash = getAttr("image_hash", data["attributes"] as Array<any>);
  var startDate = getAttr("start_date", data["attributes"] as Array<any>);
  var endDate = getAttr("end_date", data["attributes"] as Array<any>);
  var email = getAttr("email", data["attributes"] as Array<any>);

  var ipfsData: IPFSDataProps = {
    name: data["name"],
    description: data["description"],
    tokenId: data["tokenId"],
    totalToastSupply: totalToastSupply,
    websiteLink: websiteLink,
    communityName: communityName,
    createdBy: createdBy,
    imageHash: imageHash,
    startDate: startDate,
    endDate: endDate,
    email: email,
  };
  return ipfsData;
};

const getAttr = (key: string, list: Array<any>) => {
  var res = list.find((attr) => attr["trait_type"] === key)["value"];
  return res;
};
