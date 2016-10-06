import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { fetchGroupPosts, fetchAllUsers, joinGroup, leaveGroup } from '../../actions/groups';
import Cookies from 'js-cookie';
import MessageBox from './PostMessageBox';
import Comments from './CommentsBox';
import GroupWallMessages from './GroupWallMessages';
import GroupWallComments from './GroupWallComments';
import GroupUsersList from './GroupUsersList';
import GroupWallMessagesNoReply from './GroupWallMessagesNoReply';


class GroupWall extends Component {

    componentWillMount() {
      this.props.fetchGroupPosts(this.props.params.id);
      this.props.fetchAllUsers(this.props.params.id);
    }

    render() {
        
      if(this.props.groupUsers === undefined) {
          return (
            <div>
              <h3>Loading posts...</h3>
            </div>
          );
      }

      if(this.props.groupUsers) {
        const groupUsers = this.props.groupUsers.map((user, idx) =>
          <GroupUsersList key={idx} user={user} />
        );

        const groupPosts = this.props.myGroups.groupPosts.map((post, idx) =>
          <GroupWallMessages key={idx} post={post} />
        );

        const groupPostsNoReply = this.props.myGroups.groupPosts.map((post, idx) =>
          <GroupWallMessagesNoReply key={idx} post={post} />
        );

        let isGroupMember = false;

        for(let key in this.props.groupUsers) {
          if(this.props.groupUsers[key].id == +Cookies.get('userID')) {
            isGroupMember = true;
          }
        }

        if(this.props.groupUsers.length === 0) {
          return (
            <div>
              <h3>Nobody has joined this group yet.</h3>
              <h4>Be the first one to join this group!</h4>
              <button onClick = {() => {this.props.joinGroup(this.props.params.id); window.location.reload();}}>Join Group</button>
            </div>
          );
        }

        if(isGroupMember) {
          return(
            <div>
              <h1>{this.props.params.groupname}</h1>
              Leave this group!
              <button onClick = {() => {this.props.leaveGroup(this.props.params.id); window.location.reload();}}>Leave Group</button>

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
                    {groupPosts}
                  </tbody>
                </table>
              </div>
            </div>
          );
        } else {
          return (
            <div>
              <h1>{this.props.params.groupname}</h1>
              You aren't a member of this group! Please join to participate in the group.
              <button onClick = {() => {this.props.joinGroup(this.props.params.id); window.location.reload()}}>Join Group</button>
              <div>
                <h4>Current Group Members</h4>
                {groupUsers}
              </div>
              <div>
                <table>
                  <tbody>
                  <tr>
                    <th>Username</th>
                    <th>Message</th>
                  </tr>
                  <tr>
                    {groupPostsNoReply}
                  </tr>
                  </tbody>
                </table>
              </div>
            </div>
          );
        }
      }
    }
}

const mapStateToProps = (state) => {
  return {
    myGroups: state.groups,
    groupUsers: state.groups.groupUsers
  }
}

export default connect(mapStateToProps, {fetchGroupPosts, fetchAllUsers, joinGroup, leaveGroup })(GroupWall)
