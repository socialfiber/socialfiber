import { AUTH_USER, UNAUTH_USER, AUTH_ERROR} from '../actions/types';

const INITIAL_STATE = {authInfo: {currentUser: ""}, authenticated: null}

export default function(state = [], action) {
  switch(action.type) {
    case 'AUTH_USER':
      return action.payload;
    default:
      return state;
  }
}
