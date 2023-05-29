// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { createToastObj } from "@/helper/create-helpers";
import formidable from "formidable";
import type { NextApiRequest, NextApiResponse } from "next";

export const config = {
  api: {
    bodyParser: false,
  },
};

type Data = {
  success?: boolean;
  error?: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method Not Allowed" });
    return;
  }
  try {
    // accept image file from the req.body multipart/form-data
    const form = new formidable.IncomingForm();
    await new Promise<void>((resolve, reject) => {
      form.parse(req, async (err, fields, files) => {
        if (err) {
          console.error("Error", err);
          res.status(500).json({ error: err.message });
          return;
        }
        // check if all the required fields are present
        if (
          !fields.title ||
          !fields.description ||
          !fields.startDate ||
          !fields.endDate ||
          !fields.websiteLink ||
          !fields.totalToastSupply ||
          !fields.ownerAddress ||
          !fields.imageID
        ) {
          res.status(400).json({ error: "Missing required fields" });
          return;
        }
        res.status(200).json({ success: false });

        await createToastObj(fields, true);
        resolve();
      });
    });
    return;
  } catch (error) {
    console.error("Error", error);
    res.status(500).json({ error: error as string });
  }
}
