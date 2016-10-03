import { CHANGE_TAB } from '../actions/types';

const INITIAL_STATE = { tabsList: [], currentTab: null }

export default function(state = INITIAL_STATE, action) {
  	console.log(action)
  switch(action.type) {
    case CHANGE_TAB:
      return {...state, currentTab: action.payload};
    default:
      return state;
  }
}
