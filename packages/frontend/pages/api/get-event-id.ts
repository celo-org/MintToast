// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { database } from "@/utils/firebase";
import { doc, getDoc } from "firebase/firestore";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method Not Allowed" });
    return;
  }
  try {
    const { docId } = req.body;
    var docSnapshot = await getDoc(doc(database, "events", docId));
    var resultData = docSnapshot.data();
    res.status(200).json({ resultData });
  } catch (error) {
    console.error("Error", error);
    res.status(500).json({ error: error as string });
  }
}
