import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchFriends } from '../actions/friends';
import NavBar from './navbar';
import Friend from './Friend';
import FriendRequestButton from './FriendRequestButton';
import { createRoom } from '../actions/chatWindow';
import { browserHistory } from 'react-router';
import ChatWindow from './chatWindow';

class MyFriends extends Component {
  constructor(props) {
    super(props);

    this.state = {
      chatFlag: false
    }
  }

  componentWillMount() {
    this.props.fetchFriends();
  }

  // componentDidUpdate() {
  //   this.props.fetchFriends();
  // }

  initiateLiveChat(friendObj) {
    this.setState({ chatFlag: true });
    this.props.createRoom(friendObj);
    // browserHistory.push('/chat');
  }

  endLiveChat() {
    this.setState({ chatFlag: false });
  }

  render() {
    if(this.props.myFriends === null && this.props.friendRequests === null) {
      return (
        <div>
          <h3>Loading friends...</h3>
        </div>
      )
    } else if(this.props.myFriends.length || this.props.friendRequests.length) {
      const myFriends = this.props.myFriends.map((friend, idx) => {
        return (
          <li key={idx}>
            <Friend username={friend.user2_username} img={friend.img} otherID={friend.user2_id} />
            <FriendRequestButton friendshipStatus='friends' otherID={friend.user2_id} />
            {/* <button type="button" onClick={() => this.handleOnClick(friend)}>Chat</button> */}
            {this.state.chatFlag ? <button type="button" onClick={() => this.endLiveChat()}>End Chat</button> : <button type="button" onClick={() => this.initiateLiveChat(friend)}>Chat</button>}
          </li>
        )
      })
      const friendRequests = this.props.friendRequests.map((friend, idx) => {
        return (
          <li key={idx}>
            <Friend username={friend.user2_username} img={friend.img} otherID={friend.user2_id} />
            <FriendRequestButton friendshipStatus='requestee' otherID={friend.user2_id} />
          </li>
        )
      })
      return (
        <div>
          <div>
            <h1>Friends</h1>
            <h3>Friend Requests</h3>
            <ul>
              {friendRequests}
            </ul>
            <h3>My Friends</h3>
            <ul>
              {myFriends}
              {this.state.chatFlag ? <ChatWindow /> : ''}
            </ul>
          </div>
        </div>
      );
    } else if(!this.props.myFriends.length && !this.props.friendRequests.length) {
      return (
        <div>
          <h3>You don't have any friends.</h3>
        </div>
      );
    }
  }

}

const mapStateToProps = (state) => {
  return {
    myFriends: state.friends.myFriends,
    friendRequests: state.friends.friendRequests,
  }
}

export default connect(mapStateToProps, { fetchFriends, createRoom })(MyFriends);
