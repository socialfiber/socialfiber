import axios from 'axios';
import { browserHistory } from 'react-router';

export function submitUserStats(userStatsObj) {
	console.log(userStatsObj)
  userStatsObj.user_id = localStorage.getItem('userID');
  userStatsObj.gender = userStatsObj.gender.value;
  userStatsObj.height = userStatsObj.ft*12+userStatsObj.in;
  return axios.post('/api/questions/enterData', userStatsObj)
  	.then((response) => {
  	  return { type: 'SUBMIT_USER_STATS' }
      browserHistory.push('/userProfile')
    }).catch((error) => {
    	console.log(error);
    })
}
