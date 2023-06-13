import { Toolbar, AppBar, Typography } from "@mui/material";
import { DRAWER_WIDTH } from "./navigationDrawer";

const APP_BAR_HEIGHT = 64;

const AppBarComponent: React.FC = (): React.ReactNode => {
  return (
    <AppBar
      position="fixed"
      sx={{
        width: `calc(100% - ${DRAWER_WIDTH}px)`,
        ml: `${DRAWER_WIDTH}px`,
        top: "0",
      }}
    >
      <Toolbar>
        <Typography variant="h6" noWrap component="div">
          Polygon Portfolio
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export { DRAWER_WIDTH, APP_BAR_HEIGHT, AppBarComponent };
