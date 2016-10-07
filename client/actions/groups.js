import { FETCH_ALL_GROUPS, FETCH_USER_GROUPS, FETCH_GROUP_USERS, FETCH_GROUP_POSTS, FETCH_GROUP_COMMENTS, CREATE_NEW_GROUP, JOIN_GROUP, LEAVE_GROUP, POST_GROUP_MESSAGE, POST_GROUP_COMMENT, GROUP_STATUS, LEAVE_PAGE } from '../actions/types';
import { browserHistory } from 'react-router';
import axios from 'axios';
import Cookies from 'js-cookie';
import _ from 'underscore';


export function fetchAllGroups() {
  const data = {
    headers: {
      'x-access-token': Cookies.get('token')
    }
  }
  return axios.get('/api/groups/allGroups', data)
    .then((response) => {
      return { type: FETCH_ALL_GROUPS, payload: response.data }
    })
    .catch((error) => {
      console.error(error);
    });
}

export function fetchUserGroups() {
  const data = {
    params: {
      userID: Cookies.get('userID')
    },
    headers: {
      'x-access-token': Cookies.get('token')
    }
  }
  return axios.get('/api/groups/userGroups', data)
    .then((response) => {
      console.log(response.data)
      return { type: FETCH_USER_GROUPS, payload: response.data }
    })
    .catch((error) => {
      console.error(error);
    });
}

export function fetchGroupStatus(groupID) {
  const data = {
    params: {
      userID: Cookies.get('userID'),
      groupID: groupID
    },
    headers: {
      'x-access-token': Cookies.get('token')
    }
  }
  return axios.get('/api/groups/groupStatus', data)
    .then((response) => {
      return { type: GROUP_STATUS, payload: response.data.status }
    })
    .catch((error) => {
      console.error(error);
    });
}

export function joinGroup(groupID) {
  const data = {
    groupID: groupID,
    userID: Cookies.get('userID')
  }
  const config = {
    headers: { 'x-access-token' :  Cookies.get('token')}
  }
  return axios.post('/api/groups/addUser', data, config)
    .then((response) => {
      return { type: JOIN_GROUP }
    })
    .catch((error) => {
      console.error(error);
    });
}

export function leaveGroup(groupID) {
  const data = {
    userID: Cookies.get('userID'),
    groupID: groupID
  };
  const config = {
    headers: { 'x-access-token': Cookies.get('token') }
  }
  return axios.post('/api/groups/leaveGroup', data, config)
    .then((response) => {
      return { type: LEAVE_GROUP }
    })
    .catch((error) => {
      console.error(error);
    });
}

export function fetchGroupPosts(groupID) {
  const data = {
    params: { groupID: groupID },
    headers: { 'x-access-token': Cookies.get('token') }
  }
  return axios.get('/api/posts/getMessage', data)
    .then((response) => {
      return { type: FETCH_GROUP_POSTS, payload: response.data }
    })
    .catch((error) => {
      console.error(error);
    });
}

export function postMessage(message) {
  const data = {
    groupID: Cookies.get('groupID'),
    groupName: Cookies.get('groupName'),
    username: Cookies.get('username'),
    message: message.message
  }
  const config = {
    headers: { 'x-access-token': Cookies.get('token') }
  }
  return axios.post('/api/posts/postMessage', data, config)
    .then((response) => {
      return { type: POST_GROUP_MESSAGE }
    })
    .catch((error) => {
      console.error(error);
    });
}

export function postComment(message, filler, commentObject) {
  const data = {
    postID: commentObject.myGroups.commentObject.id,
    username: Cookies.get('username'),
    message: message.message
  }
  const config = {
    headers: { 'x-access-token': Cookies.get('token') }
  }
  return axios.post('/api/comments/postComment', data, config)
    .then((response) => {
      return { type: POST_GROUP_COMMENT }
    })
    .catch((error) => {
      console.error(error);
    });
}

export function fetchComments(groupID) {
  const data = {
    params: { groupID: groupID },
    headers: { 'x-access-token': Cookies.get('token') }
  }
  return axios.get('/api/comments/getComments', data)
    .then((response) => {
      return { type: FETCH_GROUP_COMMENTS, payload: response.data }
    })
    .catch((error) => {
      console.error(error);
    });
}

export function fetchGroupUsers(groupObj) {
  const data = {
    params: { groupID: groupObj.groupID },
    headers: { 'x-access-token': Cookies.get('token') }
  }
  return axios.get('/api/groups/groupUsers', data)
    .then((response) => {
      const membership = _.findWhere(response.data, {id: +Cookies.get('userID')}) ? true : false;
      const data = {
        groupUsers: response.data,
        membership: membership
      }
      Cookies.set('groupID', groupObj.groupID);
      Cookies.set('groupName', groupObj.groupName);
      return { type: FETCH_GROUP_USERS, payload: data }
    })
    .catch((error) => {
      console.error(error);
    });
}

export function createNewGroup(newGroupObj) {
  newGroupObj.userID =  Cookies.get('userID');
  const data = newGroupObj;
  const config = {
    headers: {
      'x-access-token': Cookies.get('token')
    }
  }
  return axios.post('/api/groups/createGroups', data, config)
    .then((response) => {
      return { type : CREATE_NEW_GROUP, payload: response.data }
    })
    .catch((error) => {
      console.error(error);
    });
}

export function leavePage() {
  Cookies.remove('groupID');
  Cookies.remove('groupName');
  return { type: LEAVE_PAGE }
}
