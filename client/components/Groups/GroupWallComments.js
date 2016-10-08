import React from 'react';


const GroupWallComments = (props) => {

	return (
		<div>
			<table>
				<tbody>
					<tr className="list-group-item">
						{/* <tr>{props.comment.createdAt.substr(0,10)}</tr> */}
						<td><strong>{props.comment.username}</strong>: </td>
						<td>{props.comment.message}</td>
					</tr>
				</tbody>
			</table>
		</div>
	);

}

export default GroupWallComments;
