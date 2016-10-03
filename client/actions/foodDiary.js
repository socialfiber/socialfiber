import axios from 'axios';
import Cookies from 'js-cookie';
import { FETCH_FOOD_DIARY, SUBMIT_DIARY_ENTRY, DELETE_DIARY_ENTRY } from './types';

export function fetchFoodDiary() {
  const data = {
    params: { userID: Cookies.get('userID') },
    headers: { 'x-access-token': Cookies.get('token') }
  }
  return axios.get('/api/diaryEntries/allEntries', data)
    .then((response) => {
      return { type: FETCH_FOOD_DIARY, payload: response.data }
    })
    .catch((err) => {
      console.error(err);
    });
}

export function submitFoodDiaryEntry(foodDiaryEntryObj) {
  foodDiaryEntryObj.userID = Cookies.get('userID');
  const data = foodDiaryEntryObj;
  const config = {
    headers: { 'x-access-token': Cookies.get('token') }
  }
  return axios.post('/api/diaryEntries/singleEntry', data, config)
    .then((response) => {
      return { type: SUBMIT_DIARY_ENTRY }
    })
    .catch((err) => {
      console.error(err);
    });
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
    .catch((err) => {
      console.error(err);
    });
}
