import axios from 'axios';
import { browserHistory } from 'react-router'
import { AUTH_USER, UNAUTH_USER, AUTH_ERROR } from './types'


export function submitSignIn(usernameAndPasswordObj) {
  //to do: input sign in endpoint
    //pass in dispatch fn
      //on success in promise, call dispatch fn({type: redtype,payload:response})
      return function(dispatch) => {
      axios.post('/api/users/login', usernameAndPasswordObj){
        .then(response=> {
          dispatch({ type: AUTH_USER, payload: response.data })
        })
        .catch(()=>{
          console.log("Wrong login info")
        });
        }
      }
    }

  return {
    type: 'SUBMIT_SIGNIN'
  }
}
