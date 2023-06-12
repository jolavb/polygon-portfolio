import React, { ReactNode } from "react";
import Box from "@mui/material/Box";

import CssBaseline from "@mui/material/CssBaseline";

import { AppBarComponent } from "./appBar";
import { NavigationDrawer } from "./navigationDrawer";
import { Container } from "@mui/system";
import { APP_BAR_HEIGHT } from "./appBar";

interface LayoutProps {
  children: ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBarComponent />
      <NavigationDrawer />
      <Container
        sx={{
          paddingTop: `${APP_BAR_HEIGHT + 10}px`,
        }}
      >
        {children}
      </Container>
    </Box>
  );
};
