import axios from 'axios';
import { CREATE_ROOM, FETCH_CHAT_HISTORY, STORE_CHAT_HISTORY } from './types';

export function createRoom(friendObj) {
  const roomId = [friendObj.user1_id, friendObj.user2_id].sort().join('_');
  console.log("In createRoom: ", roomId);
  return {
    type: CREATE_ROOM,
    payload: roomId
  }
}

export function fetchChatHistory(roomId) {
  const data = {
    params: { room_id: roomId },
    headers: { 'x-access-token': Cookies.get('token') }
  }
  return axios.get('/api/chats/chathistory', data)
  .then((response) => {
    return {
      type: FETCH_CHAT_HISTORY,
      payload: response
    }
  })
  .catch((error) => {
    console.error(error);
  });
}

export function storeChatHistory(chatHistory, roomId) {
  const data = {
    params: { room_id: roomId, chatHistory: chatHistory }
  }
  const config = {
    headers: { 'x-access-token': Cookies.get('token') }
  }
  axios.post('/api/chats/chathistory', data, config)
  .then(() => {
    console.log("Successfully stored chat history.")
    return {
      type: STORE_CHAT_HISTORY
    }
  })
  .catch((error) => {
    console.error(error);
  });
}
