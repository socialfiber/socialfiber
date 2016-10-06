import axios from 'axios';
import { browserHistory } from 'react-router';
import Cookies from 'js-cookie';

export function submitUserStats(userStatsObj) {
  userStatsObj.user_id = Cookies.get('userID');
  userStatsObj.height = userStatsObj.ft*12 + userStatsObj.in;
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
      return { type: 'SUBMIT_USER_STATS' }
    }).catch((error) => {
    	console.log(error);
    })
}
