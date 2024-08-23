import { configureStore, type Middleware } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';

import { AppState } from './types';
import { rootReducer } from './root.reducer';
import { rootSaga } from './root.saga';

const sagaMiddleware = createSagaMiddleware();
const middlewares: Array<Middleware<object, AppState>> = [sagaMiddleware];

const createAppStore = () => {
  const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: false,
        immutableCheck: false
      }).concat(middlewares)
  });

  sagaMiddleware.run(rootSaga);

  return store;
};

export const store = createAppStore();
