import React, { Component } from 'react';
import { connect } from 'react-redux';

class ProfilePic extends Component {
  render() {
    return (
      <div>
        <img src="../../assets/profile-icon-9.png"></img>
      </div>
    );
  }
}

// function mapStateToProps(state) {
//   return;
// }

// export default connect(mapStateToProps, null)(ProfilePic);
export default ProfilePic;
