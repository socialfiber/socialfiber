import axios from 'axios';
import { FETCH_FOOD_DIARY, SUBMIT_DIARY_ENTRY, DELETE_DIARY_ENTRY } from './types';

export function fetchFoodDiary() {
  const data = {
    params: {
      userID: localStorage.getItem('userID')
    }
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
  foodDiaryEntryObj.userID = localStorage.getItem('userID');
  return axios.post('/api/diaryEntries/singleEntry', foodDiaryEntryObj)
    .then((response) => {
      return { type: SUBMIT_DIARY_ENTRY, payload: response.data }
    })
    .catch((err) => {
      console.error(err);
    });
}

export function deleteFoodDiaryEntry(foodDiaryEntryObj) {
  foodDiaryEntryObj.userID = localStorage.getItem('userID');
  const data = {
    params: foodDiaryEntryObj
  }
  return axios.delete('/api/diaryEntries/singleEntry', data)
    .then((response) => {
      return;
    })
    .catch((err) => {
      console.error(err);
    });
}
