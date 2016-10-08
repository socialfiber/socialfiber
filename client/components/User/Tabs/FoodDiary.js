import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchFoodDiary, leaveTab } from '../../../actions/foodDiary';
import FoodDiaryLog from './FoodDiaryLog';
import FoodDiaryEntry from './FoodDiaryEntry';
import RadarGraph from '../../ToolBox/RadarGraph';
import Cookies from 'js-cookie'


class FoodDiary extends Component {

  componentDidMount() {
    this.props.fetchFoodDiary();
  }

  // componentDidUpdate() {
  //   this.props.fetchFoodDiary();
  // }

  componentWillUnmount() {
    this.props.leaveTab();
  }

  render() {
    
    const foodDiaryEntry = Cookies.get('currentProfileID') !== Cookies.get('currentProfileID') ? <FoodDiaryEntry /> : null;

    if(this.props.diaryData) {
      const diaryDataByDate = this.props.diaryData.map((set, idx) => {
        const logsPerDay = set.logs.map((log, idx) => <FoodDiaryLog key={idx} log={log} />);
        const date = set.date
        return (
          <li key={idx}>
            <h3>{date}</h3>
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
            <RadarGraph type={'amount'} size={'small'} date={date} />
            <RadarGraph type={'ratio'} size={'small'} date={date} />
          </li>
        )
      });
      return (
        <div>
          <h1>Food Diary</h1>
          {foodDiaryEntry}
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


export default connect(mapStateToProps, { fetchFoodDiary, leaveTab })(FoodDiary);
