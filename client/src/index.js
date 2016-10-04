import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import createLogger from 'redux-logger';
import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import rootReducer from './reducers';
import App from './app';
import MyBar from './containers/mybar';
import Search from './containers/search';
import Settings from './containers/settings';
import Friends from './containers/friends';
import requireAuth from './components/auth/require-auth';
import {
  AUTH_USER
} from './actions/types';
import { signinUser, getSelectedBar } from './actions';
import { loadJwtToken } from './localstorage';

const loggerMiddleware = createLogger();

const store = createStore(
  rootReducer,
  compose(applyMiddleware(
    thunkMiddleware, // lets us dispatch() functions
    loggerMiddleware // neat middleware that logs actions
  ),
  window.devToolsExtension ? window.devToolsExtension() : f => f
));

const token = loadJwtToken();
if (token) {
  store.dispatch({ type: AUTH_USER });
  store.dispatch(getSelectedBar());
}

render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={App}>
        <IndexRoute component={Search} />
        <Route path="mybar" component={requireAuth(MyBar)} title="My bar"></Route>
        <Route path="settings" component={requireAuth(Settings)} title="Settings"></Route>
        <Route path="friends" component={requireAuth(Friends)} title="Friends"></Route>
      </Route>
    </Router>
  </Provider>
  , document.getElementById('root'));
