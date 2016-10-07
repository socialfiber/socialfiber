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

    constructor(props) {
      super(props);
      this.state = {
      }
    }

    componentWillMount() {
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
        const groupPosts = this.props.myGroups.groupPosts.map((post, idx) =>
          <GroupWallMessages key={idx} post={post} />
        );
        const groupPostsNoReply = this.props.myGroups.groupPosts.map((post, idx) =>
          <GroupWallMessagesNoReply key={idx} post={post} />
        );
        return(
          <div>
            <MessageBox />
            <table>
              <tbody>
                <tr>
                  <th>Username</th>
                  <th>Message</th>
                  <th>Reply</th>
                </tr>
                {groupPosts}
              </tbody>
            </table>
          </div>
        );
      }

    }

}

const mapStateToProps = (state) => {
  return {
    myGroups: state.groups,
    groupUsers: state.groups.groupUsers
  }
}

export default connect(mapStateToProps, {fetchGroupPosts, fetchAllUsers, joinGroup, leaveGroup })(GroupWall);
