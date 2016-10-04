import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchFriendshipStatus, sendFriendRequest, acceptFriendRequest, deleteFriendRequest } from '../actions/friends';

class FriendRequestButton extends Component {

  constructor(props) {
    super(props);
    this.state = {
      friendshipStatus: null
    }
  }

  componentWillMount() {
    this.props.fetchFriendshipStatus(this.props.otherID)
    .then((res) => {
      this.setState({
        friendshipStatus: res.payload
      });
    });
  }

  componentDidUpdate() {
    this.props.fetchFriendshipStatus(this.props.otherID)
    .then((res) => {
      this.setState({
        friendshipStatus: res.payload
      });
    });
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
      )
    } else if(this.state.friendshipStatus === 'requestor') {
      return (
        <div>
          <button onClick={()=>{deleteFriendRequest(this.props.otherID)}}>Cancel Friend Request</button>
        </div>
      )
    } else if(this.state.friendshipStatus === 'friends') {
      return (
        <div>
          <button onClick={()=>{deleteFriendRequest(this.props.otherID)}}>Unfriend</button>
        </div>
      )
    }
  }

}

const mapStateToProps = (state) => {
  return {
    friendshipStatus: state.friends.friendshipStatus
  }
}

export default connect(mapStateToProps, { fetchFriendshipStatus, sendFriendRequest, acceptFriendRequest, deleteFriendRequest })(FriendRequestButton);
