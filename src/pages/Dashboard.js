import React, { Fragment, useState, useRef, useEffect } from "react";
import { CssBaseline } from "@mui/material";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { LoadingButton } from "@mui/lab";
import { useForm } from "react-hook-form";
import Paper from "@mui/material/Paper";
import {
  Grid,
  Tooltip,
  IconButton,
  Typography,
  Toolbar,
  Button,
  Dialog,
  Box,
  Card,
  Stack,
  FormHelperText,
  CircularProgress,
  Table,
} from "@mui/material";
import { Icon } from "@iconify/react";
import { useDispatch, useSelector } from "react-redux";
import { fData } from "../components/formatNumber";
import { createWallet } from "../store/createWalletSlice";
import ReactApexChart from "react-apexcharts";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import FormProvider from "../components/hook-form/FormProvider";

const Dashboard = () => {
  const dispatch = useDispatch();
  const loading1 = useSelector(({ loading }) => loading.loading1);
  const tableData = useSelector(({ wallet }) => wallet.walletList);
  const addressMacth = useSelector(({ wallet }) => wallet.addressMacth);
  const valueMatch = useSelector(({ wallet }) => wallet.valueMatch);
  const valueUnMatch = useSelector(({ wallet }) => wallet.valueUnMatch);

  const [series, setSeries] = useState([]);
  const [options] = useState({
    chart: {
      width: 380,
      type: "pie",
    },
    colors: ["#2cd4d9", "#ee3a3a"],
    labels: ["Macth", "Mis-Match"],
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 200,
          },
          legend: {
            position: "bottom",
          },
        },
      },
    ],
  });
  const [series1, setSeries1] = useState([]);
  const [options1] = useState({
    chart: {
      width: 380,
      type: "pie",
    },
    colors: ["#2cd4d9"],
    labels: ["Macth"],
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 200,
          },
          legend: {
            position: "bottom",
          },
        },
      },
    ],
  });
  const [series2, setSeries2] = useState([]);
  const [options2] = useState({
    chart: {
      width: 380,
      type: "pie",
    },
    colors: ["#2cd4d9", "#ee3a3a"],
    labels: ["Macth", "Mis-Match"],
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 200,
          },
          legend: {
            position: "bottom",
          },
        },
      },
    ],
  });

  const [openDialog, setOpenDialog] = useState(false);
  const fileInputRef = useRef(null);

  const defaultValues = {
    csv_file: null,
  };

  const xrplSchema = Yup.object().shape({
    csv_file: Yup.mixed()
      .required("CSV file is required")
      .test("fileSize", "File size too large, max file size is 3 Mb", (file) =>
        file && file.size ? file.size <= 3000000 : true
      )
      .test("fileType", "Unsupported File Format", (file) =>
        file && file.size ? [".csv", "text/csv"].includes(file?.type) : true
      ),
  });

  const methods = useForm({
    resolver: yupResolver(xrplSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    setValue,
    register,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = methods;
  const values = watch();

  const rows = [
    {
      id: "address",
      numeric: true,
      disablePadding: false,
      label: "Address",
    },
    {
      id: "client_balance",
      numeric: true,
      disablePadding: false,
      label: "Client Balance",
    },
    {
      id: "ledger_balance",
      numeric: true,
      disablePadding: false,
      label: "Ledger Balance",
    },
    {
      id: "balance_diff",
      numeric: true,
      disablePadding: false,
      label: "Balance Difference",
    },
    {
      id: "balance_diff_per",
      numeric: true,
      disablePadding: false,
      label: "Balance Difference Percentage",
    },
  ];

  useEffect(()=> {
    setSeries([valueMatch, valueUnMatch])
    setSeries1([addressMacth])
    setSeries2([valueMatch, valueUnMatch])
  },[addressMacth, valueMatch, valueUnMatch])

  const createFun = () => {
    reset();
    setOpenDialog(true);
  };

  const closeFun = () => {
    setOpenDialog(false);
  };

  const handleClickAttach = () => {
    fileInputRef.current?.click();
  };

  const handleRemove = () => {
    setValue("csv_file", null);
  };

  const onSubmit = (data, event) => {
    event.preventDefault();
    const target = { csv: data.csv_file };
    const target1 = new FormData();
    Object.keys(target).map((key) => target1.append(key, target[key]));
    dispatch(createWallet(target1)).then((res) => {
      if (res && res?.payload && res?.payload?.response?.status) {
        setOpenDialog(false);
      }
    });
  };

  return (
    <Box sx={{ p: 4, m: 2, mt: 8 }}>
      <CssBaseline />
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="baseline"
      >
        <Grid item>
          <Tooltip title="Add" arrow>
            <Button
              onClick={() => createFun()}
              size="large"
              variant="contained"
              sx={{ color: "#000" }}
              color="primary"
            >
              Create Recon
            </Button>
          </Tooltip>
        </Grid>
      </Grid>
      <br />
      <br />
      <Grid
        container
        direction="row"
        justifyContent="space-between"
        alignItems="baseline"
      >
        <Grid item>
          <Typography variant="title" sx={{ ml: 2, mb: 2 }}>
            Wallet Verification Overflow
          </Typography>
          <ReactApexChart
            options={options}
            series={series}
            type="pie"
            width={330}
          />
        </Grid>
        <Grid item>
          <Typography variant="title" sx={{ ml: 4, mb: 2 }}>
            Wallet Address Match
          </Typography>
          <ReactApexChart
            options={options1}
            series={series1}
            type="pie"
            width={310}
          />
        </Grid>
        <Grid item>
          <Typography variant="title" sx={{ ml: 8, mb: 2 }}>
            Value Match
          </Typography>
          <ReactApexChart
            options={options2}
            series={series2}
            type="pie"
            width={330}
          />
        </Grid>
      </Grid>
      <br />
      <br />
      {tableData?.length !== 0 && (
        <>
          <Grid
            container
            direction="row"
            justifyContent="space-between"
            alignItems="baseline"
          >
            <Grid item>
              <Typography variant="title">Wallet Verification</Typography>
            </Grid>
            <Grid item></Grid>
          </Grid>
          <br />
          <Paper sx={{ width: "100%", mb: 2 }}>
            <Grid
              container
              direction="row"
              justifyContent="space-between"
              alignItems="baseline"
            >
              <Grid item></Grid>
            </Grid>
            <TableContainer>
              <Table
                sx={{ minWidth: 750 }}
                size="small"
                aria-label="simple table"
              >
                <TableHead>
                  <TableRow>
                    {rows?.map((row) => (
                      <TableCell
                        key={row.id}
                        align="left"
                        sx={{ whiteSpace: "nowrap" }}
                      >
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
                    tableData?.map((res, key) => (
                      <Fragment key={key}>
                        <TableRow
                          sx={{
                            "&:last-child td, &:last-child th": { border: 0 },
                            "&:nth-of-type(odd)": {
                              backgroundColor: "success",
                            },
                            whiteSpace: "nowrap",
                          }}
                        >
                          <TableCell component="th" scope="row">
                            <Typography>{res.account}</Typography>
                          </TableCell>
                          <TableCell>
                            <Typography>{res.balance / 1000000}</Typography>
                          </TableCell>
                          <TableCell>{res.ledger_balance / 1000000}</TableCell>
                          <TableCell>{res.balance_diff / 1000000}</TableCell>
                          <TableCell>
                            {res.balance_diff_percent / 1000000}
                          </TableCell>
                        </TableRow>
                      </Fragment>
                    ))
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </>
      )}
      <Dialog
        open={openDialog}
        fullWidth
        maxWidth="sm"
        disableEscapeKeyDown={true}
        aria-labelledby="form-dialog-title"
        classes={{
          paper: "rounded-8",
        }}
      >
        <Toolbar>
          <Typography variant="h5" fontWeight={"bold"}>
            Upload CSV File
          </Typography>
        </Toolbar>
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
          <Box
            sx={{
              "& .MuiTextField-root": { mb: 1, mt: 0 },
              "& .react-tel-input.focused": { borderColor: "green" },
              m: 2,
            }}
          >
            <Grid
              container
              direction="row"
              justifyContent="center"
              alignItems="center"
            >
              <Grid item xs={12} md={12}>
                <Card sx={{ p: 4, mb: 4 }}>
                  <div>
                    <Stack direction="row" alignItems="center" spacing={3}>
                      <Button
                        color="primary"
                        fullWidth
                        variant="contained"
                        onClick={() => handleClickAttach()}
                        startIcon={<Icon icon="eva:cloud-upload-fill" />}
                      >
                        Upload CSV
                      </Button>
                    </Stack>
                    <div>
                      <Grid
                        container
                        direction="row"
                        justifyContent="space-between"
                        alignItems="baseline"
                      >
                        <Grid item>
                          <Box
                            sx={{
                              display: "flex",
                              justifyContent: "space-start",
                              p: 2,
                            }}
                          >
                            <Stack
                              direction="row"
                              alignItems="center"
                              spacing={1}
                            >
                              {values.csv_file?.name ? (
                                <Typography variant="subtitle2">
                                  {values.csv_file.name}
                                </Typography>
                              ) : (
                                <Typography variant="subtitle2">
                                  {values.csv_file}
                                </Typography>
                              )}
                              {values.csv_file?.size && (
                                <Typography
                                  variant="caption"
                                  sx={{ color: "text.secondary" }}
                                >
                                  {fData(values.csv_file.size)}
                                </Typography>
                              )}
                            </Stack>
                          </Box>
                        </Grid>
                        <Grid item>
                          {values.csv_file && (
                            <IconButton onClick={() => handleRemove()}>
                              <Icon
                                icon="material-symbols:cancel-rounded"
                                width="20"
                                height="20"
                              />
                            </IconButton>
                          )}
                        </Grid>
                      </Grid>
                    </div>
                    <input
                      {...register("csv_file")}
                      ref={fileInputRef}
                      type="file"
                      accept=".csv,text/csv"
                      onChange={(event) => {
                        const file = event.target.files?.[0];
                        setValue("csv_file", file);
                      }}
                      style={{ display: "none" }}
                    />
                    {!!errors?.csv_file && (
                      <FormHelperText sx={{ px: 2, display: "block" }} error>
                        {errors?.csv_file?.message}
                      </FormHelperText>
                    )}
                  </div>
                </Card>
              </Grid>
            </Grid>

            <Grid
              container
              direction="row"
              justifyContent="space-between"
              alignItems="baseline"
            >
              <Grid item>
                <LoadingButton
                  sx={{ mt: 1, mb: 0.5, px: 4, color: "#000" }}
                  variant="contained"
                  type="submit"
                  disabled={loading1}
                  color="primary"
                  loading={isSubmitting}
                >
                  {loading1 ? (
                    <CircularProgress size={24} color="inherit" />
                  ) : (
                    "Save"
                  )}
                </LoadingButton>
              </Grid>
              <Grid item>
                <Button
                  sx={{ mt: 1, mb: 1, px: 4 }}
                  variant="contained"
                  onClick={() => closeFun()}
                  color="error"
                  style={{ textTransform: "capitalize", fontSize: "16px" }}
                >
                  Close
                </Button>
              </Grid>
            </Grid>
          </Box>
        </FormProvider>
      </Dialog>
    </Box>
  );
};

export default Dashboard;
