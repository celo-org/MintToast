// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { getContract } from "@/utils/web3";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  name: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const contract = getContract();
  const tx = await contract.collections();
  console.log("tx", tx);
  res.status(200).json({ name: "John Doe" });
}
