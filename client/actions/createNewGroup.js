import axios from 'axios';
import { CREATE_NEW_GROUP } from './types';

export function createNewGroup(newGroupObj){

  return axios.post('/api/groups/createGroups', newGroupObj)
    .then((response) => {
      return { type : CREATE_NEW_GROUP, payload: response.data }
    })
    .catch(() => {
      console.error(error)
    });
}
