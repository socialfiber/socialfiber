import React, { Component } from 'react';
import { connect } from 'react-redux';
import { deleteFoodDiaryEntry, fetchFoodDiary, fetchMacros } from '../../../actions/foodDiary';
import Cookies from 'js-cookie';


class FoodDiaryLog extends Component {

	constructor(props) {
		super(props);
	}

	render() {
		
		const deleteButton = Cookies.get('currentProfileID') === Cookies.get('userID') ?
			<td className="fdltd" onClick={()=>{
				this.props.deleteFoodDiaryEntry(this.props.log)
				.then(() => {
					this.props.fetchFoodDiary()
					.then(() => {
						this.props.fetchMacros();
					});
				});
			}}>
				x
			</td>
			: null;
		
		return (
			<tr className="foodDiaryLogtr">
				<td className="fdltd">{this.props.log.qty}</td>
				<td className="fdltd">{this.props.log.food}</td>
				<td className="fdltd">{this.props.log.storage.cal}</td>
				<td className="fdltd">{this.props.log.storage.carb}</td>
				<td className="fdltd">{this.props.log.storage.prot}</td>
				<td className="fdltd">{this.props.log.storage.fat}</td>
				<td className="fdltd">{this.props.log.storage.fib}</td>
				<td className="fdltd">{this.props.log.storage.n6}</td>
				{deleteButton}
			</tr>
		);
		
	}

}

const mapStateToProps = (state) => {
  return {
    diaryData: state.foodDiary.logs,
    actualMacros: state.userProfile.actualMacros
  }
}

export default connect(mapStateToProps, { deleteFoodDiaryEntry, fetchFoodDiary, fetchMacros })(FoodDiaryLog);
