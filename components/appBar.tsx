import { Toolbar, AppBar, Typography } from "@mui/material";
const DRAWER_WIDTH = 240;
const APP_BAR_HEIGHT = 64;

const AppBarComponent = () => {
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
