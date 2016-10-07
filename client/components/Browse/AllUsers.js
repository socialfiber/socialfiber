import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchAllUsers } from '../../actions/users';
import NavBar from '../ToolBox/NavBar';
import ProfilePic from '../ToolBox/ProfilePic';
import IndividualUser from '../ToolBox/IndividualUser';
import FriendRequestButton from '../ToolBox/FriendRequestButton';


class AllUsers extends Component {
  
  componentWillMount() {
    this.props.fetchAllUsers();
  }

  render() {

    if(this.props.users === null) {
      return (
        <div>
          <NavBar />
          <h3>Loading users...</h3>
        </div>
      );
    } else {
      const usersList = this.props.users.map((user, idx) => {
        return (
          <li key={idx} >
            <ProfilePic userID={user.id} />
            <IndividualUser username={user.username} img={user.img} otherID={user.id} />
            <FriendRequestButton otherID={user.id} />
          </li>
        );
      });
      return (
        <div>
          <NavBar />
          <h1>Find a User</h1>
          <ul>
            {usersList}
          </ul>
        </div>
      );
    }

  }

}

const mapStateToProps = (state) => {
  return {
    users: state.browse.allUsers
  }
}

export default connect(mapStateToProps, { fetchAllUsers })(AllUsers);
