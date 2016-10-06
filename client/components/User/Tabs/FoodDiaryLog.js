import React from 'react';
import { deleteFoodDiaryEntry } from '../../../actions/foodDiary';

const FoodDiaryLog = (props) => {
	return (
		<tr>
			<td>{props.log.qty}</td>
			<td>{props.log.food}</td>
			<td>{props.log.storage.cal}</td>
			<td>{props.log.storage.carb}</td>
			<td>{props.log.storage.prot}</td>
			<td>{props.log.storage.fat}</td>
			<td>{props.log.storage.fib}</td>
			<td>{props.log.storage.n6}</td>
			<td onClick={()=>{deleteFoodDiaryEntry(props.log)}}>x</td>
		</tr>
	);
}

export default FoodDiaryLog;