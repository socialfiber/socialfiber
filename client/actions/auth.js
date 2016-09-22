import axios from 'axios';
import { browserHistory } from 'react-router'
import { AUTH_USER, UNAUTH_USER, AUTH_ERROR } from './types'

export function submitSignIn(usernameAndPasswordObj) {
  return axios.post('/api/users/login', usernameAndPasswordObj)
    .then((response) => {
      console.log(response.data)
      return { type: AUTH_USER, payload: response.data };
    })
    .catch((error) => {
      console.log(error);
      return { type: AUTH_ERROR, payload: response.data };
    });
}

export function submitSignUp(usernameAndPasswordObj) {
  return axios.post('/api/users/createUser', usernameAndPasswordObj)
    .then((response) => {
      console.log(response.data)
      return { type: AUTH_USER, payload: response.data };
    })
    .catch((error) => {
      console.log(error);
      return { type: AUTH_ERROR, payload: response.data };
    });
}
