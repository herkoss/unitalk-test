import { createReducer } from '@reduxjs/toolkit';

import {
  operatorsFetchFulfilled,
  operatorsFetchPending,
  operatorsFetchRejected
} from './operator.actions';
import { IOperatorState } from './types';

const operatorsInitialState: IOperatorState = {
  operators: {
    data: [],
    error: null,
    isLoading: false
  }
};

export const operatorReducer = createReducer(operatorsInitialState, (builder) => {
  builder.addCase(operatorsFetchPending, (state) => {
    state.operators.data = [];
    state.operators.error = null;
    state.operators.isLoading = true;
  });
  builder.addCase(operatorsFetchFulfilled, (state, { payload }) => {
    state.operators.data = payload;
    state.operators.error = null;
    state.operators.isLoading = false;
  });
  builder.addCase(operatorsFetchRejected, (state, { payload }) => {
    state.operators.data = [];
    state.operators.error = payload;
    state.operators.isLoading = false;
  });
});
