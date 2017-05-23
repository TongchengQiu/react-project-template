import 'styles/index.scss';

import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';

import Root from './containers/Root';

import AppRouter from './pages/route';

const MOUNT_NODE = document.getElementById('root');

const render = (Component) => {
  ReactDOM.render(
    <AppContainer>
      <Component>
        <AppRouter />
      </Component>
    </AppContainer>,
    MOUNT_NODE
  );
};

if (process.env.NODE_ENV !== 'production') {
  if (window.devToolsExtension) {
    window.devToolsExtension.open();
  }
}

render(Root);

if (module.hot) {
  module.hot.accept('./main.js');
  module.hot.accept('./pages/route', () => {
    // ReactDOM.unmountComponentAtNode(MOUNT_NODE);
    // render(Root);
    window.location.reload();
  });
  module.hot.accept('./containers/Root', () => {
    ReactDOM.unmountComponentAtNode(MOUNT_NODE);
    render(Root);
  });
}

/* eslint-disable */
if (process.env.NODE_ENV === 'production') {
  require('offline-plugin/runtime').install();
}
/* eslint-enable */
