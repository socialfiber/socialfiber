import axios from 'axios';

export function submitSignIn(usernameAndPasswordObj) {
  //to do: input sign in endpoint
  var response = axios.post('', usernameAndPasswordObj)
  console.log(response);

  return {
    type: 'SUBMIT_SIGNIN'
  }
}
