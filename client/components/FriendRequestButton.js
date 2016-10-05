import React, { Component } from 'react';
import { fetchFriendshipStatus, sendFriendRequest, acceptFriendRequest, deleteFriendRequest } from '../actions/friends';

class FriendRequestButton extends Component {

  constructor(props) {
    super(props);
    this.state = {
      friendshipStatus: null
    }
    this.getStatus.bind(this);
    this.setStatus.bind(this);
  }

  getStatus() {
    fetchFriendshipStatus(this.props.otherID)
    .then((response) => {
      this.setState({
        friendshipStatus: response.payload
      });
    });
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
          <button onClick={() => {
            sendFriendRequest(this.props.otherID)
            .then((response) => {
              this.setStatus(response);
            })
          }}>
          Send Friend Request
          </button>
        </div>
      );
    } else if(this.state.friendshipStatus === 'requestee') {
      return (
        <div>
          <button onClick={() => {
            acceptFriendRequest(this.props.otherID)
            .then((response) => {
              this.setStatus(response);
            });
          }}>
          Accept Friend Request
          </button>
          <button onClick={() => {
            deleteFriendRequest(this.props.otherID)
            .then((response) => {
              this.setStatus(response);
            });
          }}>
          Reject Friend Request
          </button>
        </div>
      );
    } else if(this.state.friendshipStatus === 'requestor') {
      return (
        <div>
          <button onClick={() => {
            deleteFriendRequest(this.props.otherID)
            .then((response) => {
              this.setStatus(response);
            });
          }}>
          Cancel Friend Request
          </button>
        </div>
      );
    } else if(this.state.friendshipStatus === 'friends') {
      return (
        <div>
          <button onClick={() => {
            deleteFriendRequest(this.props.otherID)
            .then((response) => {
              this.setStatus(response);
            });
          }}>
          Unfriend
          </button>
        </div>
      );
    }

  }

}

export default FriendRequestButton;
