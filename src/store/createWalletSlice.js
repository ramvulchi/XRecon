import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { showMessage } from "./messageSlice";
import {
  startLoading3,
  clearLoading3,
  clearLoading1,
  startLoading1,
} from "./loaderSlice";
import {
  fetchWalletService,
  createWalletService,
} from "../services/walletService";

export const getWalletList = createAsyncThunk(
  "wallet/getWalletList",
  async (data, { dispatch, getState }) => {
    const state = getState();
    const { walletCount, walletList } = state.wallet;

    dispatch(startLoading3());
    try {
      const response = await fetchWalletService(data);
      if (response?.status) {
        dispatch(clearLoading3());
        return { list: response.accounts, count: response.length };
      }
      dispatch(clearLoading3());
      if (response?.error) {
        response?.error?.message &&
          dispatch(
            showMessage({ message: response?.error?.message, variant: "error" })
          );
      } else {
        response?.message &&
          dispatch(
            showMessage({ message: response?.message, variant: "error" })
          );
      }
      return { list: walletList, count: walletCount };
    } catch (error) {
      dispatch(clearLoading3());
      error.message &&
        dispatch(showMessage({ message: error.message, variant: "error" }));
      return { ist: walletList, count: walletCount };
    }
  }
);
export const createWallet = createAsyncThunk(
  "wallet/createWalletList",
  async (data, { dispatch, getState }) => {
    const state = getState();
    const walletList = state.wallet.walletList;
    const walletCount = state.wallet.walletCount;

    dispatch(startLoading1());
    try {
      const response = await createWalletService(data);
      if (response?.status) {
        dispatch(clearLoading1());
        dispatch(
          showMessage({
            message: "Wallet Created",
            variant: "success",
          })
        );
        return {
          list: [...response.accounts, ...walletList],
          count: Number(walletCount) + 1,
          response,
        };
      }
      dispatch(clearLoading1());
      if (response?.error) {
        response?.error?.message &&
          dispatch(
            showMessage({ message: response?.error?.message, variant: "error" })
          );
      } else {
        response?.message &&
          dispatch(
            showMessage({ message: response.message, variant: "error" })
          );
      }
      return { list: walletList, count: 0, response };
    } catch (error) {
      dispatch(clearLoading1());
      error.message &&
        dispatch(showMessage({ message: error.message, variant: "error" }));
      return { list: walletList, count: 0, response: { status: false } };
    }
  }
);

const createWalletSlice = createSlice({
  name: "wallet",
  initialState: {
    walletList: [],
    walletCount: 0,
  },
  reducers: {},
  extraReducers: {
    [getWalletList.fulfilled]: (state, action) => ({
      ...state,
      walletList: action.payload.list,
      walletCount: action.payload.count,
    }),
    [createWallet.fulfilled]: (state, action) => ({
      ...state,
      walletList: action.payload.list,
      walletCount: action.payload.count,
    }),
  },
});
export const { dashboardList } = createWalletSlice.actions;

export default createWalletSlice.reducer;
