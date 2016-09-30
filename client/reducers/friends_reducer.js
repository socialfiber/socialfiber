import { FETCH_FRIENDS, FRIENDSHIP_STATUS } from '../actions/types';

const INITIAL_STATE = { myFriends: [], friendshipStatus: null }

export default function(state = INITIAL_STATE, action) {
  switch(action.type) {
    case FETCH_FRIENDS:
      return { ...state, myFriends: action.payload };
    case FRIENDSHIP_STATUS:
      return { ...state, friendshipStatus: action.payload };
    default:
      return state;
  }
}
