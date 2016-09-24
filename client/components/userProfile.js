import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchUserData } from '../actions/fetchUserData';
import NavBar from './navbar';


class UserProfile extends Component {

  componentWillMount() {
    this.props.fetchUserData();
  }

  render() {
    if(this.props.userData !== null) {
      return (
        <NavBar />
        <div>
          <h3>User Info</h3>
          <div>Age: {this.props.userData.age}</div>
          <div>Gender: {this.props.userData.gender}</div>
          <div>Height: {this.props.userData.height}</div>
          <div>Weight: {this.props.userData.weight}</div>
        </div>
      );
    } else {
      return (
        <div>
          <h3>Loading your profile...</h3>
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

export default connect(mapStateToProps, { fetchUserData })(UserProfile);
