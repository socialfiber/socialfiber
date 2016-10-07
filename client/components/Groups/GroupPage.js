import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchGroupPosts, fetchAllUsers, joinGroup, leaveGroup  } from '../../actions/groups';
import Cookies from 'js-cookie';
import NavBar from '../ToolBox/NavBar';
import Tabs from '../ToolBox/Tabs';
import _ from 'underscore';


class GroupPage extends Component {

  componentWillMount() {
    this.props.fetchGroupPosts(this.props.params.id);
    this.props.fetchAllUsers(this.props.params.id);
  }

  render() {

    const tabsList = [
      { label: 'Wall', component: 'GroupWall' },
      { label: 'Members', component: 'GroupUsersList' }
    ];
    const isGroupMember = _.findWhere(this.props.groupUsers, {id: +Cookies.get('userID')}) ? true : false;

    if(isGroupMember) {
      return (
        <div>
          <NavBar />
          <h1>{this.props.params.groupname}</h1>
          <div>
          Leave this group!
          <button onClick = {() => {this.props.leaveGroup(this.props.params.id).then(()=>window.location.reload())}} >Leave Group</button>
          </div>
          <Tabs tabsList={tabsList} defaultTab={'GroupWall'} />
        </div>
      )
    } else {
      return (
        <div>
          <NavBar />
          <h1>{this.props.params.groupname}</h1>
          <div>
          You aren't a member of this group! Please join to participate in the group.
          <button onClick = {() => {this.props.joinGroup(this.props.params.id).then(()=>window.location.reload())}} >Join Group</button>
          </div>
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

export default connect(mapStateToProps, { fetchGroupPosts, fetchAllUsers, joinGroup, leaveGroup })(GroupPage);
