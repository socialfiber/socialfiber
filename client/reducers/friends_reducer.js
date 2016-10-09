import { FETCH_FRIENDS, FRIENDSHIP_STATUS, LEAVE_TAB } from '../actions/types';

const INITIAL_STATE = {
  friendList: null,
  friendRequests: null,
  friendshipStatus: null
}

export default function(state = INITIAL_STATE, action) {
  switch(action.type) {
    case FETCH_FRIENDS:
      return { ...state, friendList: action.payload.friendList, friendRequests: action.payload.friendRequests }
    case FRIENDSHIP_STATUS:
      return { ...state, friendshipStatus: action.payload }
    case LEAVE_TAB:
      return INITIAL_STATE;
    default:
      return state;
  }
}
