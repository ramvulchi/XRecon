import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import { Link, useLocation } from 'react-router-dom';
import CssBaseline from '@mui/material/CssBaseline';
import MuiDrawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
// import Badge from '@mui/material/Badge';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import NotificationsIcon from '@mui/icons-material/Notifications';
import Grid from '@mui/material/Grid';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { List, ListItemButton, ListItemIcon, ListItemText, LinearProgress } from '@mui/material';
import DatasetIcon from '@mui/icons-material/Dataset';
import PaidIcon from '@mui/icons-material/Paid';
import WalletIcon from '@mui/icons-material/Wallet';
import Router from '../routes';
import Message from '../component/formsy/message/Message';
import { ProgressBarStyle } from '../component/ProgressBar';

const drawerWidth = 250;
const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open'
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  background: '#fee500',
  color: '#000',
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  })
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== 'open'
})(({ theme, open }) => ({
  '& .MuiDrawer-paper': {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    background: '#f7ee94',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    }),
    boxSizing: 'border-box',
    ...(!open && {
      overflowX: 'hidden',
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up('sm')]: {
        width: theme.spacing(9)
      }
    })
  }
}));

const mdTheme = createTheme({
  palette: {
    primary: {
      light: '#f7ee94',
      main: '#fee500',
      dark: '#fee500',
      contrastText: '#ffffff'
    },
    // secondary: {
    //   light: '#006097',
    //   main: '#006097',
    //   dark: '#006097',
    //   contrastText: '#272727'
    // },
    background: {
      paper: '#FFFFFF',
      default: '#FFFFFF'
    }
  }
});
function Themebar() {
  const location = useLocation();
  const [open, setOpen] = useState(true);
  const loading3 = useSelector(({ loading }) => loading.loading3);

  const toggleDrawer = () => {
    setOpen(!open);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <ThemeProvider theme={mdTheme}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar position="absolute" open={open}>
          <Toolbar
            sx={{
              pr: '24px'
            }}>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={toggleDrawer}
              sx={{
                marginRight: '36px',
                ...(open && { display: 'none' })
              }}>
              <MenuIcon />
            </IconButton>
            <Typography component="h1" variant="h6" color="inherit" noWrap sx={{ flexGrow: 1 }}>
              Blockchain Analyzer - Reconciler
            </Typography>
            <IconButton color="inherit">
              {/* <Badge badgeContent={4} color="secondary"> */}
              <NotificationsIcon />
              {/* </Badge> */}
            </IconButton>
          </Toolbar>
        </AppBar>
        <Drawer variant="permanent" open={open}>
          <Toolbar
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              px: [1]
            }}>
            <Grid container direction="row" justifyContent="center" alignItems="center">
              <Grid item>
                {open && (
                  <Typography sx={{ mr: 4, ml: 2 }} fontWeight={'bold'} variant="h6">
                    XRecon
                  </Typography>
                )}
              </Grid>
              <Grid item>
                <IconButton color="inherit" sx={{ ml: 5 }} onClick={() => handleDrawerClose()}>
                  {!open ? <ChevronRightIcon /> : <ChevronLeftIcon />}
                </IconButton>
              </Grid>
            </Grid>
          </Toolbar>
          <Divider />
          <Grid container direction="row">
            <Grid item>
              <List sx={{ mt: 2 }}>
                <ListItemButton
                  to="/dashboard"
                  component={Link}
                  role="button"
                  selected={location.pathname === '/dashboard'}>
                  <ListItemIcon>
                    <WalletIcon />
                  </ListItemIcon>
                  <ListItemText primary="Wallet Verification" />
                </ListItemButton>
                <ListItemButton
                  role="button">
                  <ListItemIcon>
                    <PaidIcon />
                  </ListItemIcon>
                  <ListItemText primary="Transaction Verification" />
                </ListItemButton>
                <ListItemButton
                  role="button">
                  <ListItemIcon>
                    <DatasetIcon />
                  </ListItemIcon>
                  <ListItemText primary="Undisclosed Data" />
                </ListItemButton>
              </List>
            </Grid>
          </Grid>
        </Drawer>
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === 'light' ? theme.palette.grey[100] : theme.palette.grey[900],
            flexGrow: 1,
            height: '100vh',
            overflow: 'auto'
          }}>
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
