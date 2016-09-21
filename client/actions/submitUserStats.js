import axios from 'axios';

export function submitUserStats(userStatsObj) {
  var response = axios.post('/api/questions/enterData', userStatsObj)
  console.log(response);

  return {
    type: 'SUBMIT_USER_STATS'
  }
}
