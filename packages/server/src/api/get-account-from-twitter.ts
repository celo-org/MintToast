// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import e from "express";
import { getAccountsFromTwitterHandle } from "../../utils/odis";

export default async function handler(req: e.Request, res: e.Response) {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method Not Allowed" });
    return;
  }
  try {
    const { twitterUsername } = req.body;

    const accounts = await getAccountsFromTwitterHandle(twitterUsername);
    if (!accounts) {
      res.status(500).json({ error: "Failed to get accounts" });
      return;
    }

    res.status(200).json({ success: true, accounts });
  } catch (error: any) {
    console.error("Error >>>>> ", error.message);
    console.error("Error >>>>> ", typeof error.message);
    res.status(500).json({ error: error.message });
  }
}
