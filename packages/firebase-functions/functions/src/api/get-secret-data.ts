// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import e from "express";
import admin from "firebase-admin";
import { Request } from "firebase-functions/v2/https";

export default async function handler(req: Request, res: e.Response) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  const db = admin.firestore();
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method Not Allowed" });
    return;
  }
  try {
    const { secret } = req.body;
    const result = await db
      .collection("events")
      .where("secret", "==", secret)
      .get();
    if (result.docs.length === 0) {
      res.status(200).json({ error: "Not Found", resultData: null });
      return;
    }
    const resultData = result.docs[0].data();
    res.status(200).json({ resultData });
  } catch (error) {
    console.error("Error", error);
    res.status(500).json({ error: error as string });
  }
}
