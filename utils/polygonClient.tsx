import {
  ITicker,
  ITickerAggregate,
  ITickerSnapshot,
  emptyAggregate,
  emptyTickerSnapshot,
} from "@/contexts/portfoliosContext";
import { ISnapshotTickers, restClient } from "@polygon.io/client-js";
import { error } from "console";
import moment from "moment";
const polygonClient = restClient("QnqbMj19gklhXDQXpMsplQuO4rpqYvgM");
// Todo: put this in an env var.

export interface IGainersAndLosers {
  gainers: Partial<ITicker>[];
  losers: Partial<ITicker>[];
}

export const getGainersAndLosers = (): Promise<IGainersAndLosers> => {
  let gainersAndLosers: IGainersAndLosers = { gainers: [], losers: [] };

  const gainerPromise = polygonClient.stocks
    .snapshotGainersLosers("gainers")
    .then((gainers) => {
      gainersAndLosers.gainers =
        gainers.tickers?.map((ss) => {
          return {
            ticker: ss.ticker,
            snapShot: {
              latestMinClosePrice: ss.min?.c || 0,
              prevDayClosePrice: ss.prevDay?.c || 0,
              todaysChange: ss.todaysChange || 0,
              todaysChangePercentage: ss.todaysChangePerc || 0,
            },
          };
        }) || [];
    });

  const losersPromise = polygonClient.stocks
    .snapshotGainersLosers("losers")
    .then((gainers) => {
      gainersAndLosers.gainers =
        gainers.tickers?.map((ss) => {
          return {
            ticker: ss.ticker,
            snapShot: {
              latestMinClosePrice: ss.min?.c || 0,
              prevDayClosePrice: ss.prevDay?.c || 0,
              todaysChange: ss.todaysChange || 0,
              todaysChangePercentage: ss.todaysChangePerc || 0,
            },
          };
        }) || [];
    });

  return Promise.all([gainerPromise, losersPromise]).then(
    () => gainersAndLosers
  );
};

export const getTickerAggregates = (
  ticker: string
): Promise<ITickerAggregate[]> => {
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

export const getTickerSnapshots = (
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
