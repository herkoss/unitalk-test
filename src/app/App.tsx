import { type FC } from 'react';
import { Provider } from 'react-redux';

import { Home } from '@/pages/Home';

import { store } from './store/create-store';

export const App: FC = () => (
  <Provider store={store}>
    <Home />
  </Provider>
);
