import { FETCH_USER_DATA, UPDATE_USER_DATA, HANDLE_IMG_UPLOAD, CHANGE_PASSWORD, FETCH_MACROS, LEAVE_PAGE } from '../actions/types';

const INITIAL_STATE = {
  userData: null,
  idealMacros: null,
  actualMacros: null,
  changePW: null,
  imageUpload: null
}

export default function(state = INITIAL_STATE, action) {
  switch(action.type) {
    case FETCH_USER_DATA:
      return { ...state, username: action.payload.username, userData: action.payload.question, idealMacros: action.payload.dietaryProfile, actualMacros: action.payload.nutritionTotals }
    case UPDATE_USER_DATA:
      return state;
    case CHANGE_PASSWORD:
      return { ...state, changePW: action.payload }
    case FETCH_MACROS:
      console.log("FETCHED MACROS", action.payload)
      return { ...state, actualMacros: action.payload }
    case HANDLE_IMG_UPLOAD:
      return { ...state, imageUpload: action.payload }
    case LEAVE_PAGE:
      return INITIAL_STATE;
    default:
      return state;
  }
}
