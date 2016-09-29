import { FETCH_FOOD_DIARY, SUBMIT_DIARY_ENTRY, DELETE_DIARY_ENTRY } from '../actions/types';


const INITIAL_STATE = {foods: [], foodEntry: null}

export default function(state=INITIAL_STATE, action) {
  switch(action.type) {
    case FETCH_FOOD_DIARY:
      return {...state, foods: action.payload};
    case SUBMIT_DIARY_ENTRY:
      return {...state, foodEntry:action.payload};
    default:
      return state;
  }
}
