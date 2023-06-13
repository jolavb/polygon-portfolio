import React, { createContext, useState, useContext } from "react";
import {
  getTickerAggregates,
  getTickerSnapshots,
} from "@/clients/polygonClient";

const emptyTickerSnapshot = (): ITickerSnapshot => {
  return {
    latestMinClosePrice: 0,
    prevDayClosePrice: 0,
    todaysChange: 0,
    todaysChangePercentage: 0,
  };
};

const emptyAggregate = (): ITickerAggregate => {
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

interface IPortfolios {
  [id: string]: IPortfolio;
}

interface PortfoliosContextData {
  portfolios: IPortfolios;
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

const PortfoliosProvider: React.FC<PortfolioProviderProps> = ({ children }) => {
  const [portfolios, setPortfolios] = useState<IPortfolios>({});

  const createPortfolio = (newPortFolio: IPortfolio) => {
    setPortfolios({
      ...portfolios,
      [newPortFolio.id]: {
        name: newPortFolio.name,
        id: newPortFolio.id,
        tickers: [],
      },
    });
  };

  const addTickerToPortfolio = async (portfolioId: string, ticker: ITicker) => {
    let portfolioToUpdate = portfolios[portfolioId];
    // we could inject data here w/ the tickers price etc.

    if (portfolioToUpdate) {
      let snapShopResults = await getTickerSnapshots([ticker.ticker]);
      let tickerAggregates = await getTickerAggregates(ticker.ticker);

      ticker.snapShot = snapShopResults[0];
      ticker.aggregates = tickerAggregates;

      setPortfolios({
        ...portfolios,
        [portfolioToUpdate.id]: {
          ...portfolioToUpdate,
          tickers: [...portfolioToUpdate.tickers, ticker],
        },
      });
    }
  };

  const removeTickerFromPortfolio = (portfolioId: string, ticker: ITicker) => {
    let portfolioToUpdate = portfolios[portfolioId];
    setPortfolios({
      ...portfolios,
      [portfolioId]: {
        ...portfolioToUpdate,
        tickers: portfolioToUpdate.tickers.filter(
          (existingTicker) => existingTicker.ticker !== ticker.ticker
        ),
      },
    });
  };

  const deletePortfolio = (portfolioId: string) => {
    let portfoliosCopy = { ...portfolios };
    delete portfoliosCopy[portfolioId];
    setPortfolios(portfoliosCopy);
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

const usePortfolios = (): PortfoliosContextData => {
  const context = useContext(PortfoliosContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};

export default usePortfolios;
export { PortfoliosProvider, emptyAggregate, emptyTickerSnapshot };
