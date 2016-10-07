import { FETCH_USER_GROUPS, FETCH_GROUP_USERS, FETCH_GROUP_POSTS, FETCH_GROUP_COMMENTS, CREATE_NEW_GROUP, JOIN_GROUP, LEAVE_GROUP, POST_GROUP_MESSAGE, POST_GROUP_COMMENT } from '../actions/types';

const INITIAL_STATE = {
  userGroups: [],
  groupUsers: [],
  membership: null,
  groupPosts: [],
  postMessages: [],
  postComments: []
}

export default function(state=INITIAL_STATE, action){
  switch(action.type) {
    case FETCH_USER_GROUPS:
      return { ...state, userGroups: action.payload };
    case FETCH_GROUP_USERS:
      return { ...state, groupUsers: action.payload.groupUsers, membership: action.payload.membership };
    case FETCH_GROUP_POSTS:
      return { ...state, groupPosts: action.payload };
    case FETCH_GROUP_COMMENTS:
      return { ...state, comments: action.payload };
    case CREATE_NEW_GROUP:
     return { ...state }
    case JOIN_GROUP:
      return { ...state }
    case LEAVE_GROUP:
      return { ...state, membership: null };
    case POST_GROUP_MESSAGE:
      return { ...state }
    case POST_GROUP_COMMENT:
      return { ...state }
    default:
      return state;
  }
}
