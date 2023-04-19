// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { database } from "@/utils/firebase";
import { collection, getDocs, query, where } from "firebase/firestore";
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
    const { tokenId } = req.body;
    var result = await getDocs(
      query(
        collection(database, "events"),
        where("eventId", "==", parseInt(tokenId))
      )
    );
    var resultData = result.docs.map((doc) => doc.data());
    res.status(200).json({ resultData });
  } catch (error) {
    console.error("Error", error);
    res.status(500).json({ error: error as string });
  }
}
