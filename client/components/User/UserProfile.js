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
          <div>
            <NavBar />
            <h3>{this.props.userProfile.username}</h3>
            <ProfilePic userID={this.props.userProfile.userData.user_id} />
            <ul>
              <li>Age: {this.props.userProfile.userData.age}</li>
              <li>Gender: {this.props.userProfile.userData.gender}</li>
              <li>Height: {Math.floor(this.props.userProfile.userData.height/12)}ft {this.props.userProfile.userData.height%12}in</li>
              <li>Weight: {this.props.userProfile.userData.weight}</li>
            </ul>
            <div>
              <button type="button" onClick={() => this.toggleEditing()}>Edit Info</button>
            </div>
            <RadarGraph type={'amount'} size={'large'} />
            <Tabs tabsList={tabsList} />
          </div>
        );

      } else {

        return (
          <div>
            <NavBar />
            <h3>{this.props.userProfile.username}</h3>
            <UpdateUserData />
            <button type="button" onClick={() => this.toggleEditing()}>Return</button>
          </div>
        );

      }
    } else {

      return (
        <div>
          <NavBar />
          <h3>Loading your profile...</h3>
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
