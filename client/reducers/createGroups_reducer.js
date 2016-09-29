import { CREATE_NEW_GROUP } from '../actions/types';

const INITIAL_STATE = {newGroup: null}

export default function(state=INITIAL_STATE, action) {
  switch(action.type) {
    case CREATE_NEW_GROUP:
      return {...state, newGroup:action.payload};
    default:
      return state;
  }
}
