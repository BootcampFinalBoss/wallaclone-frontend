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
import { I18nProvider } from './intl';
import { LOCALES, STORAGE_KEY as INTL_KEY } from './intl/constants';

// Read token from storage
const auth = storage.get('auth') || { token: null, username: null };
const locale = storage.get(INTL_KEY) || LOCALES.SPANISH;

// Configure api client
configureClient(auth.token);

// Create and configure a redux store
const store = configureStore({ auth: auth, locale: locale });

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <I18nProvider>
        <App />
      </I18nProvider>
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root'),
);
