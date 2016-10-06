import { FETCH_USER_DATA, FETCH_MACROS, CHANGE_PASSWORD, UPDATE_USER_DATA, TOGGLE_EDITING, FETCH_IDEAL_MACROS, FETCH_ACTUAL_MACROS } from './types';
import { browserHistory } from 'react-router';
import axios from 'axios';
import Cookies from 'js-cookie';


export function resetError() {
  return { type: CHANGE_PASSWORD, payload: '' }
}

export function submitChangePassword(passwordObj) {
  if (passwordObj.password !== passwordObj.confirmPW) {
    return { type: CHANGE_PASSWORD, payload: 'Passwords do not match' };
  } else if (passwordObj.password === passwordObj.newPW) {
    return { type: CHANGE_PASSWORD, payload: 'New password must be different than current.' };
  } else {
    passwordObj.userID = Cookies.get('userID');
    const config = {
      headers: { 'x-access-token': Cookies.get('token') }
    }
    return axios.post('/api/users/changePassword', passwordObj, config)
      .then((response) => {
        return { type: CHANGE_PASSWORD, payload: response.data.msg }
      })
      .catch((error) => {
        console.error(error);
      });
  }
}

export function fetchUserData() {
  const data = {
    params: { userID: Cookies.get('userID') },
    headers: { 'x-access-token': Cookies.get('token') }
  }
  return axios.get('/api/users/getUserData', data)
  .then((response) => {
    return {
      type: FETCH_USER_DATA,
      payload: response.data.question
    };
  })
  .catch((error) => {
    console.error(error);
  })
}

export function fetchMacros(userID) {
  const data = {
    params: { userID: userID },
    headers: { 'x-access-token': Cookies.get('token') }
  }
  return axios.get('/api/users/getUserData', data)
  .then((response) => {
    // console.log("Macros:  ", response.data);
    return {
      type: FETCH_MACROS,
      payload: response.data
    }
  })
  .catch((error) => {
    console.error(error)
  })
}

export function updateUserData(userStatsObj) {
  userStatsObj.user_id = Cookies.get('userID');
  userStatsObj.gender = Cookies.get('userGender');
  userStatsObj.preg = userStatsObj.preg ? userStatsObj.preg.value : false
  userStatsObj.lact = userStatsObj.lact ? userStatsObj.lact.value : false
  userStatsObj.height = userStatsObj.ft*12+userStatsObj.in;
  const config = {
    headers: { 'x-access-token': Cookies.get('token') }
  }
  return axios.post('/api/questions/updateData', userStatsObj, config)
  .then((response) => {
    return { type: UPDATE_USER_DATA };
  })
  .catch(function(error) {
    console.error(error);
  })
}

export function submitUserStats(userStatsObj) {
  userStatsObj.user_id = Cookies.get('userID');
  userStatsObj.height = userStatsObj.ft*12 + (userStatsObj.in || 0);
  userStatsObj.gender = userStatsObj.gender.value;
  userStatsObj.preg = userStatsObj.preg ? userStatsObj.preg.value : false
  userStatsObj.lact = userStatsObj.lact ? userStatsObj.lact.value : false
  const data = userStatsObj;
  const config = {
    headers: { 'x-access-token': Cookies.get('token') }
  }
  return axios.post('/api/questions/enterData', data, config)
    .then((response) => {
      browserHistory.push('/userProfile');
      return { type: SUBMIT_USER_STATS }
    }).catch((error) => {
      console.error(error);
    });
}
