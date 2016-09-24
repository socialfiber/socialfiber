import { AUTH_USER, UNAUTH_USER, AUTH_ERROR, PW_DOES_NOT_MATCH } from '../actions/types';

const INITIAL_STATE = {authInfo: {currentUser: ""}, authenticated: null}

export default function(state = [], action) {
  switch(action.type) {
    case PW_DOES_NOT_MATCH:
      return action.payload;
    case AUTH_USER:
      return action.payload;
    case AUTH_ERROR:
      return action.payload;
    default:
      return state;
  }
}
