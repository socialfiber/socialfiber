import React from 'react';

const FoodDiaryLog = (props) => {
	console.log(props)
	return (
		<tr>
			<td>{props.log.date}</td>
			<td>{props.log.qty}</td>
			<td>{props.log.food}</td>
		</tr>
	);
}

export default FoodDiaryLog;
