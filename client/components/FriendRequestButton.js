import React, { Component } from 'react';
import { connect } from 'react-redux';
import { sendFriendRequest, acceptFriendRequest, deleteFriendRequest } from '../actions/friends';

const FriendRequestButton = (props) => {

    //if nonexistent, request sendFriendRequest
    //if requestee, accept acceptFriendRequest
    //if requestor or friends, unfriend /delete request deleteFriendRequest 
    if(props.friendshipStatus === null) {
      return (
        <div>
          <button onClick={()=>{sendFriendRequest(props.otherID)}}>Send Friend Request</button>
        </div>
      );
    } else if(props.friendshipStatus === 'requestee') {
      return (
        <div>
          <button onClick={()=>{acceptFriendRequest(props.otherID)}}>Accept Friend Request</button>
        </div>
      )
    } else if(props.friendshipStatus === 'requestor') {
      return (
        <div>
          <button onClick={()=>{deleteFriendRequest(props.otherID)}}>Cancel Friend Request</button>
        </div>
      )
    } else if(props.friendshipStatus === 'friends') {
      return (
        <div>
          <button onClick={()=>{deleteFriendRequest(props.otherID)}}>Unfriend</button>
        </div>
      )
    }
  }

}

function mapStateToProps(state) {
  return {}
}

export default connect(mapStateToProps, { sendFriendRequest, acceptFriendRequest, deleteFriendRequest })(FriendRequestButton);
