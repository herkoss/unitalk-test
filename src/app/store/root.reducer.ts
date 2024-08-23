import { combineReducers } from '@reduxjs/toolkit';

import { operatorReducer } from '@/entity/operator';

const rootStateReducersMap = {
  operator: operatorReducer
};

export const rootReducer = combineReducers(rootStateReducersMap);
