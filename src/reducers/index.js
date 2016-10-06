import { combineReducers } from 'redux';
import { reducer } from 'redux-form';
import authReducer from './auth';

import bars from './bars';
import loginscreen from './loginscreen';

const reducers = combineReducers({
  bars,
  loginscreen,
  form: reducer,
  auth: authReducer,
 });

export default reducers;
