import axios from 'axios';
import { browserHistory } from 'react-router';
import { AUTH_USER, UNAUTH_USER, AUTH_ERROR, PW_DOES_NOT_MATCH } from './types';

export function submitSignIn(usernameAndPasswordObj) {
  return axios.post('/api/users/login', usernameAndPasswordObj)
    .then((response) => {
      console.log(response.data)
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('userID', response.data.user.id);
      localStorage.setItem('username', response.data.user.username);
      browserHistory.push('/userProfile');
      return { type: AUTH_USER, payload: response.data };
    })
    .catch((error) => {
      console.error(error);
      return { type: AUTH_ERROR, payload: response.data };
    });
}

export function submitSignUp(usernameAndPasswordObj) {
  if (usernameAndPasswordObj.password !== usernameAndPasswordObj.confirmPW){
    return { type: PW_DOES_NOT_MATCH, payload: "Passwords do not match"}
  } else {
    return axios.post('/api/users/createUser', usernameAndPasswordObj)
      .then((response) => {
        console.log(response.data)
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('userID', response.data.user.id);
        localStorage.setItem('username', response.data.user.username);
        browserHistory.push('/userQuestionnaire');
        return { type: AUTH_USER, payload: response.data };
      })
      .catch((error) => {
        console.error(error);
        return { type: AUTH_ERROR, payload: response.data };
      });
  }
}
