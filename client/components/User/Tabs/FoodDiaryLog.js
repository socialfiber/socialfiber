import React from 'react';
import { deleteFoodDiaryEntry } from '../../../actions/foodDiary';

const FoodDiaryLog = (props) => {
	return (
			<tr className="foodDiaryLogtr">
				<td className="fdltd">{props.log.qty}</td>
				<td className="fdltd">{props.log.food}</td>
				<td className="fdltd">{props.log.storage.cal}</td>
				<td className="fdltd">{props.log.storage.carb}</td>
				<td className="fdltd">{props.log.storage.prot}</td>
				<td className="fdltd">{props.log.storage.fat}</td>
				<td className="fdltd">{props.log.storage.fib}</td>
				<td className="fdltd">{props.log.storage.n6}</td>
				<td className="fdltd" onClick={()=>{deleteFoodDiaryEntry(props.log)}}>x</td>
				</tr>
	);
}

export default FoodDiaryLog;
