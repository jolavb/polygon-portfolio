import { Layout } from "@/components/layout";
import { Container, Grid, Toolbar } from "@mui/material";

import {
  usePortfolios,
  IPortfolio,
  ITicker,
  ITickerSnapshot,
  emptyTickerSnapshot,
  emptyAggregate,
  ITickerAggregate,
} from "@/contexts/portfoliosContext";

import { PortfolioCreateComponent } from "@/components/portfolio/portfolioCreate";
import PortfolioComponent from "@/components/portfolio/portfolio";
import polygonClient from "@/utils/polygonClient";
import moment from "moment";

export default function Portfolios() {
  return <>hello</>;
}

// export default function Portfolios() {
//   const {
//     portfolios,
//     createPortfolio,
//     deletePortfolio,
//     addTickerToPortfolio,
//     removeTickerFromPortfolio,
//   } = usePortfolios();

//   const getTickerSnapshots = (
//     portfolioID: string,
//     tickersToLoad: ITicker[]
//   ): Promise<ITickerSnapshot[]> => {
//     return polygonClient.stocks
//       .snapshotAllTickers({
//         tickers: tickersToLoad?.map((t) => t.ticker).join(","),
//       })
//       .then((v) => {
//         const snapShopTickers = v.tickers;
//         if (snapShopTickers) {
//           return snapShopTickers.map((ss) => {
//             return {
//               latestMinClosePrice: ss.min?.c || 0,
//               prevDayClosePrice: ss.prevDay?.c || 0,
//               todaysChange: ss.todaysChange || 0,
//               todaysChangePercentage: ss.todaysChangePerc || 0,
//             };
//           });
//         } else {
//           return [emptyTickerSnapshot()];
//         }
//       });
//   };

//   const getTickerAggregates = (
//     ticker: ITicker
//   ): Promise<ITickerAggregate[]> => {
//     let currentDate = moment();
//     let sevenDaysAgo = currentDate.clone().subtract(7, "day");
//     console.log(currentDate, sevenDaysAgo);

//     return polygonClient.stocks
//       .aggregates(
//         ticker.ticker,
//         1,
//         "day",
//         sevenDaysAgo.format("YYYY-MM-DD"),
//         currentDate.format("YYYY-MM-DD")
//       )
//       .then((v) => {
//         return (
//           v.results?.map((t) => {
//             return {
//               timestamp: t.t || 0,
//               price: t.c || 0,
//             };
//           }) || [emptyAggregate()]
//         );
//       })
//       .catch((err) => {
//         console.error(err);
//         return [emptyAggregate()];
//       });
//   };

//   const handleAddTickerToPortfolio = async (
//     portfolioId: string,
//     ticker: ITicker
//   ) => {
//     let portfolioToUpdate = portfolios.find((p) => p.id == portfolioId);
//     // we could inject data here w/ the tickers price etc.

//     if (portfolioToUpdate) {
//       let snapShopResults = await getTickerSnapshots(portfolioId, [ticker]);
//       let tickerAggregates = await getTickerAggregates(ticker);

//       ticker.snapShot = snapShopResults[0];
//       ticker.aggregates = tickerAggregates;

//       setPorfolio([
//         ...portfolios.filter((p) => p.id !== portfolioId),
//         {
//           ...portfolioToUpdate,
//           tickers: [...portfolioToUpdate.tickers, ticker],
//         },
//       ]);
//     }
//   };

//   const handleRemoveTickerFromPortfolio = (
//     portfolioId: string,
//     ticker: ITicker
//   ) => {
//     let portfolioToUpdate = portfolios.find((p) => p.id == portfolioId);

//     if (portfolioToUpdate) {
//       if (portfolioToUpdate) {
//         setPorfolio([
//           ...portfolios.filter((p) => p.id !== portfolioId),
//           {
//             ...portfolioToUpdate,
//             tickers: portfolioToUpdate.tickers.filter(
//               (et) => et.ticker !== ticker.ticker
//             ),
//           },
//         ]);
//       }
//     }
//   };

//   const handlePortfolioDelete = (portfolioId: string) => {
//     let portfolioToUpdate = portfolios.find((p) => p.id == portfolioId);
//     if (portfolioToUpdate) {
//       setPorfolio([...portfolios.filter((p) => p.id !== portfolioId)]);
//     }
//   };

//   return (
//     <Layout>
//       <Grid
//         container
//         sx={{
//           paddingTop: "20px",
//         }}
//       >
//         <Toolbar />

//         <Grid item xs={12}>
//           {portfolios
//             .sort((a, b) => (a.id > b.id ? 1 : -1))
//             .map((pf) => {
//               return (
//                 <PortfolioComponent
//                   key={pf.name}
//                   portfolio={pf}
//                   handleRemoveTickerFromPortfolio={
//                     handleRemoveTickerFromPortfolio
//                   }
//                   deletePortfolio={handlePortfolioDelete}
//                   handleAddTickerToPortfolio={handleAddTickerToPortfolio}
//                 />
//               );
//             })}
//         </Grid>
//         <PortfolioCreateComponent createPortfolio={handleCreatePortfolio} />
//       </Grid>
//     </Layout>
//   );
// }
