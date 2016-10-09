import React, {Component} from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import IndividualUser from '../ToolBox/IndividualUser';
import FriendRequestButton from '../ToolBox/FriendRequestButton';
import ProfilePic from '../ToolBox/ProfilePic';
import _ from 'underscore';
import Cookies from 'js-cookie';


class GroupUsersList extends Component {

	render() {

		if(this.props.groupUsers.length) {

			this.props.groupUsers.splice(_.findIndex(this.props.groupUsers, (user) => user.id === +Cookies.get('userID')), 1);
			const groupUsers = this.props.groupUsers.map((user, idx) => {
				return (
					<li key={idx} className="list-group-item user-block col-lg-4 col-centered">
						<ProfilePic userID={user.id} />
						<IndividualUser username={user.username} otherID={user.id} />
						<FriendRequestButton otherID={user.id} />
					</li>
				);
			});

			return (
				<div>
					<ul>
						{groupUsers}
					</ul>
				</div>
			);

		} else if(!this.props.groupUsers.length) {

			return (
				<div>
					<h3>Nobody has joined this group yet.</h3>
          <h4>Be the first one to join this group!</h4>
				</div>
			);

		} else {

			return null;

		}

	}

}

const mapStateToProps = (state) => {
	return {
		groupUsers: state.groups.groupUsers
	}
}

export default connect(mapStateToProps, null)(GroupUsersList);
