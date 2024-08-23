import { createAction } from '@reduxjs/toolkit';
import type { OperatorMergedOperatorAddon } from './types';

export const operatorsFetchPending = createAction('operators/OPERATORS_FETCH_PENDING');
export const operatorsFetchFulfilled = createAction<Array<OperatorMergedOperatorAddon>>(
  'operators/OPERATORS_FETCH_FULFILLED'
);
export const operatorsFetchRejected = createAction<string>('operators/OPERATORS_FETCH_REJECTED');
