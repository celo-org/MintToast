// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import e from "express";
import { Request } from "firebase-functions/v2/https";
import { TwitterApi } from "twitter-api-v2";
import { TWITTER_API_KEY, TWITTER_API_SECRET } from "../../data/constant";
import { registerIdentifier } from "../../utils/odis";

export default async function handler(req: Request, res: e.Response) {
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

    const receipt = await registerIdentifier(screenName, address);
    console.log(
      "🚀 ~ file: register-twitter.ts:32 ~ handler ~ receipt:",
      receipt
    );

    res.status(200).json({ success: true });
  } catch (error) {
    console.error("Error", error);
    res.status(500).json({ error: error as string });
  }
}
