import e from "express";
import admin from "firebase-admin";

export default async function handler(req: e.Request, res: e.Response) {
  const db = admin.firestore();
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method Not Allowed" });
    return;
  }
  try {
    const { address } = req.body;

    const doc = await db.collection("odis").doc(address).get();
    if (!doc.exists) {
      res.status(200).json({ success: false, error: "Not Found" });
      return;
    }

    res.status(200).json({ success: true, data: doc.data() });
  } catch (error: any) {
    console.error("Error >>>>> ", error.message);
    console.error("Error >>>>> ", typeof error.message);
    res.status(500).json({ error: error.message });
  }
}
