import { CREATE_ROOM } from '../actions/types';

const INITIAL_STATE = { roomId: null };

export default function(state = INITIAL_STATE, action) {
  switch(action.type) {
    case CREATE_ROOM:
      return {...state, roomId: action.payload}
    default:
      return state;
  }
}
