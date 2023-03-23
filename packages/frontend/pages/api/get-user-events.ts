// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { fetchDataFromIPFS } from "@/utils/ipfs";
import { getContract } from "@/utils/web3";
import { BigNumber } from "ethers";
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
    const balance: BigNumber = await contract.balanceOf(req.body.address, 2);
    if (balance.eq(0)) {
      res.status(200).json({ data: null });
      return;
    } else {
      const uri: string = await contract.uri(2);
      const cid = uri.substring(7);

      const eventData = await fetchDataFromIPFS(cid);
      res
        .status(200)
        .json({
          data: { ...eventData, tokenId: 2 },
          balance: balance.toString(),
        });
    }
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: e as string });
  }
}
