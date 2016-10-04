import React, {Component} from 'react';
import { connect } from 'react-redux';
import CommentsBox from './CommentsBox';
import { fetchComments } from '../actions/groups';
import GroupWallComments from './GroupWallComments';


class GroupWallMessages extends Component {
	constructor (props) {
		super(props);

		this.state = {
			showReply: false,
			showComments: false
		}
	}


	showReplyForm(e){
    e.preventDefault();
    this.setState({showReply: !this.state.showReply});
		this.props.myGroups.commentObject = this.props.post;
  }

	showComments(e) {
		e.preventDefault();
		this.setState({showComments: !this.state.showComments});
		this.props.fetchComments(this.props.post.id);
	}

	render(){
		console.log('this props my groups comments:', this.props.myGroups.comments);
			const postComments = this.props.myGroups.comments.map((comment, idx) =>
				<GroupWallComments key={idx} comment={comment} />
			);
		return (
			<tr>
				<td>
					<button onClick = {this.showReplyForm.bind(this)}> Reply </button>
				</td>
				<td>
					<button onClick = {this.showComments.bind(this)}> Show Comments </button>
				</td>
				<td>
	    		{this.props.post.createdAt.substr(0,10)}
		    </td>
				<td>
					<strong> {this.props.post.username}</strong>: {this.props.post.message}
				</td>
				<td>
					{this.state.showReply && <CommentsBox />}
				</td>
				<td>
	    		{this.state.showComments && postComments}
		    </td>
			</tr>
		)
	}
}



const mapStateToProps = (state) => {
	return {
		myGroups: state.groups
	}
}


export default connect(mapStateToProps, { fetchComments })(GroupWallMessages);
