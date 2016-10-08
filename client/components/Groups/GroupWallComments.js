import React from 'react';

const GroupWallComments = (props) => {

	return (

		// <div>
		// 	<table>
		// 		<tbody>
		// 			<tr>
		// 				<tr>{props.comment.createdAt.substr(0,10)}</tr>
		// 				<td><strong>{props.comment.username}</strong>: </td>
		// 				<td>{props.comment.message}</td>
		// 			</tr>
		// 		</tbody>
		// 	</table>
		// </div>

		<div className="group-comments">
			<strong>{props.comment.username}</strong>: {props.comment.message}
		</div>
	);

}

export default GroupWallComments;
