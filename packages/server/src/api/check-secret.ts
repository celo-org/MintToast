// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import e from "express";
import admin from "firebase-admin";

export const config = {
  api: {
    bodyParser: false,
  },
};

type Data = {
  success?: boolean;
  id?: string;
  error?: string;
  message?: string;
};

export default async function handler(req: e.Request, res: e.Response<Data>) {
  const db = admin.firestore();
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method Not Allowed" });
    return;
  }
  try {
    const fields = req.body;

    const querySnapshot = await db
      .collection("events")
      .where("secret", "==", fields.secret)
      .get();

    if (!querySnapshot.empty) {
      res.status(200).json({
        success: false,
        message: "Secret already used. Please try other secret value.",
      });
      return;
    }
    res.status(200).json({ success: true });
    return;
  } catch (error) {
    console.error("Error", error);
    res.status(500).json({ error: error as string });
  }
}
