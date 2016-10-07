import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchAllUsers } from '../../actions/users';
import NavBar from '../ToolBox/NavBar';
import ProfilePic from '../ToolBox/ProfilePic';
import IndividualUser from '../ToolBox/IndividualUser';
import FriendRequestButton from '../ToolBox/FriendRequestButton';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';


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
          <MuiThemeProvider muiTheme={getMuiTheme()}>
            <li key={idx} className="list-group-item user-block col-lg-4 col-centered">
              <div className="bottom-align-text">
                <ProfilePic />
                <IndividualUser username={user.username} img={user.img} otherID={user.id} />
                <FriendRequestButton otherID={user.id} />
              </div>
            </li>
          </MuiThemeProvider>
        );
      });
      return (
        <div>
          <NavBar />
          <ul className="list-group container container-centered">
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
