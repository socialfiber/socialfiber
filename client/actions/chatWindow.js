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

export function fetchChatHistory() {
  return axios.get('')
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
  axios.post('', chatHistory, roomId)
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
