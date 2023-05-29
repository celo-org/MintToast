import { applyMiddleware } from "@/data/utils/rate-limit";
import formidable from "formidable";
import { getContract } from "./../../utils/web3";
// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { CAPTCH_SECRETKEY } from "@/data/constant";
import { getRateLimitMiddlewares } from "@/data/utils/rate-limit";
import { database } from "@/utils/firebase";
import { doc, getDoc } from "firebase/firestore";
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
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method Not Allowed" });
    return;
  }
  try {
    const form = new formidable.IncomingForm();
    await new Promise<void>((resolve, reject) => {
      form.parse(req, async (err, fields, files) => {
        var reCaptchaRes = await fetch(
          "https://www.google.com/recaptcha/api/siteverify",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
            },
            body: `secret=${CAPTCH_SECRETKEY}&response=${fields.token}`,
          }
        );
        var reCaptchaResJson = await reCaptchaRes.json();

        if (reCaptchaResJson?.score > 0.5) {
          const address = fields.address;
          const tokenId = fields.tokenId;
          const docId = fields.docId as string;

          var docSnapshot = await getDoc(doc(database, "events", docId));
          var resultData = docSnapshot.data();
          if (resultData && resultData.isSecretProtected == true) {
            if (resultData.secret != fields.secret) {
              res.status(200).json({
                error: "Secret is not correct",
              });
              return;
            }
          }
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
        } else {
          res.status(200).json({
            error: "Recaptcha failed",
          });
        }
        // Make contract call to upload the data
      });
    });
  } catch (error) {
    console.error(":::Error:::", error);
    res.status(500).json({ error: error as string });
  }
}
