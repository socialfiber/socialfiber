import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchUserData } from '../actions/fetchUserData';

class UserProfile extends Component {
  componentWillMount() {
    this.props.fetchUserData();
  }
  // renderUserData() {
  //   console.log("This is this.props: ", this.props.userData)
  //   return this.props.userData.map((data) => {
  //     return <div>{data}</div>;
  //   })
  // }
  render() {
    return (
      <div>
        <h3>User Info</h3>
        {/* {this.renderUserData()} */}
      </div>
    );
  }
}

// function mapStateToProps(state) {
//   return {
//     userData: state.UserProfile
//   }
// }

>>>>>>> [pull] progression on user profile feature
export default connect(null, { fetchUserData })(UserProfile);
