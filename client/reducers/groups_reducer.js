import { FETCH_ALL_GROUPS, FETCH_USER_GROUPS, LEAVE_GROUP, JOIN_GROUP } from '../actions/types';
const INITIAL_STATE = {all:[]}

export default function(state=INITIAL_STATE, action){
  switch(action.type) {
    case FETCH_ALL_GROUPS:
      console.log('action.payload.data+++++++: ', action.payload.data)
      return {all: action.payload.data};
    case FETCH_USER_GROUPS:
      return action.payload.data;
    case LEAVE_GROUP:
    console.log('action payload: ', action.payload);
      return action.payload;
    case JOIN_GROUP:
      return action.payload;
    default:
      return state;
  }
}
