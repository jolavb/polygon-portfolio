import * as React from "react";

import { Layout } from "@/components/layout";
import { Box, List, ListItem, ListItemText, Toolbar } from "@mui/material";
import polygonClient, {
  IGainersAndLosers,
  getGainersAndLosers,
} from "@/utils/polygonClient";
import { useEffect, useState } from "react";
import { ITicker } from "@/contexts/portfoliosContext";
import TickerTable from "@/components/ticker/tickerTable";
import TickerSearch from "@/components/ticker/tickerSearch";

const drawerWidth = 240;

interface Ticker {
  name: string;
  ticker: string;
}

export default function Home() {
  const [tickerList, setTickerList] = useState<IGainersAndLosers>({
    gainers: [],
    losers: [],
  });

  useEffect(() => {
    getGainersAndLosers().then((gl) => {
      setTickerList(gl);
    });
  }, []);

  return (
    <Box
      component="main"
      sx={{ flexGrow: 1, bgcolor: "background.default", p: 3 }}
    >
      <TickerTable tickers={tickerList.gainers} />
    </Box>
  );
}
