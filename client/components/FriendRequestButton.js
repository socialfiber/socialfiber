import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchFriendshipStatus, sendFriendRequest, acceptFriendRequest, deleteFriendRequest } from '../actions/friends';

class FriendRequestButton extends Component {

  componentWillMount() {
    this.props.fetchFriendshipStatus();
  }

  componentDidUpdate() {
  }

  render() {
    //if nonexistent, request sendFriendRequest
    //if requestee, accept acceptFriendRequest
    //if requestor or friends, unfriend /delete request deleteFriendRequest 
    if(this.props.friendshipStatus === null) {
      return (
        <div>
          <button onClick={()=>{sendFriendRequest()}}>Send Friend Request</button>
        </div>
      );
    } else if(this.props.friendshipStatus === 'requestee') {
      return (
        <div>
          <button onClick={()=>{acceptFriendRequest()}}>Accept Friend Request</button>
        </div>
      )
    } else if(this.props.friendshipStatus === 'requestor') {
      return (
        <div>
          <button onClick={()=>{deleteFriendRequest()}}>Cancel Friend Request</button>
        </div>
      )
    } else if(this.props.friendshipStatus === 'friends') {
      return (
        <div>
          <button onClick={()=>{deleteFriendRequest()}}>Unfriend</button>
        </div>
      )
    }
  }

}

function mapStateToProps(state) {
  return {
    friendshipStatus: state.friends.friendshipStatus
  }
}

export default connect(mapStateToProps, { fetchFriendshipStatus })(FriendRequestButton);
