import { call, put, takeEvery } from 'redux-saga/effects';

import { fetchOperatorsAddonsApiCall, fetchOperatorsApiCall } from '@/shared/api/api';

import {
  operatorsFetchFulfilled,
  operatorsFetchPending,
  operatorsFetchRejected
} from './operator.actions';
import type { OperatorAddon, OperatorRaw } from './types';
import { mapOperators } from './mappers';

function* fetchOperators() {
  try {
    const operators: Array<OperatorRaw> = yield call(fetchOperatorsApiCall);
    const operatorAddons: Array<OperatorAddon> = yield call(fetchOperatorsAddonsApiCall);

    yield put(operatorsFetchFulfilled(mapOperators(operators, operatorAddons)));
  } catch (error) {
    if (error instanceof Error) {
      yield put(operatorsFetchRejected(error.message));
    } else {
      yield put(operatorsFetchRejected('Something went wrong while loading operators'));
    }
  }
}

export function* watchFetchOperators() {
  yield takeEvery(operatorsFetchPending, fetchOperators);
}
