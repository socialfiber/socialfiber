import { HANDLE_IMG_UPLOAD } from '../actions/types'
const INITIAL_STATE = { uploadedFileURL : '' };

export default function (state=INITIAL_STATE, action){
  switch(action.type) {
    case :
      return {...state, uploadedFileURL: action.payload.data};
  default:
      return state;
  }
}
