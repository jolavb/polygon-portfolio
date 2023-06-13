import {
  Button,
  IconButton,
  TableCell,
  TableRow,
  Typography,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/DeleteForever";
import { ITicker } from "@/contexts/portfoliosContext";
import React from "react";

interface ITickerRowProps {
  ticker: ITicker;
  onDeleteTicker?: (tickerToDelete: ITicker) => void;
  handleTickerSelect: (selectedTicker: ITicker) => void;
}

const TickerRow: React.FC<ITickerRowProps> = ({
  ticker,
  onDeleteTicker,
  handleTickerSelect,
}): React.ReactNode => {
  const getChangeColor = (change: number | undefined): string => {
    if (change) {
      return change > 0 ? "green" : "red";
    } else {
      return "black";
    }
  };

  return (
    <TableRow key={ticker.ticker}>
      <TableCell aria-label="ticker name company" component="th" scope="row">
        <Button onClick={() => handleTickerSelect(ticker)}>
          <Typography variant={"overline"}>{ticker.ticker}</Typography>
        </Button>
      </TableCell>
      <TableCell aria-label="ticker name company" component="th" scope="row">
        <Typography variant={"overline"}>{ticker.name}</Typography>
      </TableCell>
      <TableCell component="th" scope="row">
        <Typography variant={"overline"}>
          {ticker.snapShot?.latestMinClosePrice || 0}
        </Typography>
      </TableCell>
      <TableCell component="th" scope="row">
        <Typography variant={"overline"}>
          {ticker.snapShot?.prevDayClosePrice || 0}
        </Typography>
      </TableCell>

      <TableCell component="th" scope="row">
        <Typography
          sx={{
            color: getChangeColor(ticker.snapShot?.todaysChangePercentage),
          }}
          variant={"overline"}
        >
          {ticker.snapShot?.todaysChangePercentage.toFixed(2) || 0}
        </Typography>
      </TableCell>

      <TableCell component="th" scope="row">
        <Typography
          sx={{
            color: getChangeColor(ticker.snapShot?.todaysChange),
          }}
          variant={"overline"}
        >
          {ticker.snapShot?.todaysChange.toFixed(2) || 0}
        </Typography>
      </TableCell>

      {onDeleteTicker ? (
        <TableCell component="th" scope="row">
          <IconButton
            onClick={() => onDeleteTicker(ticker)}
            aria-label="delete"
          >
            <DeleteIcon />
          </IconButton>
        </TableCell>
      ) : null}
    </TableRow>
  );
};

export default TickerRow;
