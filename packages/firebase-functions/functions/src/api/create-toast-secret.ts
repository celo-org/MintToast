// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import e from "express";
import admin from "firebase-admin";
import { Request } from "firebase-functions/v2/https";
import formidable from "formidable";
import { createToastObj } from "../../helper/create-helpers";
import { uploadImage } from "../../utils/ipfs";

export const config = {
  api: {
    bodyParser: false,
  },
};

type Data = {
  success?: boolean;
  id?: string;
  error?: string;
};

export default async function handler(req: Request, res: e.Response<Data>) {
  const db = admin.firestore();
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method Not Allowed" });
    return;
  }
  try {
    // accept image file from the req.body multipart/form-data
    const form = new formidable.IncomingForm();
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    await new Promise<void>((resolve, reject) => {
      form.parse(req, async (err, fields, files) => {
        if (err) {
          console.error("Error", err);
          res.status(500).json({ error: err.message });
          return;
        }
        const imageID = await uploadImage(files.image as formidable.File);
        // check if all the required fields are present
        if (
          !fields.title ||
          !fields.description ||
          !fields.startDate ||
          !fields.endDate ||
          !fields.websiteLink ||
          !fields.totalToastSupply ||
          !fields.ownerAddress ||
          !imageID ||
          !fields.secret
        ) {
          res.status(400).json({ error: "Missing required fields" });
          return;
        }

        const id = await createToastObj(fields, true, imageID, db);
        res.status(200).json({ success: true, id });
        resolve();
      });
    });
    return;
  } catch (error) {
    console.error("Error", error);
    res.status(500).json({ error: error as string });
  }
}
