import { uploadImage, uploadJSON } from "./../../utils/ipfs";
import { getContract } from "./../../utils/web3";
// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import formidable from "formidable";
import type { NextApiRequest, NextApiResponse } from "next";

export const config = {
  api: {
    bodyParser: false,
  },
};

type Data = {
  dataID?: string;
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
        const title = fields.title;
        const description = fields.description;
        const startDate = fields.startDate;
        const endDate = fields.endDate;
        const websiteLink = fields.websiteLink;
        const totalToastSupply = fields.totalToastSupply as string;
        const email = fields.email;
        const communityName = fields.communityName;
        // upload the image to IPFS
        const imageID = await uploadImage(files.image as formidable.File);

        // create a json object with the above variables
        const toastObj = {
          name: title,
          description: description,
          external_url: "https://toast.celo.org/token/0",
          image: "ipfs://" + imageID,
          attributes: [
            { trait_type: "community_name", value: communityName },
            {
              trait_type: "created_by",
              value: "0x8D6c17Df259C8c11eb334D1B52F44bB6F9752aeF",
            },
            { trait_type: "website_link", value: websiteLink },
            { trait_type: "image_hash", value: imageID },
            {
              display_type: "date",
              trait_type: "start_date",
              value: startDate,
            },
            { display_type: "date", trait_type: "end_date", value: endDate },
            { trait_type: "email", value: email },
            { trait_type: "total_toast_supply", value: totalToastSupply },
          ],
        };
        var dataID = await uploadJSON(toastObj);

        // Make contract call to upload the data
        const contract = getContract();

        const tx = await contract.createCollection(
          parseInt(totalToastSupply),
          dataID
        );
        await tx.wait();
        res.status(200).json({ dataID: dataID });
        resolve();
      });
    });
    return;
  } catch (error) {
    console.error("Error", error);
    res.status(500).json({ error: error as string });
  }
}
