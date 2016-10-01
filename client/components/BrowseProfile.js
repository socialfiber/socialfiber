import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchProfile } from '../actions/browse';
import NavBar from './navbar';
import RadarGraph from './radarGraph';
import ProfilePic from './profilePic';

class BrowseProfile extends Component {

  componentWillMount() {
    this.props.fetchProfile();
  }

  componentDidUpdate() {
  }

  render() {

    if(this.props.profileInfo !== null) {
        return (
          <div>
            <NavBar />
            <ProfilePic />
            <div>Age: {this.props.profileInfo.age}</div>
            <div>Gender: {this.props.profileInfo.gender}</div>
            <RadarGraph />
          </div>
        );
    } else {
      return (
        <div>
          <h3>Loading profile...</h3>
        </div>
      )
    }
  }

}

function mapStateToProps(state) {
  return {
    profileInfo: state.browse.profileInfo,
  }
}

export default connect(mapStateToProps, { fetchProfile })(BrowseProfile);
