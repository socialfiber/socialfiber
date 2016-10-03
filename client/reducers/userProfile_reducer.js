import { FETCH_USER_DATA, UPDATE_USER_DATA, FETCH_MACROS } from '../actions/types';

const INITIAL_STATE = { userData: null, idealMacros: null, actualMacros: null }

export default function(state = INITIAL_STATE, action) {
  switch(action.type) {
    case FETCH_USER_DATA:
      return {...state, userData: action.payload};
    case UPDATE_USER_DATA:
      // console.log("User information has been updated.");
      return;
    case FETCH_MACROS:
      // console.log("in reducer: ", action.payload.nutritionTotals)
      if(action.payload.nutritionTotals.length > 0) { // If user's food diary is NOT empty
        return {...state, idealMacros: action.payload.dietaryProfile, actualMacros: action.payload.nutritionTotals[0]};
      }
      return {...state, idealMacros: action.payload.dietaryProfile, actualMacros: null}
    default:
      return state;
  }
}
