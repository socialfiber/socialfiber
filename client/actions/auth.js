import { AUTH_USER, AUTH_ERROR, RESET_ERROR, SIGN_OUT } from './types';
import { browserHistory } from 'react-router';
import axios from 'axios';
import Cookies from 'js-cookie';


export function submitSignIn(usernameAndPasswordObj) {
  if(!usernameAndPasswordObj.username) {
    return new Promise((resolve, reject) => {
      resolve({ type: AUTH_ERROR, payload: 'Please enter username.' });
    });
  } else if(!usernameAndPasswordObj.password) {
    return new Promise((resolve, reject) => {
      resolve({ type: AUTH_ERROR, payload: 'Please enter password.' });
    });
  } else {
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
        console.error(error);
      });
  }
}

export function submitSignUp(usernameAndPasswordObj) {
  if(!usernameAndPasswordObj.username) {
    return new Promise((resolve, reject) => {
      resolve({ type: AUTH_ERROR, payload: 'Please enter username.' });
    });
  } else if(usernameAndPasswordObj.username.length < 6) {
    return new Promise((resolve, reject) => {
      resolve({ type: AUTH_ERROR, payload: 'Username must be at least 6 characters.' });
    });
  } else if(!usernameAndPasswordObj.password) {
    return new Promise((resolve, reject) => {
      resolve({ type: AUTH_ERROR, payload: 'Please enter password.' });
    });
  } else if(usernameAndPasswordObj.password.length < 4) {
    return new Promise((resolve, reject) => {
      resolve({ type: AUTH_ERROR, payload: 'Password must be at least 4 characters.' });
    });
  } else if(!usernameAndPasswordObj.confirmPW) {
    return new Promise((resolve, reject) => {
      resolve({ type: AUTH_ERROR, payload: 'Please confirm password.' });
    });
  } else if(usernameAndPasswordObj.password !== usernameAndPasswordObj.confirmPW) {
    return new Promise((resolve, reject) => {
      resolve({ type: AUTH_ERROR, payload: 'Passwords do not match.' });
    });
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
          browserHistory.push('/questionnaire');
          return { type: AUTH_USER, payload: response.data }
        }
      })
      .catch((error) => {
        console.error(error);
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

export function resetError() {
  return new Promise((resolve, reject) => {
    resolve({ type: RESET_ERROR });
  });
}
