<<<<<<< 732003b2e026c2ab4c9d5d241a4fc7f0f0e64d22
import { FETCH_ALL_GROUPS, FETCH_USER_GROUPS, CREATE_NEW_GROUP } from '../actions/types';

=======
import { FETCH_ALL_GROUPS } from '../actions/types';
>>>>>>> [fix] corrected import statement in index.js

const INITIAL_STATE = {all:[]}

export default function(state=INITIAL_STATE, action){
  switch(action.type) {
    case FETCH_ALL_GROUPS:
      return {all: action.payload.data};
    case FETCH_USER_GROUPS:
      return action.payload.data;
    case CREATE_NEW_GROUP:
      return action.payload.data;
    default:
      return state;
  }
}
