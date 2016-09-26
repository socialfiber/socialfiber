import { FETCH_ALL_GROUPS } from '../actions/types';

const INITIAL_STATE = {all:[]}

export default function(state=INITIAL_STATE, action){
  switch(action.type) {
    case FETCH_ALL_GROUPS:
      console.log('FETCHING ALL GROUPS')
      return {all: action.payload.data};
    default:
      return state;
  }
}
