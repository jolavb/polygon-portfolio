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

import { useRouter } from "next/router";

import QueryStatsIcon from "@mui/icons-material/QueryStats";
import WorkIcon from "@mui/icons-material/Work";

const DRAWER_WIDTH = 240;

export const NavigationDrawer: React.FC = () => {
  const router = useRouter();

  const navigate = (route: string) => {
    router.push(route);
  };

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
        <ListItem key={"discover"} disablePadding>
          <ListItemButton onClick={() => navigate("/")}>
            <ListItemIcon>
              <QueryStatsIcon />
            </ListItemIcon>
            <ListItemText primary={"Discover"} />
          </ListItemButton>
        </ListItem>
        <ListItem key={"portfolios"} disablePadding>
          <ListItemButton onClick={() => navigate("/portfolios")}>
            <ListItemIcon>
              <WorkIcon />
            </ListItemIcon>
            <ListItemText primary={"Portfolios"} />
          </ListItemButton>
        </ListItem>
      </List>
    </Drawer>
  );
};
