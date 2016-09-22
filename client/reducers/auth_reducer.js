import {
  AUTH_USER,
  UNAUTH_USER,
  AUTH_ERROR
} from '..actions/types';


const INITIAL_STATE = {authInfo: {currentUser: ""}, authenticated: null}

export default function(INITIAL_STATE, action) {
  switch(action.type){
    case AUTH_USER :
      return {...state, error:'', authenticated: true, authInfo: action.payload};
    case UNAUTH_USER :
      return {...state, error:'', authenticated: false, authInfo:{}};
    default :
      return state
  }
}
