import axios from 'axios';
import { browserHistory } from 'react-router';
import { FETCH_ALL_GROUPS, FETCH_USER_GROUPS, LEAVE_GROUP, JOIN_GROUP, FETCH_GROUP_POSTS } from './types';
import Cookies from 'js-cookie';

export function fetchAllGroups(){

  const data = {
    params: {
      userID: Cookies.get('userID')
    },
    headers: {
      'x-access-token': Cookies.get('token')
    }
  }

  return axios.get('/api/groups/getAllGroups', data)
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
  const data = {
    params: {
      user_id: Cookies.get('userID') },
      headers: { 'x-access-token': Cookies.get('token') }
    }
    console.log('inside fetchusergroups')
  return axios.get('/api/groups/getUserGroups', data)
  .then(function(response) {
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

  const data = {
    group_id: group_id,
    user_id: Cookies.get('userID')
  }

  const config = {
    headers: { 'x-access-token' :  Cookies.get('token')}
  }

  console.log(data.user_id)
  return axios.post('/api/groups/addUser', data, config)
  .then(function(response) {
    console.log('inside join group')
    console.log('response: ', response)
    var obj = {
      groupId: group_id,
      data: response.data
    };
    return {
      type: JOIN_GROUP,
      payload: obj
    }
  })
  .catch((error) => {
    console.error(error);
  })
}

export function leaveGroup(group_id) {


  const data = {
    user_id: Cookies.get('userID'),
    group_id: group_id
  };

  const config = {
    headers: { 'x-access-token': Cookies.get('token') }
  }

  return axios.post('/api/groups/leaveGroup', data, config)
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

export function fetchGroupPosts(group_id) {

  const data = {
    params: { group_id: group_id },
    headers: { 'x-access-token': Cookies.get('token') }
  }


  return axios.get('/api/posts/getMessage', data)
  .then(function(response){
    return {
      type: FETCH_GROUP_POSTS,
      payload: response
    }
  })
  .catch((error) => {
    console.error(error)
  })
}
