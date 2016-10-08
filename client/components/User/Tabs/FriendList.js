import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createRoom } from '../../../actions/chatWindow';
import IndividualUser from '../../ToolBox/IndividualUser';
import FriendRequestButton from '../../ToolBox/FriendRequestButton';
import ProfilePic from '../../ToolBox/ProfilePic';
import ChatWindow from './ChatWindow';
import Cookies from 'js-cookie';


class FriendList extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      chatFlag: false
    }
    this.initiateLiveChat = this.initiateLiveChat.bind(this);
    this.endLiveChat = this.endLiveChat.bind(this);
  }

  initiateLiveChat(friendObj) {
    this.setState({
      chatFlag: true
    });
    this.props.createRoom(friendObj);
  }

  endLiveChat() {
    this.setState({
      chatFlag: false
    });
  }

  render() {

    const noFriends = Cookies.get('currentProfileID') !== Cookies.get('currentProfileID') ? <h3>You don't have any friends.</h3> : <h3>User doesn't have any friends.</h3>;

    if(this.props.friendList.length) {
      const friendList = this.props.friendList.map((friend, idx) => {
        return (
          <li key={idx}>
            <ProfilePic userID={friend.user2_id} />
            <IndividualUser username={friend.user2_username} img={friend.img} otherID={friend.user2_id} />
            <FriendRequestButton otherID={friend.user2_id} />
            {/* <button type="button" onClick={() => this.handleOnClick(friend)}>Chat</button> */}
            {this.state.chatFlag ? <button type="button" onClick={() => this.endLiveChat()}>End Chat</button> : <button type="button" onClick={() => this.initiateLiveChat(friend)}>Chat</button>}
          </li>
        );
      });
      return (
        <div>
          <h3>Friends</h3>
          <ul>
            {friendList}
          </ul>
          {this.state.chatFlag ? <ChatWindow /> : ''}
        </div>
      );
    } else if(!this.props.friendList.length) {
      return (
        <div>
          {noFriends}
        </div>
      );
    }
    
  }

}

export default connect(null, { createRoom })(FriendList);
