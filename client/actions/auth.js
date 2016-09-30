import axios from 'axios';
import { browserHistory } from 'react-router';
import { SubmissionError } from 'redux-form';
import { AUTH_USER, AUTH_ERROR } from './types';

export function resetError() {
  return { type: AUTH_ERROR, payload: '' }
}

export function submitSignIn(usernameAndPasswordObj) {
  return axios.post('/auth/signin', usernameAndPasswordObj)
    .then((response) => {
      if(response.data.msg) {
        return { type: AUTH_ERROR, payload: response.data.msg }
      } else {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('userID', response.data.user.id);
        localStorage.setItem('username', response.data.user.username);
        browserHistory.push('/userProfile');
        return { type: AUTH_USER, payload: response.data };
      }
    })
    .catch((error) => {
      return { type: AUTH_ERROR, payload: response.data.msg };
    });
}

export function submitSignUp(usernameAndPasswordObj) {
  if (usernameAndPasswordObj.password !== usernameAndPasswordObj.confirmPW) {
    return { type: AUTH_ERROR, payload: 'Passwords do not match' };
  } else {
    return axios.post('/auth/signup', usernameAndPasswordObj)
      .then((response) => {
        if(response.data.msg) {
          return { type: AUTH_ERROR, payload: response.data.msg }
        } else {
          console.log(response.data);
          localStorage.setItem('token', response.data.token);
          localStorage.setItem('userID', response.data.user.id);
          localStorage.setItem('username', response.data.user.username);
          browserHistory.push('/userQuestionnaire');
          return { type: AUTH_USER, payload: response.data };
        }
      })
      .catch((error) => {
        return { type: AUTH_ERROR, payload: response.data.msg };
      });
  }
}
