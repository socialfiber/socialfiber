import React, { Component } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { fetchFriends, leaveTab } from '../../../actions/friends';
import { createRoom } from '../../../actions/chatWindow';
import NavBar from '../../ToolBox/NavBar';
import FriendRequestList from './FriendRequestList';
import FriendList from './FriendList';


class MyFriends extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  componentWillMount() {
    this.props.fetchFriends();
  }
  
  componentWillUnmount() {
    this.props.leaveTab();
  }

  render() {

    if(this.props.friendList === null && this.props.friendRequests === null) {

      return (
        <div>
          <h3>Loading friends...</h3>
        </div>
      );

    } else {

      return (
        <div>
          <FriendRequestList friendRequests={this.props.friendRequests} />
          <FriendList friendList={this.props.friendList} />
        </div>
      );

    }  

  }

}

const mapStateToProps = (state) => {
  return {
    friendList: state.friends.friendList,
    friendRequests: state.friends.friendRequests,
  }
}

export default connect(mapStateToProps, { fetchFriends, createRoom, leaveTab })(MyFriends);
