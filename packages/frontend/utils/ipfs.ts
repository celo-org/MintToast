import axios from "axios";
import formidable from "formidable";
import fs from "fs";
import { create } from "ipfs-http-client";

export const getIPFSClient = () => {
  const projectId = "2NM3m9pxz2rnDw0hBrgaMr1IAnQ";
  const projectSecret = "c424caf1023087fe76bd08a0ee9e374c";
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

export const uploadImage = async (image: formidable.File) => {
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
    var res = await axios.get("https://mint-toast.infura-ipfs.io/ipfs/" + cid);
    return res.data;
  } catch (error) {
    console.error("Error fetching data from IPFS:", error);
  }
};

export const fetchImageUrl = (cid: string) => {
  return "https://mint-toast.infura-ipfs.io/ipfs/" + cid;
};