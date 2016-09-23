import { FETCH_FOOD_DIARY, SUBMIT_DIARY_ENTRY } from '../actions/types';

export default function(state=null, action) {
  switch(action.type) {
    case FETCH_FOOD_DIARY:
    // to do: determine how you want payload received.
      //do we need to automatically calc user intake?
      //need to re render list of food diary entries upon submit. 
      return action.payload;
    case SUBMIT_DIARY_ENTRY:
    	return action.payload;
    default:
      return state;
  }
}