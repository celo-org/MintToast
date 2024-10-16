import admin from "firebase-admin";
import { v4 as uuidv4 } from "uuid";
import { uploadJSON } from "../utils/ipfs";
import { getContract } from "../utils/web3";

export const createToastObj = async (
  fields: any,
  isSecretProtected: boolean,
  db: admin.firestore.Firestore
): Promise<string> => {
  const toastObj = {
    name: fields.title,
    description: fields.description,
    image: "ipfs://" + fields.imageID,
    attributes: [
      {
        trait_type: "created_by",
        value: "0x8D6c17Df259C8c11eb334D1B52F44bB6F9752aeF",
      },
      { trait_type: "website_link", value: fields.websiteLink },
      { trait_type: "image_hash", value: fields.imageID },
      {
        display_type: "date",
        trait_type: "start_date",
        value: fields.startDate,
      },
      { display_type: "date", trait_type: "end_date", value: fields.endDate },
      { trait_type: "total_toast_supply", value: fields.totalToastSupply },
    ],
  };
  const dataID = await uploadJSON(toastObj);
  // convert start date from mm/dd/yyyy to unix timestamp
  const startDateUnix = new Date(fields.startDate as string).getTime() / 1000;
  // convert end date from mm/dd/yyyy to unix timestamp
  const endDateUnix = new Date(fields.endDate as string).getTime() / 1000;
  // Make contract call to upload the data
  const contract = getContract();

  const tx = await contract.createSeries(
    parseInt(fields.totalToastSupply as string),
    dataID,
    startDateUnix,
    endDateUnix
  );
  await tx.wait();

  // get countOfSeries from contract
  const countOfSeries: any = await contract.countOfSeries();
  const uuid = uuidv4();

  await db
    .collection("events")
    .doc(uuid)
    .set({
      uuid: uuid,
      eventId: countOfSeries.toNumber() - 1,
      ownerAddress: fields.ownerAddress,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
      isSecretProtected: isSecretProtected,
      secret: isSecretProtected ? fields.secret : "",
    });

  return uuid;
};
