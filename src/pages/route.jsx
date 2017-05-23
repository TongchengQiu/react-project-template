import React from 'react';
import {
  BrowserRouter,
  Route,
  Link
} from 'react-router-dom';

/* eslint-disable */
function asyncComponent(getComponent) {
  return class AsyncComponent extends React.Component {
    static Component = null;
    state = { Component: AsyncComponent.Component };

    componentWillMount() {
      if (!this.state.Component) {
        getComponent().then(Component => {
          AsyncComponent.Component = Component
          this.setState({ Component })
        })
      }
    }
    render() {
      const { Component } = this.state
      if (Component) {
        return <Component {...this.props} />
      }
      return null
    }
  }
}
/* eslint-enable */

const Home = asyncComponent(() =>
  System.import('./Home').then(module => module.default)
);
const About = asyncComponent(() =>
  System.import('./About').then(module => module.default)
);

const AppRouter = () => (
  <BrowserRouter>
    <div className='route__container'>
      <ul>
        <li><Link to='/'>Home</Link></li>
        <li><Link to='/about'>About</Link></li>
        <li><Link to='/home'>Topics</Link></li>
      </ul>
      <Route exact path='/' component={Home} />
      <Route path='/home' component={Home} />
      <Route path='/about' component={About} />
    </div>
  </BrowserRouter>
);

export default AppRouter;
