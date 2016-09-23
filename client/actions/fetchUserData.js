import axios from 'axios';
import { FETCH_USER_DATA } from './types';

export function fetchUserData() {
  return axios.get('/api/questions/getData', {
    params: {
      userID: localStorage.getItem('userID')
    }
  })
  .then(function(response) {
    return {
      type: FETCH_USER_DATA,
      payload: response
    };
  })
  .catch(function(error) {
    console.error(error);
  })
}
