import { FETCH_USER_DATA, UPDATE_USER_DATA, FETCH_IDEAL_MACROS, FETCH_ACTUAL_MACROS } from '../actions/types';

const INITIAL_STATE = { userData: [], idealMacros: [], actualMacros: [] }

export default function(state = INITIAL_STATE, action) {
  switch(action.type) {
    case FETCH_USER_DATA:
      return { ...state, userData: action.payload };
    case UPDATE_USER_DATA:
      // console.log("User information has been updated.");
      return;
    case FETCH_IDEAL_MACROS:
      return { ...state, idealMacros: action.payload };
    case FETCH_ACTUAL_MACROS:
      return { ...state, actualMacros: action.payload };
    default:
      return state;
  }
}
