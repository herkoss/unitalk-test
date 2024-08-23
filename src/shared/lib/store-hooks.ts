import {
  TypedUseSelectorHook,
  useDispatch as useReduxDispatch,
  useSelector as useReduxSelector
} from 'react-redux';

import { AppDispatch, AppState } from '@/app/store/types';

export const useSelector: TypedUseSelectorHook<AppState> = useReduxSelector;

export const useDispatch = useReduxDispatch.withTypes<AppDispatch>();
