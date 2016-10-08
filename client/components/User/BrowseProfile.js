import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchProfile, leavePage } from '../../actions/users';
import { fetchFriendshipStatus } from '../../actions/friends';
import NavBar from '../ToolBox/NavBar';
import FriendRequestButton from '../ToolBox/FriendRequestButton';
import RadarGraph from '../ToolBox/RadarGraph';
import ProfilePic from '../ToolBox/ProfilePic';

class BrowseProfile extends Component {

  componentWillMount() {
    this.props.fetchProfile(this.props.params.id);
    this.props.fetchFriendshipStatus(this.props.params.id);
  }

  componentWillUnmount() {
    this.props.leavePage();
  }

  render() {
    //if friends or public, fetch all data,
    //if private, fetch selected data
    if(this.props.userProfile.userData !== null) {
      return (
        <div>
          <NavBar />
          <ProfilePic userID={this.props.params.id} />
          <FriendRequestButton otherID={this.props.params.id} />
          <div>Age: {this.props.userProfile.userData.age}</div>
          <div>Gender: {this.props.userProfile.userData.gender}</div>
          <RadarGraph type={'amount'} size={'large'} />
        </div>
      );
    } else {
      return (
        <div>
          <NavBar />
          <h3>Loading profile...</h3>
        </div>
      );
    }
  }

}

function mapStateToProps(state) {
  return {
    userProfile: state.userProfile,
    friendshipStatus: state.friends.friendshipStatus
  }
}

export default connect(mapStateToProps, { fetchProfile, fetchFriendshipStatus, leavePage })(BrowseProfile);
