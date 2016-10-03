import { FETCH_FRIENDS, FRIENDSHIP_STATUS } from '../actions/types';

const INITIAL_STATE = { myFriends: null, friendRequests: null, friendshipStatus: null }

export default function(state = INITIAL_STATE, action) {
  switch(action.type) {
    case FETCH_FRIENDS:
      return { ...state, myFriends: action.payload.myFriends, friendRequests: action.payload.friendRequests };
    case FRIENDSHIP_STATUS:
      return { ...state, friendshipStatus: action.payload };
    default:
      return state;
  }
}
