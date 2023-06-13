import * as React from "react";

import { Grid, Typography } from "@mui/material";

const Home: React.FC = (): React.ReactNode => {
  return (
    <Grid
      container
      direction="column"
      alignItems="center"
      justifyContent="center"
      sx={{ minHeight: "50vh" }}
    >
      <Grid item>
        <Typography
          variant="h1"
          component="h2"
          color="text.secondary"
          gutterBottom
        >
          Polygon Portfolio
        </Typography>

        <Typography variant="h5" color="text.secondary" gutterBottom>
          An App For Tracking Your Stock Portfolios
        </Typography>

        <Typography variant="body1" color="text.secondary" gutterBottom>
          To get started, create a portfolio by adding one in the navigation bar
          on the left!
        </Typography>
      </Grid>
    </Grid>
  );
};

export default Home;
