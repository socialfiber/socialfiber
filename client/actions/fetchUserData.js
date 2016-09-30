import axios from 'axios';
import { FETCH_USER_DATA, FETCH_MACROS } from './types';

export function fetchUserData() {
  return axios.get('/api/users/getUserData', {
    params: {
      userID: localStorage.getItem('userID')
    }
  })
  .then(function(response) {
    return {
      type: FETCH_USER_DATA,
      payload: response.data.question
    };
  })
  .catch(function(error) {
    console.error(error);
  })
}

export function fetchMacros() {
  return axios.get('/api/users/getUserData', {
    params: {
      userID: localStorage.getItem('userID')
    }
  })
  .then((response) => {
    // console.log("Macros:  ", response.data);
    return {
      type: FETCH_MACROS,
      payload: response.data
    }
  })
  .catch((error) => {
    console.error(error)
  })
}
