import { FETCH_USER_GROUPS, FETCH_GROUP_USERS, FETCH_GROUP_POSTS, FETCH_GROUP_COMMENTS, JOIN_GROUP, LEAVE_GROUP, POST_GROUP_MESSAGE, POST_GROUP_COMMENT, LEAVE_PAGE, LEAVE_TAB } from '../actions/types';

const INITIAL_STATE = {
  userGroups: null,
  groupUsers: null,
  membership: null,
  groupPosts: [],
  postMessages: [],
  postComments: []
}

export default function(state = INITIAL_STATE, action){
  switch(action.type) {
    case FETCH_USER_GROUPS:
      return { ...state, userGroups: action.payload }
    case FETCH_GROUP_USERS:
      return { ...state, groupUsers: action.payload.groupUsers, membership: action.payload.membership }
    case FETCH_GROUP_POSTS:
      return { ...state, groupPosts: action.payload }
    case FETCH_GROUP_COMMENTS:
      return { ...state, comments: action.payload }
    case LEAVE_GROUP:
      return { ...state, membership: null }
    case LEAVE_PAGE:
    case LEAVE_TAB:
      return INITIAL_STATE
    case JOIN_GROUP:
    case POST_GROUP_MESSAGE:
    case POST_GROUP_COMMENT:
      return { ...state }
    default:
      return state;
  }
}
