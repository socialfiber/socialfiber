import React from 'react';

const FoodDiaryLog = (props) => {
	return (
		<tr>
			<td>this.props.date</td>
			<td>this.props.qty</td>
			<td>this.props.food</td>
		</tr>
	);
}

export default FoodDiaryLog;
