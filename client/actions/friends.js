import { FETCH_FRIENDS, FRIENDSHIP_STATUS, LEAVE_TAB } from './types';
import axios from 'axios';
import Cookies from 'js-cookie';


export function fetchFriends() {
  const data = {
    params: { userID: Cookies.get('currentProfileID') },
    headers: { 'x-access-token': Cookies.get('token') }
  }
  return axios.get('/api/friends/myFriends', data)
    .then((response) => {
      const payload = {
        friendList: response.data.filter((friend) => { return friend.status === 'friends' }),
        friendRequests: Cookies.get('userID') === Cookies.get('currentProfileID') ? response.data.filter((friend) => { return friend.status === 'requestee' }) : []
      }
      return { type: FETCH_FRIENDS, payload: payload }
    })
    .catch((error) => {
      console.error(error);
    });
}

export function fetchFriendshipStatus(otherID) {
  const data = {
    params: {
      userID: Cookies.get('userID'),
      otherID: otherID
    },
    headers: { 'x-access-token': Cookies.get('token') }
  }
  return axios.get('/api/friends/friendshipStatus', data)
    .then((response) => {
      return { type: FRIENDSHIP_STATUS, payload: response.data.status }
    })
    .catch((error) => {
      console.error(error);
    });
}

export function sendFriendRequest(otherID) {
  const data = {
    userID: Cookies.get('userID'),
    username: Cookies.get('username'),
    otherID: otherID
  }
  const config = { headers: { 'x-access-token': Cookies.get('token') } }
  return axios.post('/api/friends/friendshipStatus', data, config)
    .then((response) => {
      return { type: FRIENDSHIP_STATUS, payload: response.data.status }
    })
    .catch((error) => {
      console.error(error);
    });
}

export function acceptFriendRequest(otherID) {
  const data = {
    userID: Cookies.get('userID'),
    username: Cookies.get('username'),
    otherID: otherID
  }
  const config = { headers: { 'x-access-token': Cookies.get('token') } }
  return axios.put('/api/friends/friendshipStatus', data, config)
    .then((response) => {
      return { type: FRIENDSHIP_STATUS, payload: response.data.status }
    })
    .catch((error) => {
      console.error(error);
    });
}

export function deleteFriendRequest(otherID) {
  const data = {
    params: {
      userID: Cookies.get('userID'),
      otherID: otherID
    },
    headers: { 'x-access-token': Cookies.get('token') }
  }
  return axios.delete('/api/friends/friendshipStatus', data)
    .then((response) => {
      return { type: FRIENDSHIP_STATUS, payload: response.data.status }
    })
    .catch((error) => {
      console.error(error);
    });
}

export function leaveTab() {
  return new Promise((resolve, reject) => {
    resolve({ type: LEAVE_TAB });
  });
}
