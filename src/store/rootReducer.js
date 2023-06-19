import { combineReducers } from '@reduxjs/toolkit';
import message from './messageSlice';
import dashboard from './createfundSlice';
import loading from './loaderSlice';

const createReducer = (asyncReducers) =>
  combineReducers({
    message,
    dashboard,
    loading,
    ...asyncReducers
  });

export default createReducer;
