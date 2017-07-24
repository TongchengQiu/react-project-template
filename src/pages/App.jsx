import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { Route, Switch } from 'react-router-dom';
import LazyRoute from 'lazy-route';
import DevTools from 'mobx-react-devtools';

@inject('store') @observer
export default class App extends Component {
  constructor(props) {
    super(props);
    this.store = this.props.store;
  }

  componentDidMount() {
    this.authenticate();
  }

  authenticate(e) {
    if (e) e.preventDefault();
    this.store.appState.authenticate();
  }

  render() {
    return (
      <div className='container'>
        {process.env.NODE_ENV !== 'production' && <DevTools />}
        <Switch>
          <Route
            exact
            path='/'
            render={props => (
              <LazyRoute {...props} component={import('./Home')} />
            )}
          />
          <Route
            exact
            path='/about'
            render={props => (
              <LazyRoute {...props} component={import('./About')} />
            )}
          />
          <Route
            render={props => (
              <LazyRoute {...props} component={import('./NotFound')} />
            )}
          />
        </Switch>
      </div>
    );
  }
}
