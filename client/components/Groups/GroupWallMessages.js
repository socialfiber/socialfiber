import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchComments } from '../../actions/groups';
import GroupWallComments from './GroupWallComments';
import CommentsBox from './CommentsBox';


class GroupWallMessages extends Component {

	constructor(props) {
		super(props);
		this.state = {
			showReply: false
		}
		this.showReplyForm = this.showReplyForm.bind(this)
	}

	showReplyForm(e) {
		e.preventDefault();
		this.setState({
			showReply: !this.state.showReply
		});
		this.props.myGroups.commentObject = this.props.post;
	}

	render() {

		const postComments = this.props.post.comments.map((comment, idx) => <GroupWallComments key={idx} comment={comment} />);

		return (
			<div>
				<ul>
					<li>
						{/* <div>{this.props.post.createdAt.substr(0,10)}</div> */}
						<div><strong>{this.props.post.username}</strong>:</div>
						<div>{this.props.post.message}</div>
						<button onClick={this.showReplyForm}>Reply</button>
						{this.state.showReply && <CommentsBox />}
					</li>
					<li>
						{postComments}
					</li>
				</ul>
			</div>
		);

	}
	
}

const mapStateToProps = (state) => {
	return {
		myGroups: state.groups
	}
}

export default connect(mapStateToProps, { fetchComments })(GroupWallMessages);
