import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { fetchUserData, leavePage } from '../../actions/users';
import NavBar from '../ToolBox/NavBar';
import ProfilePic from '../ToolBox/ProfilePic';
import Tabs from '../ToolBox/Tabs';
import RadarGraph from '../ToolBox/RadarGraph';
import ChatWindow from './Tabs/ChatWindow';
import UpdateUserData from './Edit/UpdateUserData';
import Cookies from 'js-cookie';


class UserProfile extends Component {

  constructor(props) {
    super(props);
    this.state = {
      editFlag: false
    }
    this.toggleEditing.bind(this);
  }

  componentWillMount() {
    Cookies.set('currentProfileID', Cookies.get('userID'));
    this.props.fetchUserData();
  }

  componentDidUpdate() {
  }

  toggleEditing() {
    this.setState({
      editFlag: !this.state.editFlag
    });
  }

  componentWillUnmount() {
    Cookies.remove('currentProfileID');
    this.props.leavePage();
  }

  render() {

    if(this.props.userProfile.userData !== null) {

      if(!this.state.editFlag) {

        const tabsList = [
          { label: 'Food Diary', component: 'FoodDiary' },
          { label: 'My Friends', component: 'MyFriends' },
          { label: 'My Groups', component: 'MyGroups' }
        ];

        return (
          <div className="user-container all-container">
            <NavBar />
            <div className="user-profile-block">
              <div className="user-profile-block-right">
                <div>
                  <ProfilePic userID={this.props.userProfile.userData.user_id} />
                </div>
                <div className="user-info">
                  <ul className="list-group">
                    <li className="user-info-list-item">Age: {this.props.userProfile.userData.age}</li>
                    <li className="user-info-list-item">Gender: {this.props.userProfile.userData.gender}</li>
                    <li className="user-info-list-item">Height: {Math.floor(this.props.userProfile.userData.height/12)}ft {this.props.userProfile.userData.height%12}in</li>
                    <li className="user-info-list-item">Weight: {this.props.userProfile.userData.weight}</li>
                    <button type="button" onClick={() => this.toggleEditing()}>Edit Info</button>
                  </ul>
                  <div>
                  </div>
                </div>
              </div>
              <div className="user-profile-block-left">
                <RadarGraph type={'amount'} size={'large'} />
              </div>
            </div>
            <Tabs tabsList={tabsList} />
          </div>
        );

      } else {

        return (
          <div>
            <NavBar />
            <h3 className="all-container">{this.props.userProfile.username}</h3>
            <UpdateUserData />
            <button type="button" onClick={() => this.toggleEditing()}>Return</button>
          </div>
        );

      }
    } else {

      return (
        <div>
          <NavBar />
          <h3 className="all-container">Loading your profile...</h3>
        </div>
      );

    }

  }

}

const mapStateToProps = (state) => {
  return {
    userProfile: state.userProfile
  }
}

export default connect(mapStateToProps, { fetchUserData, leavePage })(UserProfile);
