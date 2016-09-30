import axios from 'axios';
import { FETCH_USER_DATA } from './types';

export function fetchUserData() {
  return axios.get('/api/questions/getData', {
    params: {
      userID: localStorage.getItem('userID')
    }
  })
  .then(function(response) {
    return {
      type: FETCH_USER_DATA,
      payload: response.data
    };
  })
  .catch(function(error) {
    console.error(error);
  })
}

export function fetchIdealMacros() {
  return axios.get('/api/users/getUserData', {
    params: {
      userID: localStorage.getItem('userID')
    }
  })
  .then((response) => {
    return {
      type: FETCH_IDEAL_MACROS,
      payload: response
    }
  })
  .catch((error) => {
    console.error(error)
  })
}

export function fetchActualMacros() {
  return axios.get('/api/users/getUserData', {
    params: {
      userID: localStorage.getItem('userID')
    }
  })
  .then((response) => {
    return {
      type: FETCH_ACTUAL_MACROS,
      payload: response
    }
  })
  .catch((error) => {
    console.error(error)
  })
}
