import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { fetchUserData } from '../../actions/users';
import NavBar from '../ToolBox/NavBar';
import ProfilePic from '../ToolBox/ProfilePic';
import Tabs from '../ToolBox/Tabs';
import RadarGraph from '../ToolBox/RadarGraph';
import ChatWindow from './Tabs/ChatWindow';
import UpdateUserData from './Edit/UpdateUserData';


class UserProfile extends Component {

  constructor(props) {
    super(props);
    this.state = {
      editFlag: false
    }
    this.toggleEditing.bind(this);
  }

  componentWillMount() {
    this.props.fetchUserData();
  }

  componentDidUpdate() {
  }

  toggleEditing() {
    this.setState({
      editFlag: !this.state.editFlag
    });
  }

  render() {

    if(this.props.userData !== null) {
      if(!this.state.editFlag) {
        const tabsList = [
          { label: 'Food Diary', component: 'FoodDiary' },
          { label: 'My Friends', component: 'MyFriends' },
          { label: 'My Groups', component: 'MyGroups' }
        ];
        return (
          <div>
            <NavBar />
            <ProfilePic />
            <ul>
              <li>Age: {this.props.userData.age}</li>
              <li>Gender: {this.props.userData.gender}</li>
              <li>Height: {Math.floor(this.props.userData.height/12)}ft {this.props.userData.height%12}in</li>
              <li>Weight: {this.props.userData.weight}</li>
            </ul>
            <div>
              <button type="button" onClick={() => this.toggleEditing()}>Edit Info</button>
            </div>
            {/* <ChatWindow /> */}
            <RadarGraph userID={this.props.userData.id} />
            <Tabs tabsList={tabsList} />
          </div>
        );
      } else {
        return (
          <div>
            <NavBar />
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
    userData: state.userProfile.userData,
  }
}

export default connect(mapStateToProps, { fetchUserData })(UserProfile);
