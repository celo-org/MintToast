import { GRAPHQL_API } from "@/data/constant";
import axios from "axios";

export const getHistoricalTotalMints = async () => {
  var res = await axios({
    url: GRAPHQL_API,
    method: "post",
    data: {
      query: `query getHistoricalTotalMints {
        series(first: 200) {
          id
          currentSupply
        }
      }`,
      operationName: "getHistoricalTotalMints",
    },
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (res && res.data && res.data.data && res.data.data.series) {
    let totalMints = 0;
    res.data.data.series.forEach((item: { currentSupply: string }) => {
      totalMints = totalMints + parseInt(item.currentSupply);
    });
    return totalMints;
  } else {
    return null;
  }
};
