import axios from 'axios';
import { browserHistory } from 'react-router'
import { AUTH_USER, UNAUTH_USER, AUTH_ERROR } from './types'

export function submitSignIn(usernameAndPasswordObj) {
  return axios.post('/api/users/login', usernameAndPasswordObj)
    .then((response) => {
      console.log(response.data)
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('userID', response.data.user.id);
      localStorage.setItem('username', response.data.user.username);
      console.log('localStorage in signIN: ', localStorage)
      browserHistory.push('/userProfile');
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
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('userID', response.data.user.id);
      localStorage.setItem('username', response.data.user.username);
      console.log('localStorage in signUP: ', localStorage)
      browserHistory.push('/userQuestionnaire');
      return { type: AUTH_USER, payload: response.data };
    })
    .catch((error) => {
      console.log(error);
      return { type: AUTH_ERROR, payload: response.data };
    });
}
