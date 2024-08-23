import { all } from 'redux-saga/effects';

import { watchFetchOperators } from '@/entity/operator/operator.saga';

export function* rootSaga() {
  yield all([watchFetchOperators()]);
}
