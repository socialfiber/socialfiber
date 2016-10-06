import React, { Component } from 'react';
import { connect } from 'react-redux';
import ChangePassword from './ChangePassword';
import UpdateQuestionnaire from './UpdateQuestionnaire';


class UpdateUserData extends Component {

  render() {

    return (
      <div>
        <h3>Update Profile</h3>
        <ChangePassword />
        <UpdateQuestionnaire />
      </div>
    );

  }

}

const mapStateToProps = (state) => {
  return {
    userData: state.userProfile.userData,
  }
}

export default connect(mapStateToProps, null)(UpdateUserData);
