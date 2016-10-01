import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchFriends } from '../actions/friends';
import NavBar from './navbar';
import Friend from './Friend';
import FriendRequestButton from './FriendRequestButton';

class MyFriends extends Component {

  componentWillMount() {
    this.props.fetchFriends();
  }

  // componentDidUpdate() {
  //   this.props.fetchFriends();
  // }

  render() {
    console.log(this.props.myFriends)
    if(this.props.myFriends.length > 0) {
      const friends = this.props.myFriends.map((friend, idx) => {
        <li>
          <Friend key={idx} url={friend.url} img={friend.img} />
          <FriendRequestButton friendshipStatus={'friends'} />
        </li>
        }
      );
      return (
        <div>
          <NavBar />
          <h1>My Friends</h1>
          <ul>
            {friends}
          </ul>
        </div>
      );
    } else if(this.props.myFriends.length === 0) {
      return (
        <div>
          <NavBar />
          <h3>You don't have any friends.</h3>
        </div>
      );
    } else {
      return (
        <div>
          <h3>Loading friends...</h3>
        </div>
      )
    }
  }

}

const mapStateToProps = (state) => {
  return {
    myFriends: state.friends.myFriends
  }
}

export default connect(mapStateToProps, { fetchFriends })(MyFriends);
