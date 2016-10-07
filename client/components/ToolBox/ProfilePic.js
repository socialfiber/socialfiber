import React, { Component } from 'react';
import { fetchProfilePic } from '../../actions/users';


class ProfilePic extends Component {

  constructor(props) {
    super(props);
    this.state = {
      url: undefined
    }
  }

  componentWillMount() {
    fetchProfilePic(this.props.userID)
    .then((response) => {
      this.setState({
        url: response.payload.url
      });
    });
  }

  render() {

    if(this.state.url === null) {
      return (
        <div>
          <img src="../../assets/profile-icon-9.png" style={{ width: "200px", height: "200px" }}></img>
        </div>
      );
    } else if(this.state.url) {
      return (
        <div>
          <img src={this.state.url} ></img>
        </div>
      );
    } else {
      return null;
    }


  }
}

export default ProfilePic;
