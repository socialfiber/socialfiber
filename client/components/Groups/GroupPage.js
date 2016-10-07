import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchGroupPosts, fetchAllUsers, joinGroup, leaveGroup  } from '../../actions/groups';
import Cookies from 'js-cookie';
import NavBar from '../ToolBox/NavBar';
import Tabs from '../ToolBox/Tabs';


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
      let isGroupMember = false;
      for(let key in this.props.groupUsers) {
        if(this.props.groupUsers[key].id === +Cookies.get('userID')) {
          isGroupMember = true;
        }
      }

      return (
        <div>
          <NavBar />
          <h1>{this.props.params.groupname}</h1>
          //if member show tabsList && leaveGroup
          <div>
          Leave this group!
          <button onClick = {() => {this.props.leaveGroup(this.props.params.id); window.location.reload();}}>Leave Group</button>
          </div>
          //if not member show joinGroup
          <div>
          You aren't a member of this group! Please join to participate in the group.
          <button onClick = {() => {this.props.joinGroup(this.props.params.id); window.location.reload()}}>Join Group</button>
          </div>
          <Tabs tabsList={tabsList} defaultTab={'GroupWall'} />
        </div>
      );

    }

}

const mapStateToProps = (state) => {
  return {
    myGroups: state.groups,
    groupUsers: state.groups.groupUsers
  }
}

export default connect(mapStateToProps, { fetchGroupPosts, fetchAllUsers, joinGroup, leaveGroup })(GroupPage);
