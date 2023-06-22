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
        let addressMacth = 0;
        let valueMatch = 0;
        // eslint-disable-next-line array-callback-return
        response.accounts.map((res) => {
          if(res.is_valid_acc){
            addressMacth = ++addressMacth
            if(res.balance_diff === 0 ){
              valueMatch = ++ valueMatch
            }
          }
        })
        let valueUnMatch = response.accounts.length - valueMatch;
        return {
          list: [...response.accounts],
          count: response.accounts.length,
          response,
          addressMacth: addressMacth,
          valueMatch: valueMatch,
          valueUnMatch: valueUnMatch
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
      return { list: walletList, count: 0, response, addressMacth: 0, valueMatch: 0, valueUnMatch: 0 };
    } catch (error) {
      dispatch(clearLoading1());
      error.message &&
        dispatch(showMessage({ message: error.message, variant: "error" }));
      return { list: walletList, count: 0, response: { status: false }, addressMacth: 0, valueMatch: 0, valueUnMatch: 0 };
    }
  }
);

const createWalletSlice = createSlice({
  name: "wallet",
  initialState: {
    walletList: [],
    walletCount: 10,
    addressMacth: 10,
    valueMatch: 5,
    valueUnMatch: 5,
  },
  reducers: {},
  extraReducers: {
    [getWalletList.fulfilled]: (state, action) => ({
      ...state,
      walletList: action.payload.list,
      walletCount: action.payload.count,
      addressMacth: action.payload.addressMacth,
      valueMatch: action.payload.valueMatch,
      valueUnMatch: action.payload.valueUnMatch,
    }),
    [createWallet.fulfilled]: (state, action) => ({
      ...state,
      walletList: action.payload.list,
      walletCount: action.payload.count,
      addressMacth: action.payload.addressMacth,
      valueMatch: action.payload.valueMatch,
      valueUnMatch: action.payload.valueUnMatch,
    }),
  },
});
export const { dashboardList } = createWalletSlice.actions;

export default createWalletSlice.reducer;
