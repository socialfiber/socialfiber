import { CREATE_NEW_GROUP } from '../actions/createNewGroup'


export default function(state = null, action){
  switch(action.type){
    case CREATE_NEW_GROUP:
      return { all: action.payload.data };
    default:
      return state
  }
}
