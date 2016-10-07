import { FETCH_PROFILE, FRIENDSHIP_STATUS, FETCH_ALL_GROUPS, FETCH_ALL_USERS } from '../actions/types';

const INITIAL_STATE = { profileInfo: null, allGroups: null, allUsers: null }

export default function(state = INITIAL_STATE, action) {
  switch(action.type) {
    case FETCH_PROFILE:
      return { ...state, profileInfo: action.payload };
    case FETCH_ALL_GROUPS:
      return { ...state, allGroups: action.payload };
    case FETCH_ALL_USERS:
      return { ...state, allUsers: action.payload };
    default:
      return state;
  }
}
