import axios from 'axios';
import Cookies from 'js-cookie';
import { CHANGE_PASSWORD } from './types';

export function resetError() {
  return { type: CHANGE_PASSWORD, payload: '' }
}

export function submitChangePassword(passwordObj) {
  if (passwordObj.password !== passwordObj.confirmPW) {
    return { type: CHANGE_PASSWORD, payload: 'Passwords do not match' };
  } else if (passwordObj.password === passwordObj.newPW) {
    return { type: CHANGE_PASSWORD, payload: 'New password must be different than current.' };
  } else {
    passwordObj.userID = Cookies.get('userID');
    return axios.post('/api/users/changePassword', passwordObj)
      .then((response) => {
        return { type: CHANGE_PASSWORD, payload: response.data.msg }
      })
      .catch((error) => {
        console.error(error);
      });
  }
}
