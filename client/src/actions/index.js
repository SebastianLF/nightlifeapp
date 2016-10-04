import axios from 'axios';
import { browserHistory } from 'react-router';
import * as API from '../api';
import { deleteJwtToken, saveJwtToken, saveSettings, saveSelectedBar, loadSelectedBar } from '../localstorage';
import {
  AUTH_USER,
  AUTH_ERROR,
  UNAUTH_USER,
  SET_SELECTED_BAR,
  SET_SEARCH_LIST_SUCCESS,
  SET_SEARCH_LIST_ERROR,
  REQUEST_SEARCH_LIST,
  RESET_SEARCH_LIST,
  GET_INITIAL_SELECTED_BAR,
  SHOW_LOGINSCREEN,
  CLOSE_LOGINSCREEN
} from './types';


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
    // sign in.
    API.signIn(email, password)
    .then((response) => {
      // sign in succeded,
      // save JWT token to localstorage.
      saveJwtToken(response.data.token);

      // auth state change to authenticated.
      dispatch({ type: AUTH_USER });

      // once logged, close login screen.
      dispatch(closeLoginscreen());

      // go home ( here 'mybar' page ).
      return browserHistory.push('/mybar');
    })
    .catch((error) => {

      // wrong credentials.
      dispatch(authError('Bad Login info'));
    });
  }
}

export function signoutUser() {
  return (dispatch) => {
    //delete jwt token from localstorage.
    deleteJwtToken();

    // if token deleted with success go to landing page.
    if (!localStorage.getItem("token")) {

      // set auth state in store.
      dispatch({ type: UNAUTH_USER });
      dispatch({ type: RESET_SEARCH_LIST });
      // redirect to landing page.
      return browserHistory.push('/');
    }
  }
}

export function authError(error){
  return {
    type : AUTH_ERROR,
    payload: error
  }
}

export function updateProfile(data){
  return (dispatch) => {

    // request data settings.
    API.updateProfile(data)
    .then((res) => {

      // save settings datas to locastorage.
      saveSettings(res.data);
    });
  }
}

export function findBars(city = '', offset = 0) {
  return function (dispatch) {

      // display loader and set search term within bars state.
      dispatch({ type: REQUEST_SEARCH_LIST, payload: city });
      API.fetchSearchList(city, offset)
      .then(response => {

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

export function getSelectedBar() {
  return function (dispatch, getState) {

    // fetch selected bar from server.
    API.getSelectedBar()
    .then((res) => {

      // fetch selected bar on app initialisation.
      dispatch({
        type: GET_INITIAL_SELECTED_BAR,
        payload: res.data
      });
    });

  }
}

export function setSelectedBar(bar) {
  return function (dispatch, getState) {

    // if not authed, show login screen.
    if (!getState().auth.authenticated) {
      return dispatch(showLoginscreen());
    }

    API.setSelectedBar(bar)
    .then((res) => {

      dispatch({
        type: SET_SELECTED_BAR,
        payload: res.data
      });
    });
  }
}
