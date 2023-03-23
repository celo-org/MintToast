// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { fetchDataFromIPFS } from "@/utils/ipfs";
import { getContract } from "@/utils/web3";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method Not Allowed" });
    return;
  }
  try {
    const contract = getContract();

    const uri: string = await contract.uri(2);
    const cid = uri.substring(7);

    const eventData = await fetchDataFromIPFS(cid);
    res.status(200).json({ data: { ...eventData, tokenId: 2 } });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: e as string });
  }
}
