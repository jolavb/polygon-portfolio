import {
  Drawer,
  Toolbar,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";

import WorkIcon from "@mui/icons-material/Work";
import { usePortfolios } from "@/contexts/portfoliosContext";
import Link from "next/link";
import { PortfolioCreateComponent } from "./portfolio/portfolioCreate";

const DRAWER_WIDTH = 240;

export const NavigationDrawer: React.FC = () => {
  const { portfolios, createPortfolio } = usePortfolios();

  return (
    <Drawer
      sx={{
        width: DRAWER_WIDTH,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: DRAWER_WIDTH,
          boxSizing: "border-box",
        },
      }}
      variant="permanent"
      anchor="left"
    >
      <Toolbar />
      <Divider />
      <List>
        <ListItem key={"portfolios"} disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <WorkIcon />
            </ListItemIcon>
            <ListItemText primary={"Portfolios"} />
          </ListItemButton>
        </ListItem>
        <PortfolioCreateComponent handleCreatePortfolio={createPortfolio} />

        {portfolios.map((p) => {
          return (
            <ListItem key={p.id} disablePadding>
              <Link href={`/portfolios/${p.id}`} key={p.id}>
                <ListItemButton>
                  <ListItemIcon>
                    <WorkIcon />
                  </ListItemIcon>
                  <ListItemText primary={p.name} />
                </ListItemButton>
              </Link>
            </ListItem>
          );
        })}
      </List>
    </Drawer>
  );
};
