import { CREATE_ROOM, FETCH_CHAT_HISTORY } from '../actions/types';

const INITIAL_STATE = { roomId: null, chatHistory: [] };

export default function(state = INITIAL_STATE, action) {
  switch(action.type) {
    case CREATE_ROOM:
      return {...state, roomId: action.payload};
    case FETCH_CHAT_HISTORY:
      return {...state, chatHistory: action.payload };
    default:
      return state;
  }
}
