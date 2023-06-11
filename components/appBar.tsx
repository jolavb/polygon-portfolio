import { Toolbar, AppBar, Typography } from "@mui/material";
const DRAWER_WIDTH = 240;

export const AppBarComponent = () => {
  return (
    <AppBar
      position="fixed"
      sx={{
        width: `calc(100% - ${DRAWER_WIDTH}px)`,
        ml: `${DRAWER_WIDTH}px`,
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
