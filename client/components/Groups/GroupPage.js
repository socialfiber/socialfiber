import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchGroupPosts, fetchAllUsers } from '../../actions/groups';
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
      return (
        <Tabs tabsList={tabsList} defaultTab={'GroupWall'} />
      );

    }
    
}

const mapStateToProps = (state) => {
  return {
    myGroups: state.groups,
    groupUsers: state.groups.groupUsers
  }
}

export default connect(mapStateToProps, {fetchGroupPosts, fetchAllUsers, joinGroup, leaveGroup })(GroupPage)
