import axios from "axios";

export const uploadImageToIpfs = async (file: File) => {
  var bodyFormData = new FormData();
  bodyFormData.append("image", file);

  var res = await axios({
    method: "post",
    url: "/api/upload",
    data: bodyFormData,
    headers: { "Content-Type": "multipart/form-data" },
  });
  const imageID = res.data.imageID;
  return imageID;
};