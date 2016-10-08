import React from 'react';

const GroupWallComments = (props) => {

	return (

		<div>
			<strong>{props.comment.username}</strong>: {props.comment.message}
		</div>
	);

}

export default GroupWallComments;
