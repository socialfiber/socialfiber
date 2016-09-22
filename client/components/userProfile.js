import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchUserData } from '../actions/fetchUserData';

class UserProfile extends Component {
  componentWillMount() {
    this.props.fetchUserData();
  }
<<<<<<< 0d7cdfa230f8a719f9cc9d44b9bad4bf9619200a
  // renderUserData() {
  //   console.log("This is this.props.userData: ", this.props.userData)
  //   // return this.props.userData.map((data) => {
  //   //   return <div>{data}</div>;
  //   // })
  // }
=======

>>>>>>> [pull] progression on user profile feature
  render() {
    if(this.props.userData !== null) {
      return (
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
<<<<<<< 0d7cdfa230f8a719f9cc9d44b9bad4bf9619200a
  }
}

function mapStateToProps(state) {
  return {
    userData: state.userProfile
  }
}
=======
  }
}

function mapStateToProps(state) {
  return {
    userData: state.userProfile
  }
}

export default connect(mapStateToProps, { fetchUserData })(UserProfile);
>>>>>>> [pull] progression on user profile feature
