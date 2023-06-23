// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import e from "express";
import admin from "firebase-admin";
import { Request } from "firebase-functions/v2/https";
import { WHITELISTED_ADDRESS } from "../../data/constant";
import { createToastObj } from "../../helper/create-helpers";
import { verifySignature } from "../../utils/web3";

export const config = {
  api: {
    bodyParser: false,
  },
};

type Data = {
  success?: boolean;
  id?: string;
  error?: string;
};

export default async function handler(req: Request, res: e.Response<Data>) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  const db = admin.firestore();
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method Not Allowed" });
    return;
  }
  try {
    const fields = req.body;
    if (!WHITELISTED_ADDRESS.includes(fields.ownerAddress.toLowerCase())) {
      res.status(401).json({ error: "Unauthorized" });
      return;
    }

    const signature = fields.signature;
    delete fields.signature;
    const message = JSON.stringify(fields);
    const verified = await verifySignature(
      message,
      signature,
      fields.ownerAddress
    );
    if (!verified) {
      res.status(401).json({ error: "Unauthorized" });
      return;
    }

    if (
      !fields.title ||
      !fields.description ||
      !fields.startDate ||
      !fields.endDate ||
      !fields.websiteLink ||
      !fields.totalToastSupply ||
      !fields.ownerAddress ||
      !fields.imageID ||
      !fields.secret
    ) {
      res.status(400).json({ error: "Missing required fields" });
      return;
    }

    const id = await createToastObj(fields, true, db);
    res.status(200).json({ success: true, id });
    return;
  } catch (error) {
    console.error("Error", error);
    res.status(500).json({ error: error as string });
  }
}
