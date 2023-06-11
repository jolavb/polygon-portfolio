import * as React from "react";

import { Layout } from "@/components/layout";
import { Box, List, ListItem, ListItemText, Toolbar } from "@mui/material";
import polygonClient from "@/utils/polygonClient";
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
  const [tickerList, setTickerList] = useState<ITicker[]>([]);

  useEffect(() => {
    polygonClient.reference
      .tickers({
        limit: 10,
      })
      .then((response) => {
        return response.results;
      })
      .then((tickers: Ticker[]) => {
        setTickerList(tickers);
      });
  }, []);

  return (
    <Layout>
      <Toolbar />
      <Box
        component="main"
        sx={{ flexGrow: 1, bgcolor: "background.default", p: 3 }}
      >
        <TickerSearch inputTextLabel="Ticker Search" />
        <TickerTable tickers={tickerList} />
      </Box>
    </Layout>
  );
}
