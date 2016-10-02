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
    console.log('MY FRIENDS!!!!!!', this.props.myFriends)
    console.log('FRIEND REQUESTS!!!!!!', this.props.friendRequests)
    if(this.props.myFriends.length > 0) {
      const myFriends = this.props.myFriends.map((friend, idx) => {
        <li>
          <Friend key={idx} url={friend.url} img={friend.img} otherID={friend.id} />
          <FriendRequestButton friendshipStatus={'friends'} />
        </li>
        }
      );
      const friendRequests = this.props.friendRequests.map((friend, idx) => {
        <li>
          <Friend key={idx} url={friend.url} img={friend.img} otherID={friend.id} />
          <FriendRequestButton friendshipStatus={'requestee'} />
        </li>
        }
      );
      return (
        <div>
          <h1>Friends</h1>
          <h3>Friend Requests</h3>
          </ul>
            {friendRequests}
          </ul>
          <h3>My Friends</h3>
          <ul>
            {myFriends}
          </ul>
        </div>
      );
    } else if(this.props.myFriends.length === 0) {
      return (
        <div>
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
    myFriends: state.friends.myFriends,
    friendRequests: state.friends.friendRequests,
  }
}

export default connect(mapStateToProps, { fetchFriends })(MyFriends);
