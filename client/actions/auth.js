import axios from 'axios';
import { browserHistory } from 'react-router'
import { AUTH_USER, UNAUTH_USER, AUTH_ERROR } from './types'


export function submitSignIn(usernameAndPasswordObj) {
  console.log("inside submitSignIn!!!!", usernameAndPasswordObj);
  return (dispatch) => {
    console.log('inside dispatch!!!!!!');
    return axios.post('/api/users/login', usernameAndPasswordObj)
      .then((response) => {
        console.log("RESPONSE!!!", response);
        dispatch({ type: 'AUTH_USER', payload: response.data });
      })
      .catch(()=>{
        console.log("Wrong login info")
      });
  }
}