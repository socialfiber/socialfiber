import axios from 'axios';

export function submitSignIn(usernameAndPasswordObj) {
  //to do: input sign in endpoint
    //pass in dispatch fn
      //on success in promise, call dispatch fn({type: redtype,payload:response})

  return {
    type: 'SUBMIT_SIGNIN'
  }
}
