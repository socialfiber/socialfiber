import { FETCH_ALL_USERS, FETCH_USER_DATA, SUBMIT_USER_STATS, CHANGE_PASSWORD, UPDATE_USER_STATS, RESET_ERROR, FETCH_PROFILE_PIC, REDIRECT_PROFILE, LEAVE_PAGE } from './types';
import { browserHistory } from 'react-router';
import axios from 'axios';
import Cookies from 'js-cookie';
import _ from 'underscore';


export function fetchAllUsers() {
  const data = {
    params: { userID: Cookies.get('userID')},
    headers: { 'x-access-token': Cookies.get('token') }
  }
  return axios.get('/api/users/getAllUsers', data)
    .then((response) => {
      return { type: FETCH_ALL_USERS, payload: response.data };
    })
    .catch((error) => {
      console.error(error);
    });
}

export function fetchUserData() {
  const data = {
    params: { userID: Cookies.get('userID') },
    headers: { 'x-access-token': Cookies.get('token') }
  }
  return axios.get('/api/users/getUserData', data)
    .then((response) => {
      if(response.data.question === null) {
        browserHistory.push('/questionnaire');
        return { type: REDIRECT_PROFILE };
      } else {
        for(var total in response.data.nutritionTotals) {
          response.data.nutritionTotals[total].date = response.data.nutritionTotals[total].date.substr(0,10);
        }
        return { type: FETCH_USER_DATA, payload: response.data };
      }
    })
    .catch((error) => {
      console.error(error);
    });
}

export function fetchProfile(otherID) {
  if(otherID === Cookies.get('userID')) {
    browserHistory.push('/userProfile');
    return { type: REDIRECT_PROFILE };
  } else {
    const data = {
      headers: { 'x-access-token': Cookies.get('token') }
    }
    return axios.get('/api/users/browse/'+otherID, data)
      .then((response) => {
        for(var total in response.data.nutritionTotals) {
          response.data.nutritionTotals[total].date = response.data.nutritionTotals[total].date.substr(0,10);
        }
        response.data.nutritionTotals = _.sortBy(response.data.nutritionTotals, 'date');
        return { type: FETCH_USER_DATA, payload: response.data }
      })
      .catch((error) => {
        console.error(error);
      });
  }
}

export function submitUserStats(userStatsObj) {
  if(!userStatsObj.age || !userStatsObj.ft || !userStatsObj.weight || !userStatsObj.gender) {
    return new Promise((resolve, reject) => {
      resolve({ type: SUBMIT_USER_STATS, payload: 'Please fill out all fields.' })
    });
  } else if((userStatsObj.age !== parseInt(userStatsObj.age, 10)) || (userStatsObj.ft !== parseInt(userStatsObj.ft, 10)) || (userStatsObj.in && userStatsObj.in !== parseInt(userStatsObj.in, 10)) || (userStatsObj.weight !== parseInt(userStatsObj.weight, 10))) {
    return new Promise((resolve, reject) => {
      resolve({ type: SUBMIT_USER_STATS, payload: 'Age, Height, and Weight must be valid numbers.' })
    });
  } else if(userStatsObj.age < 13 || userStatsObj.age > 70) {
    return new Promise((resolve, reject) => {
      resolve({ type: SUBMIT_USER_STATS, payload: 'Please enter valid age between 13 and 70.' })
    });
  } else if(userStatsObj.ft < 4 || userStatsObj.ft > 8 || userStatsObj.in < 0 || userStatsObj.in > 11) {
    return new Promise((resolve, reject) => {
      resolve({ type: SUBMIT_USER_STATS, payload: `Please enter valid height between 4'0" and 8'11".` })
    });
  } else if(userStatsObj.weight < 70 || userStatsObj.weight > 300) {
    return new Promise((resolve, reject) => {
      resolve({ type: SUBMIT_USER_STATS, payload: 'Please enter valid weight between 70lb and 300lb.' })
    });
  } else {
    userStatsObj.user_id = Cookies.get('userID');
    userStatsObj.height = userStatsObj.ft*12 + (userStatsObj.in || 0);
    userStatsObj.gender = userStatsObj.gender.value;
    userStatsObj.preg = userStatsObj.preg ? userStatsObj.preg.value : false
    userStatsObj.lact = userStatsObj.lact ? userStatsObj.lact.value : false
    const data = userStatsObj;
    const config = {
      headers: { 'x-access-token': Cookies.get('token') }
    }
    return axios.post('/api/questions/submitData', data, config)
      .then((response) => {
        browserHistory.push('/userProfile');
        return { type: SUBMIT_USER_STATS, payload: response.data.msg }
      }).catch((error) => {
        console.error(error);
      });
  }
}

export function updateUserStats(userStatsObj) {
  if(!userStatsObj.age || !userStatsObj.ft || !userStatsObj.weight) {
    return new Promise((resolve, reject) => {
      resolve({ type: UPDATE_USER_STATS, payload: 'Please fill out all fields.' })
    });
  } else if((userStatsObj.age !== parseInt(userStatsObj.age, 10)) || (userStatsObj.ft !== parseInt(userStatsObj.ft, 10)) || (userStatsObj.in && userStatsObj.in !== parseInt(userStatsObj.in, 10)) || (userStatsObj.weight !== parseInt(userStatsObj.weight, 10))) {
    return new Promise((resolve, reject) => {
      resolve({ type: UPDATE_USER_STATS, payload: 'Age, Height, and Weight must be valid numbers.' })
    });
  } else if(userStatsObj.age < 13 || userStatsObj.age > 70) {
    return new Promise((resolve, reject) => {
      resolve({ type: UPDATE_USER_STATS, payload: 'Please enter valid age between 13 and 70.' })
    });
  } else if(userStatsObj.ft < 4 || userStatsObj.ft > 8 || (userStatsObj.in && userStatsObj.in < 0) || (userStatsObj.in && userStatsObj.in > 11)) {
    return new Promise((resolve, reject) => {
      resolve({ type: UPDATE_USER_STATS, payload: `Please enter valid height between 4'0" and 8'11".` })
    });
  } else if(userStatsObj.weight < 70 || userStatsObj.weight > 300) {
    return new Promise((resolve, reject) => {
      resolve({ type: UPDATE_USER_STATS, payload: 'Please enter valid weight between 70lb and 300lb.' })
    });
  } else {
    userStatsObj.user_id = Cookies.get('userID');
    userStatsObj.gender = Cookies.get('userGender');
    userStatsObj.preg = userStatsObj.preg ? userStatsObj.preg.value : false
    userStatsObj.lact = userStatsObj.lact ? userStatsObj.lact.value : false
    userStatsObj.height = userStatsObj.ft*12 + (userStatsObj.in || 0);
    const config = {
      headers: { 'x-access-token': Cookies.get('token') }
    }
    return axios.put('/api/questions/submitData', userStatsObj, config)
      .then((response) => {
        return { type: UPDATE_USER_STATS, payload: response.data.msg };
      })
      .catch(function(error) {
        console.error(error);
      });
  }
}

export function submitChangePassword(passwordObj) {
  if (!passwordObj.password || !passwordObj.confirmPW || !passwordObj.newPW) {
    return new Promise((resolve, reject) => {
      resolve({ type: CHANGE_PASSWORD, payload: 'Please fill out all fields.' })
    });
  } else if (passwordObj.password !== passwordObj.confirmPW) {
    return new Promise((resolve, reject) => {
      resolve({ type: CHANGE_PASSWORD, payload: 'Passwords do not match.' })
    });
  } else if (passwordObj.password === passwordObj.newPW) {
    return new Promise((resolve, reject) => {
      resolve({ type: CHANGE_PASSWORD, payload: 'New password must be different than current.' })
    });
  } else {
    passwordObj.userID = Cookies.get('userID');
    const config = {
      headers: { 'x-access-token': Cookies.get('token') }
    }
    return axios.put('/api/users/changePassword', passwordObj, config)
      .then((response) => {
        return { type: CHANGE_PASSWORD, payload: response.data.msg }
      })
      .catch((error) => {
        console.error(error);
      });
  }
}

export function fetchProfilePic(userID) {
  const data = {
    params: { userID: userID },
    headers: { 'x-access-token': Cookies.get('token') }
  }
  return axios.get('/api/profilePics/pic', data)
    .then((response) => {
      return { type: FETCH_PROFILE_PIC, payload: response.data }
    })
    .catch((error) => {
      console.error(error);
    });
}

export function resetError() {
  return new Promise((resolve, reject) => {
    resolve({ type: RESET_ERROR });
  });
}

export function leavePage() {
  return new Promise((resolve, reject) => {
    resolve({ type: LEAVE_PAGE })
  });
}
