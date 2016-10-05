import axios from 'axios';
import Cookies from 'js-cookie';
import { browserHistory } from 'react-router';
import { AUTH_USER, AUTH_ERROR, SIGN_OUT } from './types';

export function resetError() {
  return { type: AUTH_ERROR, payload: '' }
}

export function submitSignIn(usernameAndPasswordObj) {
  return axios.post('/auth/signin', usernameAndPasswordObj)
    .then((response) => {
      if(response.data.msg) {
        return { type: AUTH_ERROR, payload: response.data.msg }
      } else {
        Cookies.set('userID', response.data.user.id);
        Cookies.set('username', response.data.user.username);
        Cookies.set('token', response.data.token);
        Cookies.set('authenticated', true);
        browserHistory.push('/userProfile');
        return { type: AUTH_USER, payload: response.data }
      }
    })
    .catch((error) => {
      return { type: AUTH_ERROR, payload: response.data.msg }
    });
}

export function submitSignUp(usernameAndPasswordObj) {
  if (usernameAndPasswordObj.password !== usernameAndPasswordObj.confirmPW) {
    return { type: AUTH_ERROR, payload: 'Passwords do not match' }
  } else {
    return axios.post('/auth/signup', usernameAndPasswordObj)
      .then((response) => {
        if(response.data.msg) {
          return { type: AUTH_ERROR, payload: response.data.msg }
        } else {
          Cookies.set('userID', response.data.user.id);
          Cookies.set('username', response.data.user.username);
          Cookies.set('token', response.data.token);
          Cookies.set('authenticated', true);
          browserHistory.push('/userQuestionnaire');
          return { type: AUTH_USER, payload: response.data }
        }
      })
      .catch((error) => {
        return { type: AUTH_ERROR, payload: response.data.msg }
      });
  }
}

export function submitSignOut() {
  Cookies.remove('userID');
  Cookies.remove('username');
  Cookies.remove('token');
  Cookies.set('authenticated', false);
  browserHistory.push('/signin');
  return { type: SIGN_OUT }
}
