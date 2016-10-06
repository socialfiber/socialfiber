import React, {Component} from 'react';
import { connect } from 'react-redux';
import { fetchComments } from '../../actions/groups';
import GroupWallComments from './GroupWallComments';


class GroupWallMessagesNoReply extends Component {

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
				  </tr>
					<tr>
     				<td>
         			{postComments}
		        </td>
		      </tr>
				</tbody>
			</table>
		);
	}
	
}

const mapStateToProps = (state) => {
	return {
		myGroups: state.groups
	}
}

export default connect(mapStateToProps, { fetchComments })(GroupWallMessagesNoReply);
