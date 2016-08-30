import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import createLogger from 'redux-logger';
import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import rootReducer from './reducers';
import App from './app';
import MyBar from './components/mybar';
import Search from './containers/search';
import requireAuth from './components/auth/require-auth';

const loggerMiddleware = createLogger();

const store = createStore(
  rootReducer,
  applyMiddleware(
    thunkMiddleware, // lets us dispatch() functions
    loggerMiddleware // neat middleware that logs actions
  )
);

render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={App}>
        <IndexRoute component={Search} />
        <Route path="mybar" component={requireAuth(MyBar)}></Route>
      </Route>
    </Router>
  </Provider>
  , document.getElementById('root'));
