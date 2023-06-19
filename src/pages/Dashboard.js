import React, { Fragment, useEffect, useState } from 'react';
import { CssBaseline } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import moment from 'moment/moment';
import Paper from '@mui/material/Paper';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import {
  Grid,
  Tooltip,
  IconButton,
  Typography,
  Toolbar,
  Button,
  Dialog,
  Box,
  CircularProgress,
  Table,
  Container
} from '@mui/material';
import AddSharpIcon from '@mui/icons-material/AddSharp';
import Formsy from 'formsy-react';
import { useSelector } from 'react-redux';
// import {
//   getdashboardList,
//   createDashboardList,
// } from '../store/createfundSlice';
import ReactApexChart from 'react-apexcharts';

const Dashboard = () => {
  // const dispatch = useDispatch();
  const navigate = useNavigate();
  const loading1 = useSelector(({ loading }) => loading.loading1);
  const tableData = useSelector(({ dashboard }) => dashboard.dashboardList);
  const [series] = useState([60, 40]);
  const [options] = useState(
    {
      chart: {
        width: 380,
        type: 'pie',
      },
      colors: [
        "#54ab54",
        "#ee3a3a"
      ],
      labels: ['Macth', 'Mis-Match'],
      responsive: [{
        breakpoint: 480,
        options: {
          chart: {
            width: 200
          },
          legend: {
            position: 'bottom'
          }
        }
      }]
    }
  )
  const [series1] = useState([100]);
  const [options1] = useState(
    {
      chart: {
        width: 380,
        type: 'pie',
      },
      colors: [
        "#54ab54",
      ],
      labels: ['Macth'],
      responsive: [{
        breakpoint: 480,
        options: {
          chart: {
            width: 200
          },
          legend: {
            position: 'bottom'
          }
        }
      }]
    }
  )
  const [series2] = useState([50, 50]);
  const [options2] = useState(
    {
      chart: {
        width: 380,
        type: 'pie',
      },
      colors: [
        "#54ab54",
        "#ee3a3a"
      ],
      labels: ['Macth', 'Mis-Match'],
      responsive: [{
        breakpoint: 480,
        options: {
          chart: {
            width: 200
          },
          legend: {
            position: 'bottom'
          }
        }
      }]
    }
  )

  const [openDialog, setOpenDialog] = useState(false);

  const rows = [
    {
      id: 'address',
      numeric: true,
      disablePadding: false,
      label: 'Address'
    },
    {
      id: 'client_balance',
      numeric: true,
      disablePadding: false,
      label: 'Client Balance'
    },
    {
      id: 'ledger_balance',
      numeric: true,
      disablePadding: false,
      label: 'Ledger Balance'
    },
    {
      id: 'balance_diff',
      numeric: true,
      disablePadding: false,
      label: 'Balance Difference'
    },
    {
      id: 'balance_diff_per',
      numeric: true,
      disablePadding: false,
      label: 'Balance Difference Percentage'
    },
  ];

  useEffect(() => {
    // dispatch(getdashboardList({}));
  }, []);

  const createFun = () => {
    setOpenDialog(true);
  };

  const closeFun = () => {
    setOpenDialog(false);
  };

  const handleSubmit = (data) => {
    // dispatch(createDashboardList(data)).then((res) => {
    //   if (res && res?.payload) {
    //     setOpenDialog(false);
    //   } else {
    //     setOpenDialog(true);
    //   }
    // });
  };

  return (
    <Container maxWidth={'xl'} sx={{ paddingBottom: '1.25rem', paddingTop: '1.25rem' }}>
      <CssBaseline />
      <Grid container direction="row" justifyContent="space-between" alignItems="baseline">
        <Grid item>
          <Typography variant="h6" sx={{ml: 2, mb: 2}}>Wallet Verification Overflow</Typography>
          <ReactApexChart options={options} series={series} type="pie" width={330} />
        </Grid>
        <Grid item>
          <Typography variant="h6" sx={{ml: 2, mb: 2}}>Wallet Address Match</Typography>
          <ReactApexChart options={options1} series={series1} type="pie" width={310} />
        </Grid>
        <Grid item>
          <Typography variant="h6" sx={{ml: 6, mb: 2}}>Value Match</Typography>
          <ReactApexChart options={options2} series={series2} type="pie" width={330} />
        </Grid>
      </Grid>
      <br />
      <br />
      <Grid container direction="row" justifyContent="space-between" alignItems="baseline">
        <Grid item>
          <Typography variant="h6">Wallet Verification</Typography>
        </Grid>
        <Grid item>
          <Tooltip title="Add" arrow>
            <IconButton
              onClick={() => createFun()}
              disableRipple
              sx={{ bgcolor: 'primary.main' }}>
              <AddSharpIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        </Grid>
      </Grid>
      <br />
      <Paper sx={{ width: '100%', mb: 2 }}>
        <Grid container direction="row" justifyContent="space-between" alignItems="baseline">
          <Grid item></Grid>
        </Grid>
        <TableContainer>
          <Table sx={{ minWidth: 750 }} size="small" aria-label="simple table">
            <TableHead>
              <TableRow>
                {rows?.map((row) => (
                  <TableCell key={row.id} align="center" sx={{ whiteSpace: 'nowrap' }}>
                    {row?.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {tableData?.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={4} align="center">
                    No Records Available
                  </TableCell>
                </TableRow>
              ) : (
                tableData?.map((res) => (
                  <Fragment key={res.id}>
                    <TableRow
                      key={res.id}
                      sx={{
                        '&:last-child td, &:last-child th': { border: 0 },
                        '&:nth-of-type(odd)': {
                          backgroundColor: 'success'
                        },
                        whiteSpace: 'nowrap'
                      }}>
                      <TableCell align="center">
                      </TableCell>
                      <TableCell component="th" scope="row">
                        <Typography>{res.fund_name}</Typography>
                      </TableCell>
                      <TableCell>
                      </TableCell>
                      <TableCell>{res.total_members}</TableCell>
                      <TableCell>{res.fund_amount}</TableCell>
                      <TableCell>{res.total_months}</TableCell>
                      <TableCell>{moment(res?.fund_start_date).format('DD-MM-YYYY')}</TableCell>
                      <TableCell>
                        <GroupAddIcon
                          cursor="pointer"
                          onClick={() =>
                            navigate('members', {
                              state: { res }
                            })
                          }
                        />
                      </TableCell>
                    </TableRow>
                  </Fragment>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
      <Dialog
        open={openDialog}
        fullWidth
        maxWidth="sm"
        disableEscapeKeyDown={true}
        aria-labelledby="form-dialog-title"
        classes={{
          paper: 'rounded-8'
        }}>
        <Toolbar>
          <Typography variant="h5" fontWeight={'bold'}>
            Upload CSV File
          </Typography>
        </Toolbar>
        <Formsy onValidSubmit={handleSubmit} name="registerForm">
          <Box
            sx={{
              '& .MuiTextField-root': { mb: 1, mt: 0 },
              '& .react-tel-input.focused': { borderColor: 'green' },
              m: 2
            }}>

            <Grid container direction="row" justifyContent="space-between" alignItems="baseline">
              <Grid item>
                <Button
                  sx={{ mt: 1, mb: 1, px: 4, color: '#000' }}
                  type="submit"
                  variant="contained"
                  color="primary"
                  aria-label="Register"
                  style={{ textTransform: 'capitalize', fontSize: '16px' }}>
                  {loading1 ? <CircularProgress size={24} color="inherit" /> : 'Save'}
                </Button>
              </Grid>
              <Grid item>
                <Button
                  sx={{ mt: 1, mb: 1, px: 4 }}
                  variant="contained"
                  onClick={() => closeFun()}
                  color="error"
                  style={{ textTransform: 'capitalize', fontSize: '16px' }}>
                  Close
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Formsy>
      </Dialog>
    </Container>
  );
};

export default Dashboard;
