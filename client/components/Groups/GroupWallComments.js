import React from 'react';


const GroupWallComments = (props) => {

	if(props.comment) {
		return (
			<table>
				<tbody>
					<tr>
						{/* <tr>{props.comment.createdAt.substr(0,10)}</tr> */}
						<td><strong>-- {props.comment.username}</strong>: </td>
						<td>{props.comment.message}</td>
					</tr>
				</tbody>
			</table>
		);
	} else if(!props.comment.message) {
		return (
			<tr>
				<td>There are no comments. Please reply to add a comment.</td>
			</tr>
		);
	}

}

export default GroupWallComments;
