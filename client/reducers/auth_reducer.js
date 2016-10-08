import { AUTH_USER, AUTH_ERROR, RESET_ERROR, SIGN_OUT } from '../actions/types';

const INITIAL_STATE = {
  currentUser: undefined,
  authenticated: false,
  token: undefined,
  err: null
}

export default function(state = INITIAL_STATE, action) {
  switch(action.type) {
    case AUTH_USER:
      return { ...state, currentUser: action.payload.user.username, currentUserID: action.payload.user.id, authenticated: true, token: action.payload.token }
    case AUTH_ERROR:
      return { ...state, err: action.payload }
    case RESET_ERROR:
      console.log('inside RESET_ERROR')
      return { ...state, err: null }
    case SIGN_OUT:
      return INITIAL_STATE;
    default:
      return state;
  }
}
