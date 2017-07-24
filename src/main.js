import 'styles/index.scss';

import React from 'react';
import ReactDOM, { render } from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { useStrict } from 'mobx';
import { Provider } from 'mobx-react';
import { AppContainer } from 'react-hot-loader';
import { rehydrate, hotRehydrate } from 'rfx-core';

import App from './pages/App';
import stores from './stores';

const store = rehydrate();

useStrict(true);

const isProduction = (process.env.NODE_ENV === 'production');

const MOUNT_NODE = document.getElementById('root');

const renderDOM = (Component) => {
  render(
    <AppContainer>
      <Router>
        <Provider store={isProduction ? store : hotRehydrate()}>
          <Component />
        </Provider>
      </Router>
    </AppContainer>,
    MOUNT_NODE
  );
};

if (!isProduction) {
  if (window.devToolsExtension) {
    window.devToolsExtension.open();
  }
}

renderDOM(App);

if (module.hot) {
  module.hot.accept(() => {
    ReactDOM.unmountComponentAtNode(MOUNT_NODE);
    renderDOM(App);
  });
}

/* eslint-disable */
if (isProduction) {
  require('offline-plugin/runtime').install();
}
/* eslint-enable */
