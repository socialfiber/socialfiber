import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchUserGroups } from '../actions/fetchUserGroups';
import NavBar from './navbar';

class MyGroups extends Component {

  componentWillMount(){
    this.props.fetchUserGroups();
  }


  render() {
    console.log('userGroups: ', this.props.userGroups);
    return (
      <div>
        <h3>
          My Groups
        </h3>
      </div>
    );
  }

}

function mapStateToProps(state) {
  return {
    userGroups: state.myGroups
  }
}

export default connect(mapStateToProps, { fetchUserGroups })(MyGroups);
