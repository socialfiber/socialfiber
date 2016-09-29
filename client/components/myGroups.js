import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchUserGroups } from '../actions/groups';
import MyGroupsIndividual from './myGroupsIndividual';
import NavBar from './navbar';


class MyGroups extends Component {

  componentWillMount() {
    this.props.fetchUserGroups();
  }
  componentDidUpdate() {
    this.props.fetchUserGroups();
  }

  render() {
    console.log(this.props.myGroups)
    if(this.props.myGroups.length > 0) {
      const groups = this.props.myGroups.map((group, idx) =>
        <MyGroupsIndividual key={idx} group={group} />
      );

      return (
        <div>
          <NavBar />
          <h1>My Groups</h1>
          <table>
            <tr>
              <th>Name</th>
              <th>Description</th>
            </tr>
            {groups}
          </table>
        </div>
      );
    } else if(this.props.myGroups.length === 0) {
      return (
        <div>
          <h3>You haven't joined any groups.</h3>
        </div>
      );
    } else {
      return (
        <div>
          <h3>Loading groups...</h3>
        </div>
      )
    }
  }

}



const mapStateToProps = (state) => {
  return {
    myGroups: state.myGroups.userGroups
  }
}

export default connect(mapStateToProps, { fetchUserGroups })(MyGroups);
