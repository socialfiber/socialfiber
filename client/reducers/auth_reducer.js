import { AUTH_USER, SIGN_OUT, PW_DOES_NOT_MATCH } from '../actions/types';

const INITIAL_STATE = { currentUser: undefined, authenticated: false, token: undefined }

export default function(state = INITIAL_STATE, action) {
  switch(action.type) {
    // case PW_DOES_NOT_MATCH:
    //   return {...state, passwordmatch: action.payload.something };
    case AUTH_USER:
    console.log("AUTH_USER FIRED", action.payload)
      return {...state, currentUser: action.payload.user.username, currentUserID: action.payload.user.id, authenticated: true, token: action.payload.token };
    case SIGN_OUT:
      return INITIAL_STATE;
    default:
      return state;
  }
}
