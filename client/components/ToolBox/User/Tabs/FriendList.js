import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createRoom } from '../../../actions/chatWindow';
import IndividualUser from '../../ToolBox/IndividualUser';
import FriendRequestButton from '../../ToolBox/FriendRequestButton';
import ProfilePic from '../../ToolBox/ProfilePic';
import ChatWindow from './ChatWindow';
import Cookies from 'js-cookie';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';


class FriendList extends Component {

  constructor(props) {
    super(props);
    this.state = {
      chatFlag: false
    }
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

    const noFriends = Cookies.get('userID') === Cookies.get('currentProfileID') ? <h3>You don't have any friends.</h3> : <h3>User doesn't have any friends.</h3>;

    if(this.props.friendList.length) {
      const friendList = this.props.friendList.map((friend, idx) => {
        return (
          <li key={idx} className="list-group-item user-block col-lg-4 col-centered">
            <ProfilePic userID={friend.user2_id} />
            <IndividualUser username={friend.user2_username} img={friend.img} otherID={friend.user2_id} />
            <div className="friend-list-buttons">
              <div className="friend-list-button-left">
                {this.state.chatFlag ? <RaisedButton type="button" onClick={() => this.endLiveChat()}>End Chat</RaisedButton> : <RaisedButton type="button" onClick={() => this.initiateLiveChat(friend)}>Chat</RaisedButton>}
              </div>
              <div className="friend-list-button-right">
                <FriendRequestButton otherID={friend.user2_id}/>
              </div>
            </div>
          </li>
        );
      });
      return (
        <MuiThemeProvider muiTheme={getMuiTheme()}>
          <div className="my-friends-container">
            <ul>
              {friendList}
            </ul>
            <div className="chat-window">
              {this.state.chatFlag ? <ChatWindow /> : ''}
            </div>
          </div>
        </MuiThemeProvider>
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
