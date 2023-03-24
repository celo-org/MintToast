import { GRAPHQL_API } from "@/data/constant";
import { fetchDataFromIPFS } from "@/utils/ipfs";
import axios from "axios";

export const getCollection = async (tokenId: number) => {
  var res = await axios({
    url: GRAPHQL_API,
    method: "post",
    data: {
      query: `query getCollection($tokenId: Int!) {
        event(id:$tokenId) {
          id
          uri
          creationTimestamp
          totalSupply
          currentSupply
          toaster
        }
      }`,
      operationName: "getCollection",
      variables: {
        tokenId,
      },
    },
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (res.data.data.event) {
    var uriData = {};
    uriData = await fetchDataFromIPFS(res.data.data.event.uri.substring(7));
    return { ...res.data.data, uriData };
  } else {
    return null;
  }
};
