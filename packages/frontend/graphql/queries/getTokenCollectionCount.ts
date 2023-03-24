import { GRAPHQL_API } from "@/data/constant";
import axios from "axios";

export const getTokenCollectionCount = async () => {
  var res = await axios({
    url: GRAPHQL_API,
    method: "post",
    data: {
      query: `query getTokenCollectionCount {
        events(orderBy: "id",orderDirection: "desc", first: 1) {
          id
        }
      }`,
      operationName: "getTokenCollectionCount",
    },
    headers: {
      "Content-Type": "application/json",
    },
  });
  console.log("res", res.data.data.events);
  if (res.data && res.data.data && res.data.data.events) {
    return { ...res.data.data };
  } else {
    return null;
  }
};
