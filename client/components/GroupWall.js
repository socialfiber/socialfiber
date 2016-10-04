import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { fetchGroupPosts, fetchComments } from '../actions/groups';
import MessageBox from './PostMessageBox';
import Comments from './CommentsBox';
import NavBar from './navbar';
import GroupWallMessages from './GroupWallMessages';
import GroupWallComments from './GroupWallComments';

class GroupWall extends Component {

    componentWillMount() {
      this.props.fetchGroupPosts(this.props.params.id);
    }

    render() {
      console.log('this.props.mygroups.groupposts: ', this.props.myGroups.groupPosts);
      if(this.props.myGroups.groupPosts.length > 0) {
        const groupPosts = this.props.myGroups.groupPosts.map((post, idx) =>
          <GroupWallMessages key={idx} post={post} />
        );
          return(
              <div>
                <NavBar />
                <h1>{this.props.params.groupname}</h1>
                <MessageBox />
                <table>
                  <tbody>
                    <tr>
                      <th>Username</th>
                      <th>Message</th>
                      <th>Reply</th>
                    </tr>
                  </tbody>
                </table>
                <tr>
                  {groupPosts}
                </tr>
              </div>
          );
      } else if(this.props.myGroups.groupPosts.length === 0) {
        return (
          <div>
            <h3>Nobody has posted anything yet.</h3>
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
    myGroups: state.groups
  }
}

export default connect(mapStateToProps, {fetchGroupPosts})(GroupWall)
