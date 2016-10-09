import { FETCH_ALL_GROUPS, CREATE_NEW_GROUP, CREATE_GROUP_ERROR, FETCH_ALL_USERS } from '../actions/types';

const INITIAL_STATE = {
  allGroups: null,
  allUsers: null,
  err: null
}

export default function(state = INITIAL_STATE, action) {
  switch(action.type) {
    case FETCH_ALL_GROUPS:
      return { ...state, allGroups: action.payload };
    case CREATE_NEW_GROUP:
      return { ...state, err: null }
    case CREATE_GROUP_ERROR:
      return { ...state, err: action.payload }
    case FETCH_ALL_USERS:
      return { ...state, allUsers: action.payload };
    default:
      return state;
  }
}
