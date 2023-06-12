import { timeStamp } from "console";
import React, { createContext, useState, useContext } from "react";
import { getTickerAggregates, getTickerSnapshots } from "@/utils/polygonClient";

export const emptyTickerSnapshot = (): ITickerSnapshot => {
  return {
    latestMinClosePrice: 0,
    prevDayClosePrice: 0,
    todaysChange: 0,
    todaysChangePercentage: 0,
  };
};

export const emptyAggregate = (): ITickerAggregate => {
  return {
    timestamp: 0,
    price: 0,
  };
};

export interface ITickerSnapshot {
  latestMinClosePrice: number;
  prevDayClosePrice: number;
  todaysChange: number;
  todaysChangePercentage: number;
}

export interface ITickerAggregate {
  timestamp: number;
  price: number;
}

export interface ITicker {
  name: string;
  ticker: string;
  snapShot?: ITickerSnapshot;
  aggregates?: ITickerAggregate[];
}

export interface IPortfolio {
  id: string;
  name: string;
  tickers: ITicker[];
}

interface PortfoliosContextData {
  portfolios: IPortfolio[];
  createPortfolio: (newPortFolio: IPortfolio) => void;
  deletePortfolio: (portfolioID: string) => void;
  addTickerToPortfolio: (portfolioId: string, ticker: ITicker) => void;
  removeTickerFromPortfolio: (portfolioId: string, ticker: ITicker) => void;
}

const PortfoliosContext = createContext<PortfoliosContextData | undefined>(
  undefined
);

interface PortfolioProviderProps {
  children: React.ReactNode;
}

export const PortfoliosProvider: React.FC<PortfolioProviderProps> = ({
  children,
}) => {
  const [portfolios, setPorfolio] = useState<IPortfolio[]>([]);

  const createPortfolio = (newPortFolio: IPortfolio) => {
    setPorfolio([
      ...portfolios,
      {
        id: newPortFolio.id,
        name: newPortFolio.name,
        tickers: [],
      },
    ]);
  };

  const addTickerToPortfolio = async (portfolioId: string, ticker: ITicker) => {
    let portfolioToUpdate = portfolios.find((p) => p.id == portfolioId);
    // we could inject data here w/ the tickers price etc.

    if (portfolioToUpdate) {
      let snapShopResults = await getTickerSnapshots([ticker.ticker]);
      let tickerAggregates = await getTickerAggregates(ticker.ticker);

      ticker.snapShot = snapShopResults[0];
      ticker.aggregates = tickerAggregates;

      setPorfolio([
        ...portfolios.filter((p) => p.id !== portfolioId),
        {
          ...portfolioToUpdate,
          tickers: [...portfolioToUpdate.tickers, ticker],
        },
      ]);
    }
  };

  const removeTickerFromPortfolio = (portfolioId: string, ticker: ITicker) => {
    let portfolioToUpdate = portfolios.find((p) => p.id == portfolioId);

    if (portfolioToUpdate) {
      if (portfolioToUpdate) {
        setPorfolio([
          ...portfolios.filter((p) => p.id !== portfolioId),
          {
            ...portfolioToUpdate,
            tickers: portfolioToUpdate.tickers.filter(
              (et) => et.ticker !== ticker.ticker
            ),
          },
        ]);
      }
    }
  };

  const deletePortfolio = (portfolioId: string) => {
    let portfolioToUpdate = portfolios.find((p) => p.id == portfolioId);
    if (portfolioToUpdate) {
      setPorfolio([...portfolios.filter((p) => p.id !== portfolioId)]);
    }
  };

  return (
    <PortfoliosContext.Provider
      value={{
        portfolios,
        createPortfolio,
        addTickerToPortfolio,
        removeTickerFromPortfolio,
        deletePortfolio,
      }}
    >
      {children}
    </PortfoliosContext.Provider>
  );
};

export const usePortfolios = (): PortfoliosContextData => {
  const context = useContext(PortfoliosContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
