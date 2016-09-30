import axios from 'axios';
import { FETCH_USER_DATA, FETCH_IDEAL_MACROS, FETCH_ACTUAL_MACROS } from './types';

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

export function fetchIdealMacros() {
  return axios.get('/api/users/getUserData', {
    params: {
      userID: localStorage.getItem('userID')
    }
  })
  .then((response) => {
    // console.log("Ideal Macros: ", response.data.dietaryProfile);
    return {
      type: FETCH_IDEAL_MACROS,
      payload: response.data.dietaryProfile
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
