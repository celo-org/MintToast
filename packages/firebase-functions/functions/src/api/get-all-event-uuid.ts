// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import e from "express";
import admin from "firebase-admin";
import { Request } from "firebase-functions/v2/https";

export default async function handler(req: Request, res: e.Response) {
  const db = admin.firestore();
  if (req.method !== "GET") {
    res.status(405).json({ error: "Method Not Allowed" });
    return;
  }
  try {
    const docIds: string[] = [];
    const querySnapshot = await db.collection("events").get();
    querySnapshot.forEach((doc) => {
      docIds.push(doc.id);
    });
    res.status(200).json({ docIds });
  } catch (error) {
    console.error("Error", error);
    res.status(500).json({ error: error as string });
  }
}
