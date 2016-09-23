import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchFoodDiary } from '../actions/foodDiary';
import FoodDiaryLog from './FoodDiaryLog';
import FoodDiaryEntry from './FoodDiaryEntry';

class FoodDiary extends Component {
  
  componentWillMount() {
    this.props.fetchFoodDiary();
  }

  render() {
    if(this.props.diaryData !== null) {
      const logs = this.props.diaryData.map((log, idx) =>
        <FoodDiaryLog key={idx} log={log} />
      );
      return (
        <div>
          <h1>Food Diary</h1>
          <FoodDiaryEntry />
          <table>
            <tr>
              <th>Date</th>
              <th>Qty</th>
              <th>Food</th>
            </tr>
            {logs}
          </table>
        </div>
      );
    } else {
      return (
        <div>
          <h3>Loading your food diary...</h3>
        </div>
      );  
    }
  }

}

const mapStateToProps = (state) => {
  return {
    diaryData: state.foodDiary
  }
}

export default connect(mapStateToProps, { fetchFoodDiary })(FoodDiary);
