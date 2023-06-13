import {
  ITickerAggregate,
  ITickerSnapshot,
  emptyAggregate,
  emptyTickerSnapshot,
} from "@/contexts/portfoliosContext";
import { restClient } from "@polygon.io/client-js";
import moment from "moment";

const polygonClient = restClient(process.env.NEXT_PUBLIC_POLYGON_API_KEY);

const getTickerAggregates = (ticker: string): Promise<ITickerAggregate[]> => {
  let currentDate = moment();
  let sevenDaysAgo = currentDate.clone().subtract(7, "day");

  return polygonClient.stocks
    .aggregates(
      ticker,
      1,
      "day",
      sevenDaysAgo.format("YYYY-MM-DD"),
      currentDate.format("YYYY-MM-DD")
    )
    .then((v) => {
      return (
        v.results?.map((t) => {
          return {
            timestamp: t.t || 0,
            price: t.c || 0,
          };
        }) || [emptyAggregate()]
      );
    })
    .catch((err) => {
      console.error(err);
      return [emptyAggregate()];
    });
};

const getTickerSnapshots = (
  tickersToLoad: string[]
): Promise<ITickerSnapshot[]> => {
  return polygonClient.stocks
    .snapshotAllTickers({
      tickers: tickersToLoad?.map((t) => t).join(","),
    })
    .then((v) => {
      const snapShopTickers = v.tickers;
      if (snapShopTickers) {
        return snapShopTickers.map((ss) => {
          return {
            latestMinClosePrice: ss.min?.c || 0,
            prevDayClosePrice: ss.prevDay?.c || 0,
            todaysChange: ss.todaysChange || 0,
            todaysChangePercentage: ss.todaysChangePerc || 0,
          };
        });
      } else {
        return [emptyTickerSnapshot()];
      }
    })
    .catch((err) => {
      console.error(err);
      return [emptyTickerSnapshot()];
    });
};

export default polygonClient;
export { getTickerAggregates, getTickerSnapshots };
