import React, {Component} from 'react';
import { connect } from 'react-redux';

class GroupWallComments extends Component {

	render(){
		if(this.props.comment){
			return (
				<table>
					<tbody>
						<tr>
							{/* <td>{this.props.comment.createdAt.substr(0,10)}</td> */}
							<td><strong>-- {this.props.comment.username}</strong>: </td>
							<td>{this.props.comment.message}</td>
						</tr>
					</tbody>
				</table>
			)
		} else if(!this.props.comment.message){
			return (
				<tr>
		    	<td>
			     	There are no comments. Please reply to add a comment.
			    </td>
		    </tr>
			)
		}
	}
}

export default connect(null)(GroupWallComments);
