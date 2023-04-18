import { applyMiddleware } from "@/data/utils/rate-limit";
import formidable from "formidable";
import { getContract } from "./../../utils/web3";
// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { getRateLimitMiddlewares } from "@/data/utils/rate-limit";
import type { NextApiRequest, NextApiResponse } from "next";

export const config = {
  api: {
    bodyParser: false,
  },
};

type Data = {
  success?: boolean;
  error?: string;
};

const middlewares = getRateLimitMiddlewares().map(applyMiddleware);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  try {
    await Promise.all(middlewares.map((middleware) => middleware(req, res)));
  } catch {
    return res.status(429).send({ error: "Too Many Requests" });
  }

  if (req.method !== "POST") {
    res.status(405).json({ error: "Method Not Allowed" });
    return;
  }
  try {
    const form = new formidable.IncomingForm();
    await new Promise<void>((resolve, reject) => {
      form.parse(req, async (err, fields, files) => {
        // Make contract call to upload the data
        const address = fields.address;
        const tokenId = fields.tokenId;

        const contract = getContract();
        try {
          const tx = await contract.mint(address, tokenId);
          await tx.wait();
          res.status(200).json({ success: true });
          return;
        } catch (e) {
          if ((e as object).toString().includes("Only One NFT per Wallet")) {
            res.status(200).json({
              error:
                "You have already minted the Toast, please check you collection",
            });
            return;
          } else {
            res.status(500).json({ error: e as string });
            return;
          }
        }
      });
    });
  } catch (error) {
    console.error(":::Error:::", error);
    res.status(500).json({ error: error as string });
  }
}
