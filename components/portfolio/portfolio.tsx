import {
  IconButton,
  Stack,
  Card,
  CardContent,
  CardActions,
  Button,
} from "@mui/material";
import React, { useState } from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import DeleteIcon from "@mui/icons-material/DeleteForever";

import { IPortfolio, ITicker } from "@/contexts/portfoliosContext";
import TickerDetails from "../ticker/tickerDetails";
import TickerSearch from "../ticker/tickerSearch";
import TickerTable from "../ticker/tickerTable";

interface PortfolioComponentProps {
  portfolio: IPortfolio;
  handleDeletePortfolio: (pid: string) => void;
  handleAddTickerToPortfolio: (pid: string, ticker: ITicker) => void;
  handleRemoveTickerFromPortfolio: (pid: string, ticker: ITicker) => void; // Could be utility fx
}

const PortfolioComponent: React.FC<PortfolioComponentProps> = ({
  portfolio,
  handleDeletePortfolio,
  handleAddTickerToPortfolio,
  handleRemoveTickerFromPortfolio,
}): React.ReactNode => {
  const [selectedTicker, setSelectedTicker] = useState<ITicker | null>(null);

  const tickerExistsInPortfolio = (t: ITicker) => {
    return (
      portfolio.tickers.find(
        (existingTicker) => existingTicker.ticker == t.ticker
      ) !== undefined
    );
  };

  const onAddTicker = (selectedTickerName: ITicker) => {
    if (!tickerExistsInPortfolio(selectedTickerName)) {
      handleAddTickerToPortfolio(portfolio.id, selectedTickerName);
    }
  };

  const onDeleteTicker = (ticker: ITicker) => {
    handleRemoveTickerFromPortfolio(portfolio.id, ticker);
  };

  const handleUpdateSelectedTicker = (ticker: ITicker | null) => {
    setSelectedTicker(ticker);
  };

  return (
    <Card variant="outlined">
      {selectedTicker ? (
        <CardContent>
          <Stack spacing={2} direction="row">
            <IconButton
              disableRipple
              onClick={() => handleUpdateSelectedTicker(null)}
            >
              <ArrowBackIcon />
            </IconButton>
            <TickerDetails ticker={selectedTicker} />
          </Stack>
        </CardContent>
      ) : (
        <CardContent>
          <Stack spacing={2}>
            <TickerSearch
              inputTextLabel="Select Tickers"
              onSelectTicker={onAddTicker}
            />
            <TickerTable
              handleTickerSelect={(t) => handleUpdateSelectedTicker(t)}
              onDeleteTicker={onDeleteTicker}
              tickers={portfolio.tickers}
            />
          </Stack>
          <CardActions sx={{ float: "right", padding: "20px" }}>
            <Button
              color="error"
              onClick={() => handleDeletePortfolio(portfolio.id)}
              variant="outlined"
              disableElevation
            >
              Delete Portfolio
              <DeleteIcon />
            </Button>
          </CardActions>
        </CardContent>
      )}
    </Card>
  );
};

export default PortfolioComponent;
