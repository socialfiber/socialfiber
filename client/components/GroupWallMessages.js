import React, {Component} from 'react';
import { connect } from 'react-redux';
import CommentsBox from './CommentsBox';
import { fetchComments } from '../actions/groups';
import GroupWallComments from './GroupWallComments';


class GroupWallMessages extends Component {
	constructor (props) {
		super(props);

		this.state = {
			showReply: false		}
	}

	showReplyForm(e){
    e.preventDefault();
    this.setState({showReply: !this.state.showReply});
		this.props.myGroups.commentObject = this.props.post;
  }

	render(){
		const postComments = this.props.post.comments.map((comment, idx) =>
			<GroupWallComments key={idx} comment={comment} />
		);

		return (
			<table>
				<tbody>
					<tr>
						{/* <td>{this.props.post.createdAt.substr(0,10)}</td> */}
						<td><strong> {this.props.post.username}</strong>: </td>
						<td>{this.props.post.message}</td>
						<td><button onClick = {this.showReplyForm.bind(this)}> Reply </button></td>
						<td>{this.state.showReply && <CommentsBox />}</td>
				  </tr>
					<tr>
     				<td>
         			{postComments}
		        </td>
		      </tr>
				</tbody>
			</table>
		)
	}
}

const mapStateToProps = (state) => {
	return {
		myGroups: state.groups
	}
}

export default connect(mapStateToProps, { fetchComments })(GroupWallMessages);
