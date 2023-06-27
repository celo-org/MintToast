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
    const { address } = req.body;
    const addressWhitelisted = await isWhitelisted(db, address);
    res.status(200).json({ success: addressWhitelisted });
  } catch (error) {
    console.error("Error", error);
    res.status(500).json({ error: error as string });
  }
}

export const isWhitelisted = async (
  db: admin.firestore.Firestore,
  address: string
): Promise<boolean> => {
  const docSnapshot = await db.collection("whitelist")
    .doc(address.toLowerCase())
    .get();
  if (!docSnapshot.exists) {
    return false;
  } else {
    return true;
  }
};
