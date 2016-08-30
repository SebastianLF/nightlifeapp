import axios from 'axios';
import { browserHistory } from 'react-router';
import {
  AUTH_USER,
  AUTH_ERROR
} from './types';

const hostname = window.location.hostname === 'localhost' ? 'http://localhost:3001' : window.location.hostname;

export const SET_SEARCH_LIST_SUCCESS = 'SET_SEARCH_LIST_SUCCESS';
export const SET_SEARCH_LIST_ERROR = 'SET_SEARCH_LIST_ERROR';
export const REQUEST_SEARCH_LIST = 'REQUEST_SEARCH_LIST';

export const SHOW_LOGINSCREEN = 'SHOW_LOGINSCREEN';
export const CLOSE_LOGINSCREEN = 'CLOSE_LOGINSCREEN';


export function showLoginscreen() {
  return {
    type: SHOW_LOGINSCREEN
  };
}

export function closeLoginscreen() {
  return {
    type: CLOSE_LOGINSCREEN
  };
}

export function signinUser({ email, password }) {
  return function(dispatch){
    axios.post(`${hostname}/signin`, {
      email,
      password
    })
    .then((response) => {

      dispatch({ type: AUTH_USER });

      // save JWT token to localstorage.
      try {
        localStorage.setItem('token', response.data.token);
      } catch (e) {
        console.log('Error writing token to localStorage');
      }

      dispatch(closeLoginscreen());

      browserHistory.push('/mybar');
    })
    .catch((error) => {

      dispatch(authError('Bad Login info'));
    });
  }
}

export function authError(error){
  return {
    type : AUTH_ERROR,
    payload: error
  }
}

export function findBars(city) {
  return function (dispatch) {
    dispatch({ type: REQUEST_SEARCH_LIST });
    axios.get(`${hostname}/api/bars`, { params: { city } })
      .then(response => {
        // if request is good...
        // Update state to indicate user is authenticated.
        dispatch({
          type: SET_SEARCH_LIST_SUCCESS,
          payload: response.data
        });
      })
      .catch((error) => {
        dispatch({
          type: SET_SEARCH_LIST_ERROR,
          payload: { message: error.statusText }
        });
      });
  };
}
