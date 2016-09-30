import axios from 'axios';
import { UPDATE_USER_DATA, TOGGLE_EDITING, FETCH_IDEAL_MACROS, FETCH_ACTUAL_MACROS } from './types';

export function updateUserData(userStatsObj) {
  userStatsObj.user_id = localStorage.getItem('userID');
  userStatsObj.gender = userStatsObj.gender.value;
  userStatsObj.preg = userStatsObj.preg.value;
  userStatsObj.lact = userStatsObj.lact.value;
  userStatsObj.height = userStatsObj.ft*12+userStatsObj.in;
  console.log("userStatsObj: ", userStatsObj);
  return axios.post('/api/questions/updateData', userStatsObj)
  .then(() => {
    console.log("POST request completed");
    return {
      type: UPDATE_USER_DATA,
    };
  })
  .catch(function(error) {
    console.error(error);
  })
}
