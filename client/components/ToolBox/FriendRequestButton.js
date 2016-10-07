import React, { Component } from 'react';
import { fetchFriendshipStatus, sendFriendRequest, acceptFriendRequest, deleteFriendRequest } from '../../actions/friends';
import Cookies from 'js-cookie';
import RaisedButton from 'material-ui/RaisedButton';


class FriendRequestButton extends Component {

  constructor(props) {
    super(props);
    this.state = {
      friendshipStatus: undefined
    }
    this.getStatus.bind(this);
    this.setStatus.bind(this);
  }

  getStatus() {
    if(+Cookies.get('userID') !== this.props.otherID) {
      fetchFriendshipStatus(this.props.otherID)
      .then((response) => {
        this.setState({
          friendshipStatus: response.payload
        });
      });
    }
  }

  setStatus(response) {
    this.setState({
      friendshipStatus: response.payload
    });
  }

  componentDidMount() {
    this.getStatus();
  }

  render() {

    if(this.state.friendshipStatus === null) {
      return (
        <div>
          <RaisedButton onClick={() => {
            sendFriendRequest(this.props.otherID)
            .then((response) => {
              this.setStatus(response);
            })
          }}>
          <span className="fr-btn" >Send Friend Request</span>
          </RaisedButton>
        </div>
      );
    } else if(this.state.friendshipStatus === 'requestee') {
      return (
        <div>
          <RaisedButton onClick={() => {
            acceptFriendRequest(this.props.otherID)
            .then((response) => {
              this.setStatus(response);
            });
          }}>
          Accept Friend Request
          </RaisedButton>
          <RaisedButton onClick={() => {
            deleteFriendRequest(this.props.otherID)
            .then((response) => {
              this.setStatus(response);
            });
          }}>
          Reject Friend Request
          </RaisedButton>
        </div>
      );
    } else if(this.state.friendshipStatus === 'requestor') {
      return (
        <div>
          <RaisedButton onClick={() => {
            deleteFriendRequest(this.props.otherID)
            .then((response) => {
              this.setStatus(response);
            });
          }}>
          Cancel Friend Request
          </RaisedButton>
        </div>
      );
    } else if(this.state.friendshipStatus === 'friends') {
      return (
        <div>
          <RaisedButton onClick={() => {
            deleteFriendRequest(this.props.otherID)
            .then((response) => {
              this.setStatus(response);
            });
          }}>
          Unfriend
          </RaisedButton>
        </div>
      );
    } else {
      return null;
    }

  }

}

export default FriendRequestButton;
