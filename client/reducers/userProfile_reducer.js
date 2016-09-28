import { FETCH_USER_DATA, UPDATE_USER_DATA, TOGGLE_EDITING } from '../actions/types';

export default function(state = null, action) {
  switch(action.type) {
    case FETCH_USER_DATA:
      return action.payload;
    case UPDATE_USER_DATA:
      console.log("In userProfile_reducer");
      return;
    default:
      return state;
  }
}
