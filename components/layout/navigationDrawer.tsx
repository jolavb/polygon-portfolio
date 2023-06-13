// UI Components
import {
  Drawer,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Collapse,
  Box,
} from "@mui/material";

//Images
import polySplash from "./img/polySplash.png";

// Icons
import WorkIcon from "@mui/icons-material/Work";
import HomeIcon from "@mui/icons-material/Home";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";

//Contexts
import usePortfolios from "@/contexts/portfoliosContext";

//React
import { useState } from "react";

// Next Components
import { useRouter } from "next/router";
import Image from "next/image";
import Link from "next/link";

//Styles
import { useTheme } from "@mui/material/styles";

//Local Components
import PortfolioCreateComponent from "../portfolio/portfolioCreate";

//Constants
const DRAWER_WIDTH = 240;

const NavigationDrawer: React.FC = (): React.ReactNode => {
  const theme = useTheme();
  const { portfolios, createPortfolio } = usePortfolios();
  const [isPortfoliosOpen, setIsPortfoliosOpen] = useState<boolean>(true);

  const handleExpandPortfolio = () => {
    setIsPortfoliosOpen(!isPortfoliosOpen);
  };

  const router = useRouter();
  const portfolioID = router.query.portfolioID;

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
      <Box
        sx={{
          backgroundColor: theme.palette.primary.main,
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Image height={64} alt="polyicon" src={polySplash} />
      </Box>
      <Divider />
      <List>
        <Link href="/">
          <ListItem key={"Home"} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <HomeIcon />
              </ListItemIcon>
              <ListItemText primary={"Home"} />
            </ListItemButton>
          </ListItem>
        </Link>

        <ListItem
          key={"portfolios"}
          onClick={handleExpandPortfolio}
          disablePadding
        >
          <ListItemButton>
            <ListItemIcon>
              <WorkIcon />
            </ListItemIcon>
            <ListItemText primary="Portfolios" />
            {isPortfoliosOpen ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
        </ListItem>
        <Divider />

        <Collapse in={isPortfoliosOpen} timeout="auto" unmountOnExit>
          <List>
            {Object.keys(portfolios).map((pk) => {
              return (
                <Link href={`/portfolios/${pk}`} key={pk}>
                  <ListItem key={pk} disablePadding>
                    <ListItemButton selected={portfolioID === pk}>
                      <ListItemText primary={portfolios[pk].name} />
                    </ListItemButton>
                  </ListItem>
                </Link>
              );
            })}
            <ListItem>
              <PortfolioCreateComponent
                handleCreatePortfolio={createPortfolio}
              />
            </ListItem>
          </List>
        </Collapse>
      </List>
    </Drawer>
  );
};

export default NavigationDrawer;
export { DRAWER_WIDTH };
