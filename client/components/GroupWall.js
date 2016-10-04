import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { fetchGroupPosts, fetchAllUsers } from '../actions/groups';
import MessageBox from './PostMessageBox';
import Comments from './CommentsBox';
import NavBar from './navbar';
import GroupWallMessages from './GroupWallMessages';
import GroupWallComments from './GroupWallComments';
import GroupUsersList from './GroupUsersList';

class GroupWall extends Component {

    componentWillMount() {
      this.props.fetchGroupPosts(this.props.params.id);
      this.props.fetchAllUsers(this.props.params.id);
      // .then(()=> {
      //   this.props.fetchAllUsers(this.props.params.id);
      // });
    }

    render() {
      console.log('this.props.groupUsers::', this.props.groupUsers);
      // if(this.props.groupUsers) {
      //   const groupUsers = this.props.groupUsers.map((user, idx) =>
      //     <GroupUsersList key={idx} user={user} />
      //   );
      // }
      if(this.props.groupUsers) {
        const groupUsers = this.props.groupUsers.map((user, idx) =>
          <GroupUsersList key={idx} user={user} />
        );
        const groupPosts = this.props.myGroups.groupPosts.map((post, idx) =>
          <GroupWallMessages key={idx} post={post} />
        );
          return(
              <div>
                <NavBar />
                <h1>{this.props.params.groupname}</h1>
                <div>
                  <h4>Current Group Members</h4>
                  {groupUsers}
                </div>
                <div>
                  <table>
                    <tbody>
                    <MessageBox />
                      <tr>
                        <th>Username</th>
                        <th>Message</th>
                        <th>Reply</th>
                      </tr>
                      <tr>
                        {groupPosts}
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
          );
      } else if(this.props.myGroups.groupPosts.length === 0) {
        return (
          <div>
            <h3>Nobody has posted anything yet.</h3>
            <h4>Be the first to say hi!</h4>
            <MessageBox />
          </div>
        );
      } else {
        return (
          <div>
            <h3>Loading posts...</h3>
          </div>
        )
      }
    }
  }


const mapStateToProps = (state) => {
  return {
    myGroups: state.groups,
    groupUsers: state.groups.groupUsers
  }
}

export default connect(mapStateToProps, {fetchGroupPosts, fetchAllUsers})(GroupWall)
