import { FETCH_ALL_GROUPS } from '../actions/types';

const INITIAL_STATE = {all:[]}

export default function(INITIAL_STATE, action){
  switch(action.type) {
    case FETCH_ALL_GROUPS:
      return action.payload
    default:
      return state;
  }
}
