import axios from 'axios';
import { FETCH_USER_DATA, FETCH_MACROS } from './types';
import Cookies from 'js-cookie';

export function fetchUserData() {
  const data = {
    params: { userID: Cookies.get('userID') },
    headers: { 'x-access-token': Cookies.get('token') }
  }
  return axios.get('/api/users/getUserData', data)
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

export function fetchMacros(userID) {
  const data = {
    params: { userID: userID },
    headers: { 'x-access-token': Cookies.get('token') }
  }
  return axios.get('/api/users/getUserData', data)
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
