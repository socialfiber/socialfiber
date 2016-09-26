import axios from 'axios';
import { FETCH_USER_GROUPS } from './types';

export function fetchUserGroups() {
  return axios.get('/api/groups/getUserGroups', {
    params: {
      user_id: localStorage.getItem('userID')
    }
  })
  .then(function(response) {
    return {
      type: FETCH_USER_GROUPS,
      payload: response
    };
  })
  .catch(function(error) {
    console.error(error);
  })
}
