import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchFoodDiary } from '../actions/foodDiary';

class FoodDiary extends Component {
  componentWillMount() {
    this.props.fetchFoodDiary();
  }

  render() {
    if(this.props.userData !== null) {
      return (
        <div>
          <h3>Food Diary</h3>
          <div>Age: {this.props.userData.age}</div>
          <div>Gender: {this.props.userData.gender}</div>
          <div>Height: {this.props.userData.height}</div>
          <div>Weight: {this.props.userData.weight}</div>
        </div>
      );
    } else {
      return (
        <div>
          <h3>Loading your food diary...</h3>
        </div>
      )
    }
  }
}

function mapStateToProps(state) {
  return {
    userData: state.userProfile
  }
}

export default connect(mapStateToProps, { fetchFoodDiary })(FoodDiary);
