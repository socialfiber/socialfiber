import { FETCH_USER_DATA, UPDATE_USER_DATA, FETCH_MACROS, LEAVE_PAGE } from '../actions/types';

const INITIAL_STATE = { userData: null, idealMacros: null, actualMacros: null }

export default function(state = INITIAL_STATE, action) {
  switch(action.type) {
    case FETCH_USER_DATA:
      return { ...state, userData: action.payload.question, idealMacros: action.payload.dietaryProfile, actualMacros: action.payload.nutritionTotals }
    case UPDATE_USER_DATA:
      return state;
    case FETCH_MACROS:
      console.log("FETCHED MACROS", action.payload)
      return { ...state, actualMacros: action.payload }
    case LEAVE_PAGE:
      return INITIAL_STATE;
    default:
      return state;
  }
}
