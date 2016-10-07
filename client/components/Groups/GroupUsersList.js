import React, {Component} from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import IndividualUser from '../ToolBox/IndividualUser';
import FriendRequestButton from '../ToolBox/FriendRequestButton';


class GroupUsersList extends Component {

	constructor(props) {
		super(props);
		this.state = {
		}
	}

	render() {
		
		if(this.props.groupUsers.length) {
			const groupUsers = this.props.groupUsers.map((user, idx) => {
				return (
					<li key={idx} >
						<IndividualUser username={user.username} otherID={user.id} />
						<FriendRequestButton otherID={user.id} />
					</li>
				)
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
		}

	}

}

const mapStateToProps = (state) => {
	return {
		groupUsers: state.groups.groupUsers
	}
}

export default connect(mapStateToProps, null)(GroupUsersList);
