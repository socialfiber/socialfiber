import React, { Component } from 'react';
import { connect } from 'react-redux';
import ChangePassword from './ChangePassword';
import UpdateQuestionnaire from './UpdateQuestionnaire';
import ImageUpload from '../../ToolBox/ImageUpload';


class UpdateUserData extends Component {

  render() {

    return (
      <div>
        <h1>Update Profile</h1>
        <h3>Change Password</h3>
        <ChangePassword />
        <h3>Update Info</h3>
        <UpdateQuestionnaire />
        <h3>Upload a profile picture.</h3>
        <ImageUpload />
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
