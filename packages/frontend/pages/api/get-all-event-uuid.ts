// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { database } from "@/utils/firebase";
import { collection, getDocs } from "firebase/firestore";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    res.status(405).json({ error: "Method Not Allowed" });
    return;
  }
  try {
    var docIds: string[] = [];
    const querySnapshot = await getDocs(collection(database, "events"));
    querySnapshot.forEach((doc) => {
      docIds.push(doc.id);
    });
    res.status(200).json({ docIds });
  } catch (error) {
    console.error("Error", error);
    res.status(500).json({ error: error as string });
  }
}
