import { CREATE_ROOM, FETCH_CHAT_HISTORY, STORE_CHAT_HISTORY } from './types';
import axios from 'axios';
import Cookies from 'js-cookie';


export function createRoom(friendObj) {
  const roomID = [friendObj.user1_id, friendObj.user2_id].sort().join('_');
  return { type: CREATE_ROOM, payload: roomID }
}

export function fetchChatHistory(roomID) {
  const data = {
    params: { room_id: roomID },
    headers: { 'x-access-token': Cookies.get('token') }
  }
  return axios.get('/api/chats/chathistory', data)
  .then((response) => {
    return { type: FETCH_CHAT_HISTORY, payload: response.data.chatMessages }
  })
  .catch((error) => {
    console.error(error);
  });
}

export function storeChatHistory(messages, roomID) {
  const data = {
    room_id: roomID,
    messages: messages
  }
  const config = {
    headers: { 'x-access-token': Cookies.get('token') }
  }
  return axios.post('/api/chats/chathistory', data, config)
  .then((response) => {
    return { type: STORE_CHAT_HISTORY }
  })
  .catch((error) => {
    console.error(error);
  });
}
