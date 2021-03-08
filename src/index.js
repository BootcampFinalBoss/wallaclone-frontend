import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';

import App from './components/App/index';
import 'semantic-ui-css/semantic.min.css';
import storage from './utils/storage';

import { configureClient } from './api/client';
import { configureStore, history } from './store';
import './css/styles.css';

// Read token from storage
const auth = storage.get('auth') || { token: null, username: null };

// Configure api client
configureClient(auth.token);

// Create and configure a redux store
const store = configureStore({ auth: auth });

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <App />
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root'),
);
