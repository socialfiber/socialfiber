import axios from 'axios';
import { browserHistory } from 'react-router';
import { FETCH_ALL_GROUPS, FETCH_USER_GROUPS, LEAVE_GROUP, JOIN_GROUP, FETCH_GROUP_POSTS } from './types';

export function fetchAllGroups(){
  return axios.get('/api/groups/getAllGroups')
    .then(function(response){
      return {
        type: FETCH_ALL_GROUPS,
        payload: response
      };
    })
    .catch((error) => {
      console.error(error);
    })
}

export function fetchUserGroups() {
  return axios.get('/api/groups/getUserGroups', {
    params: {
      user_id: localStorage.getItem('userID')
    }
  })
  .then(function(response) {
    console.log("Response in fetchUserGroups: ",response)
    return {
      type: FETCH_USER_GROUPS,
      payload: response
    };
  })
  .catch((error) => {
    console.error(error);
  })
}

export function joinGroup(group_id) {
  console.log('group_id: ', group_id)
  return axios.post('api/groups/addUser', {
    group_id: group_id,
    user_id: localStorage.getItem('userID'),
  })
  .then(function(response) {
    return {
      type: JOIN_GROUP,
      payload: response
    }
  })
  .catch((error) => {
    console.error(error);
  })
}

export function leaveGroup(group_id) {
  return axios.post('/api/groups/leaveGroup', {
      user_id: localStorage.getItem('userID'),
      group_id: group_id
    })
  .then(function(response) {
    return {
      type: LEAVE_GROUP,
      payload: response
    };
  })
  .catch((error) => {
    console.error(error);
  })
}

// export function fetchGroupPosts(group_id) {
//   return axios.get('/api/posts/getMessage', {
//     params: {
//       group_id: group_id
//     }
//   })
//   .then(function(response){
//     return {
//       type: FETCH_GROUP_POSTS,
//       payload: response
//     }
//   })
//   .catch(error){
//     console.error(error)}
//   }
