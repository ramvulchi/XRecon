import React, { useState } from "react";
import { useSelector } from "react-redux";
import { styled, createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { LinearProgress, Tabs, Tab } from "@mui/material";
import Router from "../routes";
import Message from "../components/message/Message";
import { ProgressBarStyle } from "../components/ProgressBar";

const drawerWidth = 0;
const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  background: `linear-gradient(135deg, #2cd4d9 50%, #2cd4d9 0 100%)`,
  color: "#000",
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const mdTheme = createTheme({
  palette: {
    primary: {
      light: "#2cd4d980",
      main: "#2cd4d9",
      dark: "#2cd4d9",
      contrastText: "#ffffff",
    },
    background: {
      paper: "#FFFFFF",
      default: "#FFFFFF",
    },
  },
});
function Themebar() {
  const [open, setOpen] = useState(true);
  const loading3 = useSelector(({ loading }) => loading.loading3);
  const [tabValue, setTabValue] = useState(2);

  const handleChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const toggleDrawer = () => {
    setOpen(!open);
  };

  return (
    <ThemeProvider theme={mdTheme}>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBar position="absolute" open={open}>
          <Toolbar
            sx={{
              pr: "24px",
            }}
          >
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={toggleDrawer}
              sx={{
                marginRight: "36px",
                ...(open && { display: "none" }),
              }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              sx={{ flexGrow: 1 }}
            >
              XRecon
            </Typography>
            <IconButton color="inherit">
              <Typography
                component="h1"
                variant="h6"
                color="inherit"
                noWrap
                sx={{ flexGrow: 1 }}
              >
                Blockchain Analyzer - Reconciler
              </Typography>
            </IconButton>
          </Toolbar>
          <Box sx={{ bgcolor: "background.paper" }}>
            <Tabs
              value={tabValue}
              onChange={handleChange}
              variant="fullWidth"
              indicatorColor="primary"
              textColor="inherit"
              aria-label="tabs"
            >
              <Tab
                sx={{ textTransform: "capitalize" }}
                disabled
                label="Understanding Wallets"
              />
              <Tab
                sx={{ textTransform: "capitalize" }}
                disabled
                label="Understanding Transactions"
              />
              <Tab
                sx={{ textTransform: "capitalize" }}
                label="Wallet Verification"
              />
              <Tab
                sx={{ textTransform: "capitalize" }}
                disabled
                label="Transaction Verification"
              />
              <Tab
                sx={{ textTransform: "capitalize" }}
                disabled
                label="Undisclosed Data"
              />
            </Tabs>
          </Box>
        </AppBar>
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === "light"
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: "100vh",
            overflow: "auto",
          }}
        >
          <Toolbar />
          <Message />
          <ProgressBarStyle />
          {loading3 ? (
            <LinearProgress sx={{ mt: 0, mb: 2 }} color="warning" />
          ) : (
            <Typography sx={{ m: 2.5 }} />
          )}
          <Router />
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default Themebar;
