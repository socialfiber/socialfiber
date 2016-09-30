import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchFoodDiary } from '../actions/foodDiary';
import FoodDiaryLog from './FoodDiaryLog';
import FoodDiaryEntry from './FoodDiaryEntry';
import NavBar from './navbar';



class FoodDiary extends Component {


  componentWillMount() {
    this.props.fetchFoodDiary();
  }

  // componentDidUpdate() {
  //   this.props.fetchFoodDiary();
  // }

  render() {
    if(this.props.diaryData) {
      const logs = this.props.diaryData.map((log, idx) =>
        <FoodDiaryLog key={idx} log={log} />
      );
      return (
        <div>
        <NavBar />
          <h1>Food Diary</h1>
          <FoodDiaryEntry />
          <table>
            <tr>
              <th>Date</th>
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
    diaryData: state.foodDiary.logs
  }
}


export default connect(mapStateToProps, { fetchFoodDiary })(FoodDiary);
