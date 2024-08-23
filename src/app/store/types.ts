import { rootReducer } from './root.reducer';
import { store } from './create-store';

export type AppState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
