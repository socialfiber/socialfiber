import { FETCH_PROFILE, FRIENDSHIP_STATUS } from '../actions/types';

const INITIAL_STATE = { profileInfo: null }

export default function(state = INITIAL_STATE, action) {
  switch(action.type) {
    case FETCH_PROFILE:
      return { ...state, profileInfo: action.payload };
    default:
      return state;
  }
}
