import { GRAPHQL_API } from "@/data/constant";
import axios from "axios";

export const getTotalMints = async (address: string) => {
  var res = await axios({
    url: GRAPHQL_API,
    method: "post",
    data: {
      query: `query getTotalMints($address: String!) {
        user(id: $address) {
          id
          collection {
            id 
          }
        }
      }`,
      operationName: "getTotalMints",
      variables: {
        address,
      },
    },
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (res && res.data && res.data.data && res.data.data.user) {
    const count = res.data.data.user.collection.length;
    return count;
  } else {
    return null;
  }
};
