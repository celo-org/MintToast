import { database } from "@/utils/firebase";
import { uploadImage, uploadJSON } from "./../../utils/ipfs";
// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { getContract } from "@/utils/web3";
import { BigNumber } from "ethers";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import formidable from "formidable";
import type { NextApiRequest, NextApiResponse } from "next";
import { v4 as uuidv4 } from "uuid";

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
        const ownerAddress = fields.ownerAddress;
        // upload the image to IPFS
        const imageID = await uploadImage(files.image as formidable.File);

        if (!ownerAddress) {
          res.status(500).json({ error: "Owner address is required" });
          return;
        }

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
        // convert start date from mm/dd/yyyy to unix timestamp
        const startDateUnix = new Date(startDate as string).getTime() / 1000;
        // convert end date from mm/dd/yyyy to unix timestamp
        const endDateUnix = new Date(endDate as string).getTime() / 1000;
        // Make contract call to upload the data
        const contract = getContract();

        const tx = await contract.createSeries(
          parseInt(totalToastSupply),
          dataID,
          startDateUnix,
          endDateUnix
        );
        await tx.wait();
        // // get countOfSeries from contract
        const countOfSeries: BigNumber = await contract.countOfSeries();
        // generate a UUID using uuid package and store it in firebase database
        const uuid = uuidv4();
        await setDoc(doc(database, "events", uuid), {
          uuid: uuid,
          eventId: countOfSeries.toNumber() - 1,
          ownerAddress: ownerAddress,
          createdAt: serverTimestamp(),
        });
        res.status(200).json({ dataID });
        resolve();
      });
    });
    return;
  } catch (error) {
    console.error("Error", error);
    res.status(500).json({ error: error as string });
  }
}
