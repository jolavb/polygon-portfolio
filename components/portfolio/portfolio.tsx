import {
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  IconButton,
  Stack,
} from "@mui/material";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import DeleteIcon from "@mui/icons-material/DeleteForever";

import { IPortfolio, ITicker } from "@/contexts/portfoliosContext";
import TickerSearch from "../ticker/tickerSearch";
import TickerTable from "../ticker/tickerTable";
import { useState } from "react";
import { TickerDetails } from "../ticker/tickerDetails";

interface PortfolioComponentProps {
  portfolio: IPortfolio;
  deletePortfolio: (pid: string) => void;
  handleAddTickerToPortfolio: (pid: string, ticker: ITicker) => void;
  handleRemoveTickerFromPortfolio: (pid: string, ticker: ITicker) => void; // Could be utility fx
  tickers: ITicker[];
}

export default function PortfolioComponent({
  portfolio,
  tickers,
  deletePortfolio,
  handleAddTickerToPortfolio,
  handleRemoveTickerFromPortfolio,
}: PortfolioComponentProps): React.ReactNode {
  const [selectedTicker, setSelectedTicker] = useState<ITicker | null>(null);

  const tickerExistsInPortfolio = (t: ITicker) => {
    return (
      tickers.find((existingTicker) => existingTicker.ticker == t.ticker) !==
      undefined
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
    <Accordion>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <Typography>{portfolio.name}</Typography>
      </AccordionSummary>
      <AccordionDetails>
        {selectedTicker ? (
          <TickerDetails
            handleReturn={() => handleUpdateSelectedTicker(null)}
            ticker={selectedTicker}
          />
        ) : (
          <Stack spacing={2}>
            <TickerSearch
              inputTextLabel="Select Tickers"
              onSelectTicker={onAddTicker}
            />

            <TickerTable
              handleTickerSelect={(t) => handleUpdateSelectedTicker(t)}
              onDeleteTicker={onDeleteTicker}
              tickers={tickers}
            />
          </Stack>
        )}

        <IconButton
          onClick={() => deletePortfolio(portfolio.id)}
          aria-label="delete"
        >
          <DeleteIcon />
        </IconButton>
      </AccordionDetails>
    </Accordion>
  );
}
