import { FETCH_USER_DATA } from '../actions/types';

export default function(state = null, action) {
  switch(action.type) {
    case FETCH_USER_DATA:
      console.log("Payload: ", action.payload.data[0]);
      return action.payload.data[0];
    default:
      return state;
  }
}
