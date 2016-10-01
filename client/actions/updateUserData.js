import axios from 'axios';
import { UPDATE_USER_DATA, TOGGLE_EDITING, FETCH_IDEAL_MACROS, FETCH_ACTUAL_MACROS } from './types';
import Cookies from 'js-cookie';

export function updateUserData(userStatsObj) {
  userStatsObj.user_id = Cookies.get('userID');
  userStatsObj.gender = userStatsObj.gender.value;
  userStatsObj.preg = userStatsObj.preg.value;
  userStatsObj.lact = userStatsObj.lact.value;
  userStatsObj.height = userStatsObj.ft*12+userStatsObj.in;
  console.log("userStatsObj: ", userStatsObj);
  const config = {
    headers: { 'x-access-token': Cookies.get('token') }
  }
  return axios.post('/api/questions/updateData', userStatsObj, config)
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
