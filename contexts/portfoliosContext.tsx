import { timeStamp } from "console";
import React, { createContext, useState, useContext } from "react";

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
  setPorfolio: React.Dispatch<React.SetStateAction<IPortfolio[]>>;
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

  return (
    <PortfoliosContext.Provider value={{ portfolios, setPorfolio }}>
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
