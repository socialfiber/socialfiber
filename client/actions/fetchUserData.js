import axios from 'axios';
import { FETCH_USER_DATA } from './types';

export function fetchUserData() {
  // axios.get('/api/users/getUserData')
  // .then(function(response) {
  //   return {
  //     type: FETCH_USER_DATA,
  //     payload: response
  //   };
  // })
  // .catch(function(error) {
  //   console.error(error);
  // })
  // return (dispatch) => {
  //   console.log("Action creator was fired");
  //   axios.get('/api/users/getUserData')
  //   .then(response => {
  //     dispatch({
  //       type: FETCH_USER_DATA,
  //       payload: response.data
  //     })
  //   })
  //   .catch(error => {
  //     console.error(error);
  //   })
  // }

  const request = axios.get('/api/questions/getData', {
    params: {
      userID: localStorage.getItem('userID')
    }
  });
  console.log("This is request: ", request);
  return {
    type: FETCH_USER_DATA,
    payload: request
  }
}
