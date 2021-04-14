import React from 'react';
//import { AuthProvider } from './AuthProvider.android';
import Routes from './Routes';
import {Provider} from 'react-redux';

const Providers = ({store}) => {
  return (
    <Provider store={store}>
      <Routes />
    </Provider>
  );
};

export default Providers;
