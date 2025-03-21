import axios from "axios";

import fs from "fs";
import { create } from "ipfs-http-client";
import { IPFS_API_KEY, IPFS_PROJECT_ID } from "../data/constant";

export const getIPFSClient = () => {
  const projectId = IPFS_PROJECT_ID;
  const projectSecret = IPFS_API_KEY;
  const auth =
    "Basic " + Buffer.from(projectId + ":" + projectSecret).toString("base64");

  const client = create({
    host: "ipfs.infura.io",
    port: 5001,
    protocol: "https",
    headers: {
      authorization: auth,
    },
  });
  return client;
};

export const uploadImage = async (image: any) => {
  const client = getIPFSClient();
  const data = fs.readFileSync(image.filepath);
  const result = await client.add(data);
  return result.cid.toString();
};

export const uploadJSON = async (data: any) => {
  const client = getIPFSClient();
  const jsonString = JSON.stringify(data);
  const jsonBuffer = Buffer.from(jsonString);
  const res = await client.add(jsonBuffer);
  return res.cid.toString();
};

export const fetchDataFromIPFS = async (cid: string) => {
  try {
    const res = await axios.get(
      "https://mint-toast.infura-ipfs.io/ipfs/" + cid
    );
    return res.data;
  } catch (error) {
    console.error("Error fetching data from IPFS:", error);
  }
};

export const fetchImageUrl = (cid: string) => {
  if (cid === "QmeWrZgkRBub7fkdeEJZpFHBip6VhpGi4HDozxBttWngdy") {
    return "/images/Celo-UGW-POAP.png";
  }
  return "https://mint-toast.infura-ipfs.io/ipfs/" + cid;
};
