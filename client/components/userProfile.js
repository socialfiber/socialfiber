import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchUserData } from '../actions/fetchUserData';

class UserProfile extends Component {
  componentWillMount() {
    this.props.fetchUserData();
  }
  render() {
    return (
      <div>
        <h3>User Info</h3>
      </div>
    );
  }
}

export default connect(null, { fetchUserData })(UserProfile);
