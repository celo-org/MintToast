// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import e from "express";
import admin from "firebase-admin";
import { Request } from "firebase-functions/v2/https";

export default async function handler(req: Request, res: e.Response) {
  const db = admin.firestore();
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method Not Allowed" });
    return;
  }
  try {
    const { docId } = req.body;
    const docSnapshot = await db.collection("events").doc(docId).get();
    const resultData = docSnapshot.data();
    res.status(200).json({ resultData });
  } catch (error) {
    console.error("Error", error);
    res.status(500).json({ error: error as string });
  }
}
