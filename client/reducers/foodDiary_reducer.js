import { FETCH_FOOD_DIARY, SUBMIT_DIARY_ENTRY, DELETE_DIARY_ENTRY, NO_RESULT, LEAVE_TAB } from '../actions/types';

const INITIAL_STATE = {
  logs: [],
  msg: null,
}

export default function(state = INITIAL_STATE, action) {
  switch(action.type) {
    case FETCH_FOOD_DIARY:
      return { ...state, logs: action.payload };
    case SUBMIT_DIARY_ENTRY:
      return { ...state, msg: 'Entry successfully added!' }
    case NO_RESULT:
      return { ...state, msg: action.payload }
    case DELETE_DIARY_ENTRY:
      return { ...state }
    case LEAVE_TAB:
      return INITIAL_STATE;
    default:
      return state;
  }
}
