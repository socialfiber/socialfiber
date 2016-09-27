import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchUserGroups } from '../actions/fetchUserGroups';
import MyGroupsIndividual from './myGroupsIndividual';
import NavBar from './navbar';


class MyGroups extends Component {

  componentWillMount() {
    this.props.fetchUserGroups();
  }

  render() {
    if(this.props.myGroups !== null) {

      console.log('this props mygroups: ', this.props.myGroups);
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
    } else {
      return (
        <div>
          <h3>Loading your groups...</h3>
        </div>
      );
    }
  }

}

const mapStateToProps = (state) => {
  return {
    myGroups: state.myGroups
  }
}

export default connect(mapStateToProps, { fetchUserGroups })(MyGroups);
