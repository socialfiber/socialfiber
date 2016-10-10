import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchProfile, leavePage } from '../../actions/users';
import { fetchFriendshipStatus } from '../../actions/friends';
import NavBar from '../ToolBox/NavBar';
import ProfilePic from '../ToolBox/ProfilePic';
import RadarGraph from '../ToolBox/RadarGraph';
import MacroTable from '../ToolBox/MacroTable';
import FriendRequestButton from '../ToolBox/FriendRequestButton';
import Tabs from '../ToolBox/Tabs';
import Cookies from 'js-cookie';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';


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

      const tabsList = [
        { label: 'Food Diary', component: 'FoodDiary' },
        { label: 'Friends', component: 'MyFriends' },
        { label: 'Groups', component: 'MyGroups' }
      ];
      const showTabs = () => {
        if(this.props.friendshipStatus === 'friends') {
          return (
            <div className="clear-floats user-tabs">
              <Tabs tabsList={tabsList} />
            </div>
          );
        } else {
          return (
            <h4  className="all-container">
              You must be friends to see {this.props.userProfile.username}'s profile.
            </h4>
          );
        }
      }

      return (
        <MuiThemeProvider muiTheme={getMuiTheme()} >
          <div>
            <NavBar />
            <div className="user-container all-container">
              <h3>
                {this.props.userProfile.username}
              </h3>
              <div className="user-row">
                
                <div className="col-lg-4 user-profile-block-left">
                  <div>
                    <ProfilePic userID={this.props.params.id} />
                  </div>
                  <div className="user-info">
                    <ul className="list-group">
                      <li className="user-info-list-item">
                        Age: {this.props.userProfile.userData.age}
                      </li>
                      <li className="user-info-list-item">
                        Gender: {this.props.userProfile.userData.gender}
                      </li>
                      <li className="user-info-list-item">
                        Height: {Math.floor(this.props.userProfile.userData.height/12)}ft {this.props.userProfile.userData.height%12}in
                      </li>
                      <li className="user-info-list-item">
                        Weight: {this.props.userProfile.userData.weight}
                      </li>
                    </ul>
                    <div>
                      <FriendRequestButton otherID={this.props.params.id} />
                    </div>
                  </div>
                </div>
              <div className="col-lg-4 user-profile-block-center">
                <RadarGraph type={'amount'} size={'large'} />
              </div>
              <div className="col-lg-4 user-profile-block-right">
                <MacroTable idealMacros={this.props.userProfile.idealMacros} actualMacros={this.props.userProfile.actualMacros} />
              </div>
              {showTabs()}
              </div>
            </div>
          </div>
        </MuiThemeProvider>
      );

    } else {

      return (
        <div>
          <NavBar />
          <div className="all-container">
            <h3>
              Loading profile...
            </h3>
          </div>
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
