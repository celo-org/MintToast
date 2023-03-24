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
            event {
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
    // remove duplicate events where event id is the same
    const collection = res.data.data.user!.collection.filter(
      (item: { event: { id: any } }, index: any, self: any[]) =>
        index ===
        self.findIndex(
          (t: { event: { id: any } }) => t.event.id === item.event.id
        )
    );
    return collection;
  } else return [];
};
