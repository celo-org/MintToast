/* eslint-disable @typescript-eslint/no-unused-vars */
import e from "express";
import admin from "firebase-admin";
import { CAPTCH_SECRETKEY } from "../../data/constant";
import { getContract } from "./../../utils/web3";

type Data = {
  success?: boolean;
  error?: string;
};

export default async function handler(req: e.Request, res: e.Response<Data>) {
  req.setTimeout(300000);
  const db = admin.firestore();
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method Not Allowed" });
    return;
  }
  try {
    const fields = req.body;
    const reCaptchaRes = await fetch(
      "https://www.google.com/recaptcha/api/siteverify",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: `secret=${CAPTCH_SECRETKEY}&response=${fields.token}`,
      }
    );
    const reCaptchaResJson = await reCaptchaRes.json();

    if (reCaptchaResJson?.score > 0.5) {
      const address = fields.address;
      const tokenId = fields.tokenId;
      const docId = fields.docId as string;
      const docSnapshot = await db.collection("events").doc(docId).get();
      const resultData = docSnapshot.data();
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
              // eslint-disable-next-line max-len
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
  } catch (error) {
    console.error(":::Error:::", error);
    res.status(500).json({ error: error as string });
  }
}
