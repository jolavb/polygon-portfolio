import {
  TableContainer,
  TableBody,
  Table,
  TableHead,
  TableRow,
  TableCell,
  Paper,
} from "@mui/material";
import { ITicker } from "@/contexts/portfoliosContext";
import { TickerRow } from "./tickerRow";

interface ITickerTableProps {
  tickers: ITicker[];
  onDeleteTicker?: (tickerToDelete: ITicker) => void;
  handleTickerSelect: (selectedTicker: ITicker) => void;
}

export default function TickerTable({
  tickers,
  onDeleteTicker,
  handleTickerSelect,
}: ITickerTableProps) {
  return (
    <TableContainer component={Paper}>
      <Table aria-label="ticker table">
        <TableHead>
          <TableRow>
            <TableCell>Ticker</TableCell>
            <TableCell>Company</TableCell>
            <TableCell>Latest Price</TableCell>
            <TableCell>Prev. Day Close</TableCell>
            <TableCell>Change (%)</TableCell>
            <TableCell>Change ($)</TableCell>
            {onDeleteTicker ? <TableCell></TableCell> : null}
          </TableRow>
        </TableHead>
        <TableBody>
          {tickers.map((ticker) => (
            <TickerRow
              key={ticker.ticker}
              ticker={ticker}
              handleTickerSelect={handleTickerSelect}
              onDeleteTicker={onDeleteTicker}
            />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
