import { GRAPHQL_API } from "@/data/constant";
import axios from "axios";

export const getUsers = async () => {
  var res = await axios({
    url: GRAPHQL_API,
    method: "post",
    data: {
      query: `query getUsers {
        users(first:100) {
          id
        }
      }`,
      operationName: "getUsers",
    },
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (res.data.data.users) {
    return res.data.data;
  } else {
    return null;
  }
};
