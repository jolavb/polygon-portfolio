import { Autocomplete, TextField } from "@mui/material";

import { ITicker } from "@/contexts/portfoliosContext";

import polygonClient from "@/clients/polygonClient";
import { useState } from "react";

interface ITickerSearchProps {
  onSelectTicker: (selected: ITicker) => void;
  inputTextLabel: string;
}

const TickerSearch: React.FC<ITickerSearchProps> = ({
  onSelectTicker,
  inputTextLabel,
}) => {
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
      onChange={(_, v) => onSelectTicker(v.value)}
      options={tickerOptions.map((option) => {
        return {
          label: `${option.ticker}-${option.name}`,
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
};

export default TickerSearch;
