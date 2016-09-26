import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchUserGroups } from '../actions/fetchUserGroups';
import NavBar from './navbar';
import myGroupsIndividual from './myGroupsIndividual';

class MyGroups extends Component {

  componentWillMount(){
    this.props.fetchUserGroups();
  }


  render() {
    if(this.props.myGroups !== null) {
      const groups = this.props.myGroups.map((group, idx) =>
        <myGroupsIndividual key={idx} groups={group} />
      );
    return (
      <div>
        <h3>
          My Groups
        </h3>
        <ul>
          <li>{groups}</li>
        </ul>
      </div>
    );
  }
  else {
    return (
      <div>
        <h3>
          Loading your groups...
        </h3>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    myGroups: state.myGroups
  }
}

export default connect(mapStateToProps, { fetchUserGroups })(MyGroups);
