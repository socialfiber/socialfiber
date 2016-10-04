import React, {Component} from 'react';
import { connect } from 'react-redux';

class GroupWallComments extends Component {

	render(){
		if(this.props.comment){
			return (
				<tr>
					<td>
						<strong> {this.props.comment.username}</strong>: {this.props.comment.message}
					</td>
				</tr>
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
