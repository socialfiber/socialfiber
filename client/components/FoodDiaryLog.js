import React from 'react';
import { deleteFoodDiaryEntry } from '../actions/foodDiary';

const FoodDiaryLog = (props) => {
	const shortDate = props.log.date.substr(0,10);
	return (
		<tr>
			<td>{shortDate}</td>
			<td>{props.log.qty}</td>
			<td>{props.log.food}</td>
			<td onClick={()=>{deleteFoodDiaryEntry(props.log)}}>x</td>
		</tr>
	);
}

export default FoodDiaryLog;
