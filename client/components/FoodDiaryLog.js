import React from 'react';

const FoodDiaryLog = (props) => {
	const shortDate = props.log.date.substr(0,10);
	return (
		<tr>
			<td>{shortDate}</td>
			<td>{props.log.qty}</td>
			<td>{props.log.food}</td>
			<td>x</td>
		</tr>
	);
}

export default FoodDiaryLog;
