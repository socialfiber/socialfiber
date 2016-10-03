import React, {Component} from 'react';
import { connect } from 'react-redux';

class GroupWallComments extends Component {
	constructor (props) {
		super(props);

		this.state = {
			showReply: false
		}
	}

	showReplyForm(e){
    e.preventDefault();
    this.setState({showReply: !this.state.showReply});
		this.props.myGroups.commentObject = this.props.post;
  }

	render(){
		return (
			<tr>
				<td>
					<button onClick = {this.showReplyForm.bind(this)}> Reply </button>
				</td>
				<td>
	    		{this.props.post.createdAt.substr(0,10)}
		    </td>
				<td>
					<strong> {this.props.post.username}</strong>: {this.props.post.message}
				</td>
				<td>
					{this.state.showReply && <Comments />}
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


export default connect(mapStateToProps)(GroupWallMessages);
