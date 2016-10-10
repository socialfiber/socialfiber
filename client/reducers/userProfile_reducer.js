import { FETCH_USER_DATA, SUBMIT_USER_STATS, UPDATE_USER_STATS, HANDLE_IMG_UPLOAD, CHANGE_PASSWORD, RESET_ERROR, FETCH_MACROS, LEAVE_PAGE } from '../actions/types';

const INITIAL_STATE = {
  userData: null,
  idealMacros: {
    fat: 0,
    fat_min: 0,
    fat_max: 0,
    carb: 0,
    carb_min: 0,
    carb_max: 0,
    prot: 0,
    prot_min: 0,
    prot_max: 0,
    fib: 0,
    n6: 0,
    n6_min: 0,
    n6_max: 0
  },
  actualMacros: [],
  changePW: null,
  submitStats: null,
  updateStats: null,
  imageUpload: null
}

export default function(state = INITIAL_STATE, action) {
  switch(action.type) {
    case FETCH_USER_DATA:
      return { ...state, username: action.payload.username, userData: action.payload.question, idealMacros: action.payload.dietaryProfile, actualMacros: action.payload.nutritionTotals }
    case SUBMIT_USER_STATS:
      return { ...state, submitStats }
    case UPDATE_USER_STATS:
      return { ...state, updateStats: action.payload }
    case CHANGE_PASSWORD:
      return { ...state, changePW: action.payload }
    case RESET_ERROR:
      return { ...state, changePW: null, updateStats: null, imageUpload: null }
    case FETCH_MACROS:
      return { ...state, actualMacros: action.payload }
    case HANDLE_IMG_UPLOAD:
      return { ...state, imageUpload: action.payload }
    case LEAVE_PAGE:
      return INITIAL_STATE;
    default:
      return state;
  }
}
