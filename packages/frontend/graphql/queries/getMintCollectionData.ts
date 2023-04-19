import { GRAPHQL_API } from "@/data/constant";
import { fetchDataFromIPFS } from "@/utils/ipfs";
import axios from "axios";

export const getMintCollectionData = async (tokenId: string) => {
  var res = await axios({
    url: GRAPHQL_API,
    method: "post",
    data: {
      query: `query getMintCollectionData($tokenId: Int!) {
        event(id: $tokenId) {
          id
          uri
          creationTimestamp
          totalSupply
          currentSupply
          toaster
          __typename
          items(orderDirection:desc, first: 50, orderBy: timestamp) {
            id
            timestamp
            owner {
              id
            }
          }
        }
      }`,
      operationName: "getMintCollectionData",
      variables: {
        tokenId: parseInt(tokenId),
      },
    },
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (res.data && res.data.data && res.data.data.event) {
    var uriData = {};
    uriData = await fetchDataFromIPFS(
      res.data.data.event.uri.replace("ipfs://", "").replace("ipfs://", "")
    );
    // sort res.data.data.item by id
    // res.data.data.event.items.sort((a: { id: number }, b: { id: number }) => {
    //   return a.id - b.id;
    // });
    return { ...res.data.data, uriData };
  } else {
    return null;
  }
};
