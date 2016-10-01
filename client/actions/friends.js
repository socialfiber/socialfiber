import axios from 'axios';
import { FETCH_FRIENDS, FRIENDSHIP_STATUS } from './types';
import Cookies from 'js-cookie';

export function fetchFriends() {
  const data = {
    params: {
      userID: localStorage.getItem('userID')
    }
  }
  return axios.get('/api/friends/myFriends', data)
    .then((response) => {
      return { type: FETCH_FRIENDS, payload: response.data }
    })
    .catch((err) => {
      console.error(err);
    });
}

export function getFriendshipStatus() {
  const data = {
    params: {
      userID: localStorage.getItem('userID'),
      otherID: localStorage.getItem('userID')
    }
  }
  return axios.get('/api/friends/friendshipStatus', data)
    .then((response) => {
      return { type: FRIENDSHIP_STATUS, payload: response.data }
    })
    .catch((err) => {
      console.error(err);
    });
}

export function sendFriendRequest() {
  const data = {
    userID: localStorage.getItem('userID'),
    otherID: localStorage.getItem('userID')
  }
  return axios.post('/api/friends/friendshipStatus', data)
    .then((response) => {
      return { type: FRIENDSHIP_STATUS, payload: response.data }
    })
    .catch((err) => {
      console.error(err);
    });
}

export function acceptFriendRequest() {
  const data = {
    params: {
      userID: localStorage.getItem('userID'),
      otherID: localStorage.getItem('userID')
    }
  }
  return axios.put('/api/friends/friendshipStatus', data)
    .then((response) => {
      return { type: FRIENDSHIP_STATUS, payload: response.data }
    })
    .catch((err) => {
      console.error(err);
    });
}

export function deleteFriendRequest() {
  const data = {
    params: {
      userID: localStorage.getItem('userID'),
      otherID: localStorage.getItem('userID')
    }
  }
  return axios.delete('/api/friends/friendshipStatus', data)
    .then((response) => {
      return { type: FRIENDSHIP_STATUS, payload: response.data }
    })
    .catch((err) => {
      console.error(err);
    });
}
