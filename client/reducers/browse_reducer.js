import { FETCH_ALL_GROUPS, CREATE_NEW_GROUP, CREATE_GROUP_ERROR, FETCH_ALL_USERS, LEAVE_PAGE } from '../actions/types';

const INITIAL_STATE = {
  allGroups: null,
  allUsers: null,
  msg: null
}

export default function(state = INITIAL_STATE, action) {
  switch(action.type) {
    case FETCH_ALL_GROUPS:
      return { ...state, allGroups: action.payload }
    case CREATE_NEW_GROUP:
      return { ...state, msg: 'Group successfully created!' }
    case CREATE_GROUP_ERROR:
      return { ...state, msg: action.payload }
    case FETCH_ALL_USERS:
      return { ...state, allUsers: action.payload }
    case LEAVE_PAGE:
      return INITIAL_STATE
    default:
      return state;
  }
}
