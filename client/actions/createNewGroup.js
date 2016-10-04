import axios from 'axios';
import { CREATE_NEW_GROUP } from './types';
import Cookies from 'js-cookie';
export function createNewGroup(newGroupObj){
  newGroupObj.userID =  Cookies.get('userID');
  const data = newGroupObj;
  const config = {
    headers: {
      'x-access-token': Cookies.get('token')
    }
  }
  console.log(newGroupObj)



  return axios.post('/api/groups/createGroups', data, config)
    .then((response) => {
      console.log('resp in create new group action',  response.data)
      Cookies.set('group_id', response.data.group.id);
      Cookies.set('groupName', response.data.group.name);
      return { type : CREATE_NEW_GROUP, payload: response.data }
    })
    .catch(() => {
      console.error(error)
    });
}
