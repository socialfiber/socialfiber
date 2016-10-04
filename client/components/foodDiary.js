import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchFoodDiary } from '../actions/foodDiary';
import FoodDiaryLog from './FoodDiaryLog';
import FoodDiaryEntry from './FoodDiaryEntry';

class FoodDiary extends Component {

  componentWillMount() {
    this.props.fetchFoodDiary();
  }

  // componentDidUpdate() {
  //   this.props.fetchFoodDiary();
  // }

  render() {
    if(this.props.diaryData) {
      const diaryDataByDate = this.props.diaryData.map((set, idx) => {
        const logsPerDay = set.logs.map((log, idx) => <FoodDiaryLog key={idx} log={log} />)
        return (
          <li key={idx}>
            <h3>{set.date}</h3>
            <table>
              <tbody>
                <tr>
                  <th>qty</th>
                  <th>Food Name</th>
                  <th>Calories (kcal)</th>
                  <th>Carbohydrates (g)</th>
                  <th>Protein (g)</th>
                  <th>Fat (g)</th>
                  <th>Fiber (g)</th>
                  <th>n6 (g)</th>
                  <th>delete</th>
                </tr>
                {logsPerDay}
              </tbody>
            </table>
          </li>
        )
      })
      return (
        <div>
          <h1>Food Diary</h1>
          <FoodDiaryEntry />
          <ul>
            {diaryDataByDate}
          </ul>
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
    diaryData: state.foodDiary.logs
  }
}


export default connect(mapStateToProps, { fetchFoodDiary })(FoodDiary);
