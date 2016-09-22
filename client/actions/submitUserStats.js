import axios from 'axios';
import { browserHistory } from 'react-router';

export function submitUserStats(userStatsObj) {
  var response = axios.post('/api/questions/enterData', userStatsObj)
    .then((response)=>{
      //browserHistory.push('/userProfile')
    })


  return {
    type: 'SUBMIT_USER_STATS'
  }
}
