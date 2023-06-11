import React, { ReactNode } from "react";
import Box from "@mui/material/Box";

import CssBaseline from "@mui/material/CssBaseline";

import { AppBarComponent } from "./appBar";
import { NavigationDrawer } from "./NavigationDrawer";
import { Container } from "@mui/system";

interface LayoutProps {
  children: ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBarComponent />
      <NavigationDrawer />
      <Container>{children}</Container>
    </Box>
  );
};
