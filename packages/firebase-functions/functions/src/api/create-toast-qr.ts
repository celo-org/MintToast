import admin from "firebase-admin";
/* eslint-disable guard-for-in */
// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import e from "express";
import { Request } from "firebase-functions/v2/https";
import { createToastObj } from "../../helper/create-helpers";

export const config = {
  api: {
    bodyParser: false,
  },
};

type Data = {
  success?: boolean;
  id?: string;
  data?: any;
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
    if (
      !fields.title ||
      !fields.description ||
      !fields.startDate ||
      !fields.endDate ||
      !fields.websiteLink ||
      !fields.totalToastSupply ||
      !fields.ownerAddress ||
      !fields.imageID
    ) {
      res.status(400).json({ error: "Missing required fields" });
      return;
    }
    const id = await createToastObj(fields, false, db);
    res.status(200).json({ success: true, id });
  } catch (error) {
    console.error("Error", error);
    res.status(500).json({ error: error as string });
  }
}
