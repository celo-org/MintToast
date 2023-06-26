// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import e from "express";
import admin from "firebase-admin";

export default async function handler(req: e.Request, res: e.Response) {
  const db = admin.firestore();
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method Not Allowed" });
    return;
  }
  try {
    const { tokenId } = req.body;
    const result = await db
      .collection("events")
      .where("eventId", "==", parseInt(tokenId))
      .get();
    const resultData = result.docs.map((doc) => doc.data());
    res.status(200).json({ resultData });
  } catch (error) {
    console.error("Error", error);
    res.status(500).json({ error: error as string });
  }
}
