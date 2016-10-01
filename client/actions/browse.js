import axios from 'axios';
import Cookies from 'js-cookie';
import { browserHistory } from 'react-router';
import { FETCH_PROFILE } from './types';

export function fetchProfile(OTHER_ID) {
  // if profile id = user id, redirect to user profile
  // if OTHER_ID === Cookies.get('userID') {
  //   browserHistory.push('/userProfile');
  // }
  // if friends or public, fetch all data,
  // if private, fetch selected data
  const data = {
    headers: { 'x-access-token': Cookies.get('token') }
  }
  return axios.get('/api/users/browse/'+OTHER_ID, data)
    .then((response) => {
      return { type: FETCH_PROFILE, payload: response.data }
    })
    .catch((err) => {
      console.error(err);
    });
}
