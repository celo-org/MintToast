// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import e from "express";
import admin from "firebase-admin";
import { Request } from "firebase-functions/v2/https";
import { TwitterApi } from "twitter-api-v2";
import { TWITTER_API_KEY, TWITTER_API_SECRET } from "../../data/constant";
import {
  getAccountsFromTwitterHandle,
  revokeIdentifier,
} from "../../utils/odis";

export default async function handler(req: Request, res: e.Response) {
  const db = admin.firestore();
  res.setHeader("Access-Control-Allow-Origin", "*");
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method Not Allowed" });
    return;
  }
  try {
    const { accessToken, secret, address } = req.body;

    const client = new TwitterApi({
      appKey: TWITTER_API_KEY ?? "",
      appSecret: TWITTER_API_SECRET ?? "",
      accessSecret: secret,
      accessToken: accessToken,
    });

    const result = await client.currentUser();
    const { screen_name: screenName } = result;
    let accounts: string[] = await getAccountsFromTwitterHandle(screenName);
    accounts = accounts.map((item) => item.toLowerCase());
    if (!accounts.includes(address.toLowerCase())) {
      console.log("HERE");
      res
        .status(500)
        .json({ error: "The address is not attested to the username" });
      return;
    }
    const receipt = await revokeIdentifier(screenName, address);
    if (!receipt) {
      res.status(500).json({ error: "Failed to register identifier" });
      return;
    }
    await db.collection("odis").doc(address).delete();
    res.status(200).json({ success: true, receipt });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
}
