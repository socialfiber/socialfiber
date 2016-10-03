import axios from 'axios';
import Cookies from 'js-cookie';
import { browserHistory } from 'react-router';
import { FETCH_PROFILE, REDIRECT_PROFILE } from './types';

export function fetchProfile(otherID) {
  // if profile id = user id, redirect to user profile
  if(otherID === Cookies.get('userID')) {
    browserHistory.push('/userProfile');
    return { type: REDIRECT_PROFILE };
  } else {
    // if friends or public, fetch all data,
    // if private, fetch selected data
    const data = {
      headers: { 'x-access-token': Cookies.get('token') }
    }
    return axios.get('/api/users/browse/'+otherID, data)
      .then((response) => {
        return { type: FETCH_PROFILE, payload: response.data }
      })
      .catch((err) => {
        console.error(err);
      });
  }
}
