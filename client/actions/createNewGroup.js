import axios from 'axios';
import { CREATE_NEW_GROUP } from './types';

export function createNewGroup(newGroupObj){
  //call join group
  console.log('newGroupObj: ', newGroupObj)
  return axios.post('/api/groups/createGroups', newGroupObj)
    .then((response) => {
      console.log('resp in create new group action',  response)
      return { type : CREATE_NEW_GROUP, payload: response.data }
    })
    .catch(() => {
      console.error(error)
    });
}
