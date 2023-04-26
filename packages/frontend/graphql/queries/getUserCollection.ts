import { GRAPHQL_API } from "@/data/constant";
import axios from "axios";

export const getUserCollection = async (address: string) => {
  var res = await axios({
    url: GRAPHQL_API,
    method: "post",
    data: {
      query: `query getUserCollection($address: String!) {
        user(id: $address) {
          id
          collection {
            id
            serie {
              id
              creationTimestamp
              uri
            }
          }
        }
      }`,
      operationName: "getUserCollection",
      variables: {
        address: address.toLowerCase(),
      },
    },
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (res.data && res.data.data && res.data.data.user !== null) {
    // remove duplicate events where serie id is the same
    const collection = res.data.data.user!.collection.filter(
      (item: { serie: { id: any } }, index: any, self: any[]) =>
        index ===
        self.findIndex(
          (t: { serie: { id: any } }) => t.serie.id === item.serie.id
        )
    );
    return collection;
  } else return [];
};
