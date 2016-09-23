import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { submitFoodDiaryEntry } from '../actions/foodDiary';

class FoodDiaryEntry extends Component {

  render() {
    const { handleSubmit } = this.props;
    return (
      <form onSubmit = {handleSubmit(this.props.submitFoodDiaryEntry)}>
        <h3>Add Entry</h3>
          <p>Please submit a meal. You may enter phrases such as "cheesburger and fries" or "two eggs and whole wheat toast"</p>
          <div>
            <label>Date</label>
            <Field name='date' component='input' type='date' required />
            <label>Qty</label>
            <Field name='qty' component='input' type='number' required />
            <label>Tell us what you ate</label>
            <Field name='food' component='input' type='text' required />
          </div>
          <button type='submit'>Submit</button>
      </form>
    )
  }

}

FoodDiaryEntry = reduxForm({
  form: 'FoodDiaryEntry'
})(FoodDiaryEntry);

export default connect(null, { submitFoodDiaryEntry })(FoodDiaryEntry);
