import {
  TableContainer,
  TableBody,
  Table,
  TableHead,
  TableRow,
  TableCell,
  Paper,
  Card,
  Typography,
} from "@mui/material";
import { ITicker } from "@/contexts/portfoliosContext";
import TickerRow from "./tickerRow";
import { useTheme } from "@mui/material/styles";

interface ITickerTableProps {
  tickers: ITicker[];
  onDeleteTicker?: (tickerToDelete: ITicker) => void;
  handleTickerSelect: (selectedTicker: ITicker) => void;
}

const TickerTable: React.FC<ITickerTableProps> = ({
  tickers,
  onDeleteTicker,
  handleTickerSelect,
}): React.ReactNode => {
  const theme = useTheme();
  return (
    <TableContainer component={Paper}>
      {tickers.length > 0 ? (
        <Table aria-label="ticker table">
          <TableHead
            className={"TickerTableHeader"}
            sx={{ backgroundColor: theme.palette.secondary.light }}
          >
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
      ) : (
        <Card
          sx={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Typography variant={"overline"}>
            To Get Started, Search and Select Tickers Above{" "}
          </Typography>
        </Card>
      )}
    </TableContainer>
  );
};

export default TickerTable;
