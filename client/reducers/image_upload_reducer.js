import { HANDLE_IMG_UPLOAD } from '../actions/types'
const INITIAL_STATE = { uploadedFileURL : '' };

export default function (state=INITIAL_STATE, action){
  switch(action.type) {
    case HANDLE_IMG_UPLOAD :
      //TO-DO: need to take uploadedFileURL, send to DB to store under user table where id
          //=== userID, then render to pf
      return {...state, uploadedFileURL: action.payload.data};
  default:
      return state;
  }
}
