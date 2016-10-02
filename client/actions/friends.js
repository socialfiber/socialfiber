import axios from 'axios';
import Cookies from 'js-cookie';
import { FETCH_FRIENDS, FRIENDSHIP_STATUS } from './types';

export function fetchFriends() {
  const data = {
    params: { userID: Cookies.get('userID') },
    headers: { 'x-access-token': Cookies.get('token') }
  }
  return axios.get('/api/friends/myFriends', data)
    .then((response) => {
      return { type: FETCH_FRIENDS, payload: response.data }
    })
    .catch((err) => {
      console.error(err);
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
      return { type: FRIENDSHIP_STATUS, payload: response.data }
    })
    .catch((err) => {
      console.error(err);
    });
}

export function sendFriendRequest(otherID) {
  const data = {
    userID: Cookies.get('userID'),
    otherID: otherID
  }
  const config = headers: { 'x-access-token': Cookies.get('token') }
  return axios.post('/api/friends/friendshipStatus', data, config)
    .then((response) => {
      return { type: FRIENDSHIP_STATUS, payload: response.data }
    })
    .catch((err) => {
      console.error(err);
    });
}

export function acceptFriendRequest(otherID) {
  const data = {
    params: {
      userID: Cookies.get('userID'),
      otherID: otherID
    },
    headers: { 'x-access-token': Cookies.get('token') }
  }
  return axios.put('/api/friends/friendshipStatus', data)
    .then((response) => {
      return { type: FRIENDSHIP_STATUS, payload: response.data }
    })
    .catch((err) => {
      console.error(err);
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
      return { type: FRIENDSHIP_STATUS, payload: response.data }
    })
    .catch((err) => {
      console.error(err);
    });
}
