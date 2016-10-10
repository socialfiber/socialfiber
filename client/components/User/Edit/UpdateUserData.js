import React, { Component } from 'react';
import { connect } from 'react-redux';
import { resetError } from '../../../actions/users';
import ChangePassword from './ChangePassword';
import UpdateQuestionnaire from './UpdateQuestionnaire';
import ImageUpload from '../../ToolBox/ImageUpload';


class UpdateUserData extends Component {

  componentWillUnmount() {
    this.props.resetError();
  }

  render() {

    return (
      <div className="updateUserData">
        <h1 className="updatePF">Update Profile</h1>
        <div className="changePW-div">
          <h3>Change Password</h3>
          <ChangePassword />
        </div>
        <div className="updateInfo-div">
          <h3>Update Info</h3>
          <UpdateQuestionnaire />
        </div>
        <div className="updatePic-div">
          <h3>Upload a profile picture.</h3>
          <ImageUpload />
        </div>
      </div>
    );

  }

}

const mapStateToProps = (state) => {
  return {
    userData: state.userProfile.userData,
  }
}

export default connect(mapStateToProps, { resetError })(UpdateUserData);
