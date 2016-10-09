import { FETCH_FOOD_DIARY, SUBMIT_DIARY_ENTRY, DELETE_DIARY_ENTRY, LEAVE_TAB } from '../actions/types';

const INITIAL_STATE = {
  logs: []
}

export default function(state = INITIAL_STATE, action) {
  switch(action.type) {
    case FETCH_FOOD_DIARY:
      console.log("INSIDE FOOD DIARY REDUCER", action)
      return { ...state, logs: action.payload };
    case SUBMIT_DIARY_ENTRY:
    case DELETE_DIARY_ENTRY:
      return { ...state }
    case LEAVE_TAB:
      return INITIAL_STATE;
    default:
      return state;
  }
}
