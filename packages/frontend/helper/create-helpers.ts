import { database } from "@/utils/firebase";
import { uploadJSON } from "@/utils/ipfs";
import { getContract } from "@/utils/web3";
import { BigNumber } from "ethers";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import formidable from "formidable";
import { v4 as uuidv4 } from "uuid";

export const createToastObj = async (
  fields: formidable.Fields,
  isSecretProtected: boolean,
  imageID: string
) => {
  const toastObj = {
    name: fields.title,
    description: fields.description,
    image: "ipfs://" + imageID,
    attributes: [
      {
        trait_type: "created_by",
        value: "0x8D6c17Df259C8c11eb334D1B52F44bB6F9752aeF",
      },
      { trait_type: "website_link", value: fields.websiteLink },
      { trait_type: "image_hash", value: imageID },
      {
        display_type: "date",
        trait_type: "start_date",
        value: fields.startDate,
      },
      { display_type: "date", trait_type: "end_date", value: fields.endDate },
      { trait_type: "total_toast_supply", value: fields.totalToastSupply },
    ],
  };
  var dataID = await uploadJSON(toastObj);
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
  const countOfSeries: BigNumber = await contract.countOfSeries();
  const uuid = uuidv4();
  await setDoc(doc(database, "events", uuid), {
    uuid: uuid,
    eventId: countOfSeries.toNumber() - 1,
    ownerAddress: fields.ownerAddress,
    createdAt: serverTimestamp(),
    isSecretProtected: isSecretProtected,
    secret: fields.secret,
  });
};
