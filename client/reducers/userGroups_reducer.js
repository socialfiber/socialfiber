import { FETCH_USER_GROUPS } from '../actions/types';

export default function(state = null, action) {
  switch(action.type) {
    case FETCH_USER_GROUPS:
      return action.payload;
    default:
      return state;
  }
}
