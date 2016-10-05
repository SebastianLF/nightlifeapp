import axios from 'axios';
import { loadJwtToken, saveJwtToken } from '../localstorage';

const hostname = window.location.hostname === 'localhost' ? 'http://localhost:3001' : window.location.hostname;

export const signIn = (email, password) => {
  return axios.post(`${hostname}/signin`, {
    email,
    password
  });
}

export const updateProfile = (userData) => {
  return axios.post(`${hostname}/api/user/update`, {
    userData: userData
  }, { headers: { authorization: loadJwtToken() } });
}

export const fetchSearchList = (city, offset) => {
  return axios.get(`${hostname}/api/bars`, {
    params: { city, offset }
  });
}

export const getSelectedBar = () => {
  const token = loadJwtToken();
  return axios.get(`${hostname}/api/bar/get`, {
      headers: { authorization: token }
  });
}

export const setSelectedBar = (bar) => {
  return axios.post(`${hostname}/api/bar/add`, {
    bar: bar
  }, { headers: { authorization: loadJwtToken() } });
}
