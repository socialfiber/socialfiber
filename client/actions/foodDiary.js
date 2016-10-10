import { FETCH_FOOD_DIARY, FETCH_MACROS, SUBMIT_DIARY_ENTRY, DELETE_DIARY_ENTRY, NO_RESULT, LEAVE_TAB } from './types';
import axios from 'axios';
import Cookies from 'js-cookie';
import _ from 'underscore';


export function fetchFoodDiary() {
  const data = {
    params: { userID: Cookies.get('currentProfileID') },
    headers: { 'x-access-token': Cookies.get('token') }
  }
  return axios.get('/api/diaryEntries/allEntries', data)
    .then((response) => {
      const groupedEntries = _.groupBy(response.data, 'date')
      const groupedEntriesArray = [];
      for(var date in groupedEntries) {
        groupedEntriesArray.push({
          date: date.substr(0,10),
          logs: groupedEntries[date]
        });
      }
      _.sortBy(groupedEntriesArray, 'date');
      return { type: FETCH_FOOD_DIARY, payload: groupedEntriesArray }
    })
    .catch((error) => {
      console.error(error);
    });
}

export function fetchMacros() {
  const data = {
    params: { userID: Cookies.get('currentProfileID') },
    headers: { 'x-access-token': Cookies.get('token') }
  }
  return axios.get('/api/users/getUserData', data)
    .then((response) => {
      return { type: FETCH_MACROS, payload: response.data.nutritionTotals }
    })
    .catch((error) => {
      console.error(error);
    });
}

export function submitFoodDiaryEntry(foodDiaryEntryObj) {
  if(!foodDiaryEntryObj.food || !foodDiaryEntryObj.qty || !foodDiaryEntryObj.date) {
    return new Promise((resolve, reject) => {
      resolve({ type: NO_RESULT, payload: 'Please fill out all fields.' });
    });
  } else if(foodDiaryEntryObj.qty !== parseInt(foodDiaryEntryObj.qty, 10)) {
    return new Promise((resolve, reject) => {
      resolve({ type: NO_RESULT, payload: 'qty/srv must be a valid number.' });
    });
  } else {
    foodDiaryEntryObj.userID = Cookies.get('userID');
    foodDiaryEntryObj.food = foodDiaryEntryObj.food.split(' ').slice(0,4).join(' ');
    const data = foodDiaryEntryObj;
    const config = {
      headers: { 'x-access-token': Cookies.get('token') }
    }
    return axios.post('/api/diaryEntries/singleEntry', data, config)
      .then((response) => {
        if(response.data.msg) {
          return { type: NO_RESULT, payload: response.data.msg }
        } else {
          return { type: SUBMIT_DIARY_ENTRY }
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }
}

export function deleteFoodDiaryEntry(foodDiaryEntryObj) {
  foodDiaryEntryObj.userID = Cookies.get('userID');
  const data = {
    params: foodDiaryEntryObj,
    headers: { 'x-access-token': Cookies.get('token') }
  }
  return axios.delete('/api/diaryEntries/singleEntry', data)
    .then((response) => {
      return { type: DELETE_DIARY_ENTRY }
    })
    .catch((error) => {
      console.error(error);
    });
}

export function leaveTab() {
  return new Promise((resolve, reject) => {
    resolve({ type: LEAVE_TAB });
  });
}
