import React, {Component} from 'react';
import { connect } from 'react-redux';

class GroupWallComments extends Component {
// 	constructor (props) {
// 		super(props);
//
// 		this.state = {
// 			showReply: false
// 		}
// 	}
//
// 	showReplyForm(e){
//     e.preventDefault();
//     this.setState({showReply: !this.state.showReply});
// 		this.props.myGroups.commentObject = this.props.post;
//   }

	render(){
		console.log('this props: ', this.props);
		return (
			<tr>
				<td>
					{/* <button onClick = {this.showReplyForm.bind(this)}> Show Comments </button> */}
				</td>
				{/* <td>
	    		{this.props.comment.createdAt.substr(0,10)}
		    </td> */}
				<td>
					<strong> {this.props.comment.username}</strong>: {this.props.comment.message}
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


export default connect(mapStateToProps)(GroupWallComments);
