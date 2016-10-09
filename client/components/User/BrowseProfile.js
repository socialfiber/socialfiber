import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchProfile, leavePage } from '../../actions/users';
import { fetchFriendshipStatus } from '../../actions/friends';
import NavBar from '../ToolBox/NavBar';
import FriendRequestButton from '../ToolBox/FriendRequestButton';
import RadarGraph from '../ToolBox/RadarGraph';
import ProfilePic from '../ToolBox/ProfilePic';
import Tabs from '../ToolBox/Tabs';
import Cookies from 'js-cookie';

class BrowseProfile extends Component {

  componentWillMount() {
    Cookies.set('currentProfileID', this.props.params.id);
    this.props.fetchProfile(this.props.params.id);
    this.props.fetchFriendshipStatus(this.props.params.id);
  }

  componentWillUnmount() {
    Cookies.remove('currentProfileID');
    this.props.leavePage();
  }

  render() {

    if(this.props.userProfile.userData !== null) {

      console.log(this.props.userProfile.username);
      const tabsList = [
        { label: 'Food Diary', component: 'FoodDiary' },
        { label: 'Friends', component: 'MyFriends' },
        { label: 'Groups', component: 'MyGroups' }
      ];
      const showTabs = () => {
        if(this.props.friendshipStatus === 'friends') {
          return (
            <Tabs tabsList={tabsList} />
          );
        } else {
          return (
            <h4>`You must be friends to see {this.props.userProfile.username}'s profile.`</h4>
          );
        }
      }

      return (
        <div>
          <NavBar />
          <h3 className="all-container">{this.props.userProfile.username}</h3>
          <ProfilePic userID={this.props.params.id} />
          <FriendRequestButton otherID={this.props.params.id} />
          <div>Age: {this.props.userProfile.userData.age}</div>
          <div>Gender: {this.props.userProfile.userData.gender}</div>
          <RadarGraph type={'amount'} size={'large'} />
          {showTabs()}
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
