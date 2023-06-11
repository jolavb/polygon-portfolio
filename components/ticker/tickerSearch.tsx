import { Autocomplete, TextField } from "@mui/material";

import { ITicker } from "@/contexts/portfoliosContext";

import polygonClient from "@/utils/polygonClient";
import { useState } from "react";

interface ITickerSearchProps {
  onSelectTicker?: (selected: ITicker) => void;
  inputTextLabel: string;
}

export default function TickerSearch({
  onSelectTicker,
  inputTextLabel,
}: ITickerSearchProps) {
  const [tickerOptions, setTickerOptions] = useState<ITicker[]>([]);

  const handleTickerSearch = (searchTerm: string) => {
    polygonClient.reference
      .tickers({
        search: searchTerm,
        limit: 30,
      })
      .then((response) => {
        return response.results;
      })
      .then((tickers) => {
        setTickerOptions(
          tickers.map((ticker) => {
            return {
              name: ticker.name,
              ticker: ticker.ticker,
            };
          })
        );
      });
  };

  return (
    <Autocomplete
      id="search-stocks"
      disableClearable
      onChange={(e, v) => (onSelectTicker ? onSelectTicker(v.value) : null)}
      options={tickerOptions.map((option) => {
        return {
          label: `${option.ticker} - ${option.name}`,
          value: option,
        };
      })}
      renderInput={(params) => (
        <TextField
          {...params}
          onChange={(e) => handleTickerSearch(e.target.value)}
          label={inputTextLabel}
          InputProps={{
            ...params.InputProps,
            type: "search",
          }}
        />
      )}
    />
  );
}
