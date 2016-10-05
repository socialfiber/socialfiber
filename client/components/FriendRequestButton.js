import React, { Component } from 'react';
import { fetchFriendshipStatus, sendFriendRequest, acceptFriendRequest, deleteFriendRequest } from '../actions/friends';

class FriendRequestButton extends Component {

  constructor(props) {
    super(props);
    this.state = {
      friendshipStatus: null
    }
    this.getStatus.bind(this);
  }

  getStatus() {
    fetchFriendshipStatus(this.props.otherID)
    .then((response) => {
      this.setState({
        friendshipStatus: response.payload
      });
    });
  } 

  componentDidMount() {
    this.getStatus()
  }

  componentDidUpdate() {
    this.getStatus()
  }
  
  render() {

    if(this.state.friendshipStatus === null) {
      return (
        <div>
          <button onClick={()=>{sendFriendRequest(this.props.otherID)}}>Send Friend Request</button>
        </div>
      );
    } else if(this.state.friendshipStatus === 'requestee') {
      return (
        <div>
          <button onClick={()=>{acceptFriendRequest(this.props.otherID)}}>Accept Friend Request</button>
        </div>
      );
    } else if(this.state.friendshipStatus === 'requestor') {
      return (
        <div>
          <button onClick={()=>{deleteFriendRequest(this.props.otherID)}}>Cancel Friend Request</button>
        </div>
      );
    } else if(this.state.friendshipStatus === 'friends') {
      return (
        <div>
          <button onClick={()=>{deleteFriendRequest(this.props.otherID)}}>Unfriend</button>
        </div>
      );
    }

  }

}

export default FriendRequestButton;
