import axios from 'axios';
import { browserHistory } from 'react-router';
import { FETCH_ALL_GROUPS } from './types';

export function fetchAllGroups(){
  return axios.get('/api/groups/getAllGroups')
    .then(function(response){
      return {
        type: FETCH_ALL_GROUPS,
        payload: response
      };
    })
    .catch(function(error){
      console.error(error);
    })
}
