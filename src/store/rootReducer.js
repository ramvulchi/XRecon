import { combineReducers } from "@reduxjs/toolkit";
import message from "./messageSlice";
import wallet from "./createWalletSlice";
import loading from "./loaderSlice";

const createReducer = (asyncReducers) =>
  combineReducers({
    message,
    wallet,
    loading,
    ...asyncReducers,
  });

export default createReducer;
