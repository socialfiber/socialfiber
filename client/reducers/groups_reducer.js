import { FETCH_ALL_GROUPS, CREATE_NEW_GROUP } from '../actions/types';

const INITIAL_STATE = {all:[]}

export default function(state=INITIAL_STATE, action){
  switch(action.type) {
    case FETCH_ALL_GROUPS:
      return {all: action.payload.data};
    case CREATE_NEW_GROUP:
      return {action.payload.data};
    default:
      return state;
  }
}
