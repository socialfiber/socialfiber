import React from 'react';
import IndividualUser from '../../ToolBox/IndividualUser';
import FriendRequestButton from '../../ToolBox/FriendRequestButton';
import ProfilePic from '../../ToolBox/ProfilePic';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';


const FriendRequestList = (props) => {

  if(props.friendRequests.length) {
    const friendRequests = props.friendRequests.map((friend, idx) => {
      return (
        <li key={idx} className="list-group-item user-block col-lg-4 col-centered">
          <div className="bottom-align-text">
            <ProfilePic userID={friend.user2_id} />
            <IndividualUser username={friend.user2_username} img={friend.img} otherID={friend.user2_id} />
            <FriendRequestButton otherID={friend.user2_id} />
          </div>
        </li>
      );
    });
    return (
      <MuiThemeProvider muiTheme={getMuiTheme()}>
        <div>
          <h3>Friend Requests</h3>
          <ul>
            {friendRequests}
          </ul>
        </div>
      </MuiThemeProvider>
    );
  } else {
    return null;
  }

}

export default FriendRequestList;
